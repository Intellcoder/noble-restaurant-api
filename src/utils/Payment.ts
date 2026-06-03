// services/payment.service.ts

import axios from "axios";
import { OrderModel } from "../models/orders.model";
import { or } from "sequelize";
import { success } from "zod";
import { WhatsAppService } from "../services/whatsapp.services";

const whatsappService = new WhatsAppService();
export class PaymentService {
  static async initializePayment(data: {
    amount: number;
    orderNumber: string;
    phoneNumber: string;
  }) {
    try {
      const response = await axios.post(
        `${process.env.MONNIFY_BASE_URL}/merchant/transactions/init-transaction`,
        {
          amount: data.amount,
          customerName: "Customer",
          customerEmail: `${data.phoneNumber}@noblefoods.com`,
          paymentReference: data.orderNumber,
          paymentDescription: `Order ${data.orderNumber}`,

          currencyCode: "NGN",

          contractCode: process.env.MONNIFY_CONTRACT_CODE,

          redirectUrl: `${process.env.FRONTEND_URL}/payment/success`,

          paymentMethods: ["CARD", "ACCOUNT_TRANSFER", "USSD"],
        },
        {
          headers: {
            Authorization: `Bearer ${await this.getAccessToken()}`,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data.responseBody;
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
    console.log("Payment ref from moniffy:", orderNumber);
    const order = await OrderModel.findOne({
      where: { orderNumber },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    let paymentVerified = false;
    const transactionReference = order.paymentReference;

    if (!transactionReference) {
      throw new Error(
        "Order has no payment refrence - cannot verify with monnify",
      );
    }

    try {
      const accessToken = await this.getAccessToken();
      const baseUrl = process.env.MONNIFY_BASE_URL!;

      const encodeRef = encodeURIComponent(transactionReference);

      const { data } = await axios.get(`${baseUrl}/transactions/${encodeRef}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { paymentStatus, amountPaid } = data.responseBody;

      const amountMatches = Number(amountPaid) >= Number(order.totalAmount);

      paymentVerified = paymentStatus === "PAID" && amountMatches;

      if (!amountMatches) {
        console.warn(
          `[verifyPayment] Amount mismatch — expected: ${order.totalAmount}, paid: ${amountPaid}, ref: ${transactionReference}`,
        );
      }
    } catch (error: any) {
      console.error(
        "[verifyPayment] Monnify verification API error:",
        error?.response?.data ?? error?.message,
      );
      // Rethrow so the caller (webhook or controller) can handle it
      throw new Error("Payment verification failed — Monnify API error");
    }

    if (!paymentVerified) {
      order.paymentStatus = "FAILED";
      order.orderStatus = "FAILED";
      await order.save();

      return {
        success: false,
        message: "Payment verification failed",
      };
    }

    if (order.paymentStatus === "PAID") {
      console.info(
        `[verifyPayment] Order already verified — skipping. ref: ${orderNumber}`,
      );
      return {
        success: true,
        message: "Payment already verified",
        data: order,
      };
    }

    order.paymentStatus = "PAID";
    order.orderStatus = "CONFIRMED";

    await order.save();

    try {
      await whatsappService.sendPaymentSuccess(
        order.phoneNumber,
        order.orderNumber,
      );
    } catch (error) {
      console.error("[verifyPayment] Customer WhatsApp message failed:", error);
    }

    /**
     * ─────────────────────────────────────────────────────────────
     * NOTIFY ADMIN
     * ─────────────────────────────────────────────────────────────
     */
    try {
      await whatsappService.sendMessage({
        phone: process.env.ADMIN_PHONE!,
        message: `
🟢 PAYMENT CONFIRMED
 
Order: ${order.orderNumber}
Total: ₦${Number(order.totalAmount).toLocaleString()}
 
START PREPARING ORDER 🍽️
        `.trim(),
      });
    } catch (error) {
      console.error("[verifyPayment] Admin WhatsApp message failed:", error);
    }

    return {
      success: true,
      message: "Payment verified successfully",
      data: order,
    };
  }
}
