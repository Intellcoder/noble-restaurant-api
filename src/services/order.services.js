"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const nanoid_1 = require("nanoid");
const config_1 = require("../config");
const orders_model_1 = require("../models/orders.model");
const orderItem_model_1 = require("../models/orderItem.model");
const whatsapp_services_1 = require("../services/whatsapp.services");
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
            /**
             * --------------------------------
             * CALCULATE TOTALS
             * --------------------------------
             */
            const subtotal = payload.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
            const deliveryFee = payload.deliveryType === "DELIVERY" ? 1000 : 0;
            const totalAmount = subtotal + deliveryFee;
            /**
             * --------------------------------
             * GENERATE ORDER NUMBER
             * --------------------------------
             */
            const orderNumber = this.generateOrderNumber();
            /**
             * --------------------------------
             * CREATE ORDER
             * --------------------------------
             */
            const order = await orders_model_1.OrderModel.create({
                orderNumber,
                phoneNumber: payload.phoneNumber,
                deliveryType: payload.deliveryType,
                deliveryAddress: payload.deliveryAddress ?? null,
                subtotal,
                deliveryFee,
                totalAmount,
                paymentMethod: payload.paymentMethod,
                paymentStatus: "PENDING",
                orderStatus: "PENDING_PAYMENT",
                transactionId: null,
            }, { transaction });
            /**
             * --------------------------------
             * CREATE ORDER ITEMS
             * --------------------------------
             */
            const orderItems = payload.items.map((item) => ({
                orderId: order.id,
                foodId: item.foodId,
                foodName: item.foodName,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.quantity * item.unitPrice,
            }));
            await orderItem_model_1.OrderItemModel.bulkCreate(orderItems, {
                transaction,
            });
            /**
             * --------------------------------
             * COMMIT TRANSACTION
             * --------------------------------
             */
            await transaction.commit();
            /**
             * --------------------------------
             * SEND PENDING ORDER TO ADMIN
             * --------------------------------
             */
            try {
                await whatsappService.sendAdminOrderNotification({
                    orderNumber: order.orderNumber,
                    phoneNumber: order.phoneNumber,
                    totalAmount: order.totalAmount,
                });
            }
            catch (error) {
                console.error("Admin WhatsApp Error:", error);
            }
            /**
             * --------------------------------
             * SEND CUSTOMER MESSAGE
             * --------------------------------
             */
            try {
                await whatsappService.sendOrderConfirmation(order.phoneNumber, order.orderNumber, order.totalAmount);
            }
            catch (error) {
                console.error("Customer WhatsApp Error:", error);
            }
            return {
                success: true,
                message: "Order created successfully",
                data: order,
            };
        }
        catch (error) {
            await transaction.rollback();
            console.error(error);
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
    static async verifyPayment(orderId, paymentReference) {
        const order = await orders_model_1.OrderModel.findByPk(orderId);
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
        const paymentVerified = true;
        /**
         * --------------------------------
         * PAYMENT FAILED
         * --------------------------------
         */
        if (!paymentVerified) {
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
        order.paymentReference = paymentReference;
        await order.save();
        /**
         * --------------------------------
         * SEND PAYMENT SUCCESS TO CUSTOMER
         * --------------------------------
         */
        try {
            await whatsappService.sendPaymentSuccess(order.phoneNumber, order.orderNumber);
        }
        catch (error) {
            console.error("Customer payment message failed:", error);
        }
        /**
         * --------------------------------
         * SEND CONFIRMED ORDER TO ADMIN
         * --------------------------------
         */
        try {
            await whatsappService.sendMessage({
                phone: process.env.ADMIN_PHONE,
                message: `
🟢 PAYMENT CONFIRMED

Order:
${order.orderNumber}

Total:
₦${order.totalAmount}

START PREPARING ORDER 🍽️
`,
            });
        }
        catch (error) {
            console.error("Admin confirmation message failed:", error);
        }
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