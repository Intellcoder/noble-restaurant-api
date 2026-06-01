import { customAlphabet } from "nanoid";

import { sequelize } from "../config";

import { OrderModel } from "../models/orders.model";
import { OrderItemModel } from "../models/orderItem.model";

import { CreateOrderDto } from "../types";

import { WhatsAppService } from "../services/whatsapp.services";
import { PaymentService } from "../utils/Payment";
import axios from "axios";

const whatsappService = new WhatsAppService();

export class OrderServices {
  /**
   * ----------------------------------------
   * GENERATE ORDER NUMBER
   * ----------------------------------------
   */
  private static generateOrderNumber() {
    const alphabet =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    const nanoid = customAlphabet(alphabet, 6);

    return `NR-${nanoid()}`;
  }

  /**
   * ----------------------------------------
   * CREATE ORDER
   * ----------------------------------------
   */

  static async createOrder(payload: CreateOrderDto) {
    const transaction = await sequelize.transaction();

    try {
      const subtotal = payload.items.reduce(
        (acc, item) => acc + item.quantity * item.unitPrice,
        0,
      );

      const deliveryFee = payload.deliveryType === "DELIVERY" ? 1000 : 0;

      const totalAmount = subtotal + deliveryFee;

      const orderNumber = this.generateOrderNumber();

      const order = await OrderModel.create(
        {
          orderNumber,

          phoneNumber: payload.phoneNumber,

          deliveryType: payload.deliveryType,

          deliveryAddress: payload.deliveryAddress ?? null,

          subtotal,

          deliveryFee,

          totalAmount,

          // paymentMethod: payload.paymentMethod,

          paymentStatus: "PENDING",

          orderStatus: "PENDING_PAYMENT",

          transactionId: null,
        },
        { transaction },
      );

      const orderItems = payload.items.map((item) => ({
        orderId: order.id,

        foodId: item.foodId,

        foodName: item.foodName,

        quantity: item.quantity,

        unitPrice: item.unitPrice,

        totalPrice: item.quantity * item.unitPrice,
      }));

      await OrderItemModel.bulkCreate(orderItems, { transaction });

      // Initialize payment
      const payment = await PaymentService.initializePayment({
        amount: totalAmount,

        orderNumber,

        phoneNumber: payload.phoneNumber,
      });

      // Save transaction reference
      await order.update(
        {
          transactionId: payment.transactionReference,
          paymentReference: payment.transactionReference,
        },
        { transaction },
      );

      await transaction.commit();
      console.log("payment", payment.responseBody);
      console.log("paymentref", payment.transactionReference);
      return {
        success: true,

        message: "Order created. Awaiting payment",

        data: {
          order,

          paymentLink: payment.checkoutUrl,

          transactionReference: payment.transactionReference,
        },
      };
    } catch (error) {
      await transaction.rollback();

      console.log(error);

      throw new Error("Failed to create order");
    }
  }

  /**
   * ----------------------------------------
   * GET ORDER BY ID
   * ----------------------------------------
   */
  static async getOrderById(id: string) {
    const order = await OrderModel.findByPk(id, {
      include: [
        {
          model: OrderItemModel,
          as: "items",
        },
      ],
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  /**
   * ----------------------------------------
   * FIND ORDER BY ORDER NUMBER
   * ----------------------------------------
   */
  static async findByOrderNumber(orderNumber: string) {
    const order = await OrderModel.findOne({
      where: {
        orderNumber,
      },

      include: [
        {
          model: OrderItemModel,
          as: "items",
        },
      ],
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  /**
   * ----------------------------------------
   * GET ALL ORDERS
   * ----------------------------------------
   */
  static async findAllOrders() {
    const { count, rows } = await OrderModel.findAndCountAll({
      include: [
        {
          model: OrderItemModel,
          as: "items",
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    return {
      success: true,

      totalOrders: count,

      orders: rows,
    };
  }

  /**
   * ----------------------------------------
   * VERIFY PAYMENT
   * ----------------------------------------
   */
  static async verifyPayment(orderId: string) {
    console.log("running");
    const order = await OrderModel.findOne({
      where: {
        orderNumber: orderId,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    /**
     * --------------------------------
     * VERIFY FROM PAYMENT PROVIDER
     * --------------------------------
     */

    // TODO:
    // VERIFY WITH MONIEPOINT/PAYSTACK

    const paymentVerified = order.paymentStatus;

    /**
     * --------------------------------
     * PAYMENT FAILED
     * --------------------------------
     */
    if (paymentVerified !== "PAID") {
      order.paymentStatus = "FAILED";

      order.orderStatus = "FAILED";

      await order.save();

      return {
        success: false,

        message: "Payment verification failed",
      };
    }

    /**
     * --------------------------------
     * UPDATE ORDER
     * --------------------------------
     */
    order.paymentStatus = "PAID";

    order.orderStatus = "CONFIRMED";

    await order.save();

    /**
     * --------------------------------
     * SEND PAYMENT SUCCESS TO CUSTOMER
     * --------------------------------
     */
    // try {
    //   await whatsappService.sendPaymentSuccess(
    //     order.phoneNumber,

    //     order.orderNumber,
    //   );
    // } catch (error) {
    //   console.error("Customer payment message failed:", error);
    // }

    /**
     * --------------------------------
     * SEND CONFIRMED ORDER TO ADMIN
     * --------------------------------
     */
    //     try {
    //       await whatsappService.sendMessage({
    //         phone: process.env.ADMIN_PHONE!,

    //         message: `
    // 🟢 PAYMENT CONFIRMED

    // Order:
    // ${order.orderNumber}

    // Total:
    // ₦${order.totalAmount}

    // START PREPARING ORDER 🍽️
    // `,
    //       });
    //     } catch (error) {
    //       console.error("Admin confirmation message failed:", error);
    //     }

    return {
      success: true,

      message: "Payment verified successfully",

      data: order,
    };
  }

  /**
   * ----------------------------------------
   * UPDATE ORDER STATUS
   * ----------------------------------------
   */
  static async updateOrderStatus(
    orderId: string,

    status:
      | "PENDING_PAYMENT"
      | "PAID"
      | "CONFIRMED"
      | "DELIVERED"
      | "CANCELLED"
      | "FAILED"
      | "OUT_FOR_DELIVERY",
  ) {
    const order = await OrderModel.findByPk(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.orderStatus = status;

    await order.save();

    /**
     * --------------------------------
     * SEND STATUS UPDATE
     * --------------------------------
     */
    try {
      await whatsappService.sendDeliveryUpdate(
        order.phoneNumber,

        order.orderNumber,

        status,
      );
    } catch (error) {
      console.error("Status update failed:", error);
    }

    return {
      success: true,

      message: "Order status updated",

      data: order,
    };
  }

  /**
   * ----------------------------------------
   * DELETE ORDER
   * ----------------------------------------
   */
  static async delete(orderId: string) {
    const order = await OrderModel.findByPk(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    await order.destroy();

    return {
      success: true,

      message: "Order deleted successfully",
    };
  }
}
