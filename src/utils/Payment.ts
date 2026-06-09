// services/payment.service.ts

import axios, { RawAxiosRequestHeaders } from "axios";
import { OrderModel } from "../models/orders.model";
import crypto from "crypto";
import { WhatsAppService } from "../services/whatsapp.services";
import { sequelize } from "../config";

const whatsappService = new WhatsAppService();

const header: RawAxiosRequestHeaders = {
  Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
  "Content-Type": "application/json",
};
export class PaymentService {
  static async initializePayment(data: {
    amount: number;
    orderNumber: string;
    phoneNumber: string;
  }) {
    try {
      let configData = {
        email: "noblerestaurantng@gmail.com",
        amount: data.amount * 100,
        callback_url: `${process.env.FRONTEND_URL}/payment/verify/paystack?reference=${data.orderNumber}`,
        metadata: {
          cancel_action: `${process.env.FRONTEND_URL}/payment/verify/paystack?reference=${data.orderNumber}`,
          orderNumber: data.orderNumber,
        },
      };

      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          ...configData,
        },
        {
          headers: header,
        },
      );

      const {
        data: { access_code, authorization_url, reference },
      } = response.data;

      return {
        reference,
        authorization_url,
        access_code,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Payment initialization failed");
    }
  }

  static async getAccessToken() {
    try {
      const auth = Buffer.from(
        `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`,
      ).toString("base64");

      const response = await axios.post(
        `${process.env.MONNIFY_BASE_URL}/auth/login`,
        {},
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        },
      );

      return response.data.responseBody.accessToken;
    } catch (error) {
      console.log(error);
      throw new Error("Authentication failed");
    }
  }

  static async verifyPayment(orderNumber: string) {
    try {
      console.log("running here");

      const order = await OrderModel.findOne({
        where: {
          orderNumber,
        },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      if (order.paymentStatus === "PAID") {
      }
    } catch (error: any) {
      console.log("error:", error);
    }

    // try {
    //   await whatsappService.sendPaymentSuccess(
    //     order.phoneNumber,
    //     order.orderNumber,
    //   );
    // } catch (error) {
    //   console.error("[verifyPayment] Customer WhatsApp message failed:", error);
    // }

    /**
     * ─────────────────────────────────────────────────────────────
     * NOTIFY ADMIN
     * ─────────────────────────────────────────────────────────────
     */
    //     try {
    //       await whatsappService.sendMessage({
    //         phone: process.env.ADMIN_PHONE!,
    //         message: `
    // 🟢 PAYMENT CONFIRMED

    // Order: ${order.orderNumber}
    // Total: ₦${Number(order.totalAmount).toLocaleString()}

    // START PREPARING ORDER 🍽️
    //         `.trim(),
    //       });
    //     } catch (error) {
    //       console.error("[verifyPayment] Admin WhatsApp message failed:", error);
    //     }

    return {
      success: true,
      message: "Payment verified successfully",
      data: "",
    };
  }

  static async verifySignature(rawBody: Buffer, signature: string) {
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_API_KEY!)
      .update(rawBody)
      .digest("hex");

    return hash === signature;
  }

  static async handlePaystackEvent(event: any) {
    const transaction = await sequelize.transaction();

    try {
      switch (event.event) {
        case "charge.success": {
          const data = event.data;

          const paymentReference = data.reference;

          const order = await OrderModel.findOne({
            where: {
              paymentReference: paymentReference,
            },
            transaction,
          });
          if (!order) {
            throw new Error(`Order not found for ${paymentReference}`);
          }

          if (order.paymentStatus === "PAID") {
            await transaction.commit();

            return;
          }

          await order.update(
            {
              paymentStatus: "PAID",
              orderStatus: "PREPARING",
              transactionId: data.id.toString(),
            },
            {
              transaction,
            },
          );

          await transaction.commit();

          return order;
        }

        case "charge.failed": {
          const data = event.data;

          const paymentReference = data.reference;
          const order = await OrderModel.findOne({
            where: {
              paymentReference: paymentReference,
            },
            transaction,
          });

          if (!order) {
            await transaction.commit();

            return;
          }

          await order.update({ paymentStatus: "FAILED" }, { transaction });

          await transaction.commit();

          return;
        }
        default:
          console.log(`Unhandled event :${event.event}`);

          await transaction.commit();

          return;
      }
    } catch (error) {
      await transaction.rollback();

      console.log(error);

      throw error;
    }
  }
}
