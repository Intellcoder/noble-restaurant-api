"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const nanoid_1 = require("nanoid");
const config_1 = require("../config");
const orders_model_1 = require("../models/orders.model");
const orderItem_model_1 = require("../models/orderItem.model");
const whatsapp_services_1 = require("../services/whatsapp.services");
const Payment_1 = require("../utils/Payment");
const mailservices_1 = __importDefault(require("../utils/mailservices"));
const template_1 = require("../utils/template");
const whatsappService = new whatsapp_services_1.WhatsAppService();
class OrderServices {
    /**
     * ----------------------------------------
     * GENERATE ORDER NUMBER
     * ----------------------------------------
     */
    static generateOrderNumber() {
        const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const nanoid = (0, nanoid_1.customAlphabet)(alphabet, 6);
        return `NR-${nanoid()}`;
    }
    /**
     * ----------------------------------------
     * CREATE ORDER
     * ----------------------------------------
     */
    static async createOrder(payload) {
        const transaction = await config_1.sequelize.transaction();
        try {
            const subtotal = payload.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
            const deliveryFee = payload.deliveryType === "DELIVERY" ? 1000 : 0;
            const totalAmount = subtotal + deliveryFee;
            const orderNumber = this.generateOrderNumber();
            const order = await orders_model_1.OrderModel.create({
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
            }, { transaction });
            const orderItems = payload.items.map((item) => ({
                orderId: order.id,
                foodId: item.foodId,
                foodName: item.foodName,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.quantity * item.unitPrice,
            }));
            await orderItem_model_1.OrderItemModel.bulkCreate(orderItems, { transaction });
            // Initialize payment
            const payment = await Payment_1.PaymentService.initializePayment({
                amount: totalAmount,
                orderNumber,
                phoneNumber: payload.phoneNumber,
            });
            // Save transaction reference
            await order.update({
                transactionId: payment.transactionReference,
                paymentReference: payment.transactionReference,
            }, { transaction });
            await transaction.commit();
            // Send admin notification (async)
            const mail = await mailservices_1.default.sendMail({
                to: process.env.ADMIN_EMAIL,
                subject: `🍽 New Order ${orderNumber}`,
                html: (0, template_1.adminOrderTemplate)({
                    orderNumber,
                    customerPhone: payload.phoneNumber,
                    deliveryType: payload.deliveryType,
                    deliveryAddress: payload.deliveryAddress,
                    totalAmount,
                    items: orderItems.map((item) => ({
                        foodName: item.foodName,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                    })),
                }),
            }).catch((err) => {
                console.log("Admin email failed:", err);
            });
            return {
                success: true,
                message: "Order created. Awaiting payment",
                data: {
                    order,
                    paymentLink: payment.checkoutUrl,
                    transactionReference: payment.transactionReference,
                },
            };
        }
        catch (error) {
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
    static async getOrderById(id) {
        const order = await orders_model_1.OrderModel.findByPk(id, {
            include: [
                {
                    model: orderItem_model_1.OrderItemModel,
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
    static async findByOrderNumber(orderNumber) {
        const order = await orders_model_1.OrderModel.findOne({
            where: {
                orderNumber,
            },
            include: [
                {
                    model: orderItem_model_1.OrderItemModel,
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
        const { count, rows } = await orders_model_1.OrderModel.findAndCountAll({
            include: [
                {
                    model: orderItem_model_1.OrderItemModel,
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
    static async verifyPayment(orderId) {
        console.log("running");
        const order = await orders_model_1.OrderModel.findOne({
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
    static async verifyOrder(orderId) {
        console.log("running");
        const order = await orders_model_1.OrderModel.findOne({
            where: {
                orderNumber: orderId,
            },
        });
        if (!order) {
            throw new Error("Order not found");
        }
        order.paymentStatus = "PAID";
        order.orderStatus = "PAID";
        /**
         * --------------------------------
         * VERIFY FROM PAYMENT PROVIDER
         * --------------------------------
         */
        // TODO:
        // VERIFY WITH MONIEPOINT/PAYSTACK
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
    static async updateOrderStatus(orderId, status) {
        const order = await orders_model_1.OrderModel.findByPk(orderId);
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
            await whatsappService.sendDeliveryUpdate(order.phoneNumber, order.orderNumber, status);
        }
        catch (error) {
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
    static async delete(orderId) {
        const order = await orders_model_1.OrderModel.findByPk(orderId);
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
exports.OrderServices = OrderServices;
//# sourceMappingURL=order.services.js.map