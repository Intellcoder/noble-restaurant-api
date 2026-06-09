"use strict";
// services/payment.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const axios_1 = __importDefault(require("axios"));
const orders_model_1 = require("../models/orders.model");
const crypto_1 = __importDefault(require("crypto"));
const whatsapp_services_1 = require("../services/whatsapp.services");
const config_1 = require("../config");
const whatsappService = new whatsapp_services_1.WhatsAppService();
const header = {
    Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
    "Content-Type": "application/json",
};
class PaymentService {
    static async initializePayment(data) {
        try {
            let configData = {
                email: "noblerestaurantng@gmail.com",
                amount: data.amount * 100,
                callback_url: `${process.env.FRONTEND_URL}/payment/verify/paystack?reference={${data.orderNumber}`,
                metadata: {
                    cancel_action: `${process.env.FRONTEND_URL}/payment/verify/paystack?reference={${data.orderNumber}`,
                    orderNumber: data.orderNumber,
                },
            };
            const response = await axios_1.default.post("https://api.paystack.co/transaction/initialize", {
                ...configData,
            }, {
                headers: header,
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Payment initialization failed");
        }
    }
    static async getAccessToken() {
        try {
            const auth = Buffer.from(`${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`).toString("base64");
            const response = await axios_1.default.post(`${process.env.MONNIFY_BASE_URL}/auth/login`, {}, {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            });
            return response.data.responseBody.accessToken;
        }
        catch (error) {
            console.log(error);
            throw new Error("Authentication failed");
        }
    }
    static async verifyPayment(orderNumber) {
        console.log("Payment ref from moniffy:", orderNumber);
        const order = await orders_model_1.OrderModel.findOne({
            where: { orderNumber },
        });
        if (!order) {
            throw new Error("Order not found");
        }
        let paymentVerified = false;
        const transactionReference = order.paymentReference;
        if (!transactionReference) {
            throw new Error("Order has no payment refrence - cannot verify with monnify");
        }
        try {
            const accessToken = await this.getAccessToken();
            const baseUrl = process.env.MONNIFY_BASE_URL;
            const encodeRef = encodeURIComponent(transactionReference);
            const { data } = await axios_1.default.get(`${baseUrl}/transactions/${encodeRef}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const { paymentStatus, amountPaid } = data.responseBody;
            const amountMatches = Number(amountPaid) >= Number(order.totalAmount);
            paymentVerified = paymentStatus === "PAID" && amountMatches;
            if (!amountMatches) {
                console.warn(`[verifyPayment] Amount mismatch — expected: ${order.totalAmount}, paid: ${amountPaid}, ref: ${transactionReference}`);
            }
        }
        catch (error) {
            console.error("[verifyPayment] Monnify verification API error:", error?.response?.data ?? error?.message);
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
            console.info(`[verifyPayment] Order already verified — skipping. ref: ${orderNumber}`);
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
            await whatsappService.sendPaymentSuccess(order.phoneNumber, order.orderNumber);
        }
        catch (error) {
            console.error("[verifyPayment] Customer WhatsApp message failed:", error);
        }
        /**
         * ─────────────────────────────────────────────────────────────
         * NOTIFY ADMIN
         * ─────────────────────────────────────────────────────────────
         */
        try {
            await whatsappService.sendMessage({
                phone: process.env.ADMIN_PHONE,
                message: `
🟢 PAYMENT CONFIRMED
 
Order: ${order.orderNumber}
Total: ₦${Number(order.totalAmount).toLocaleString()}
 
START PREPARING ORDER 🍽️
        `.trim(),
            });
        }
        catch (error) {
            console.error("[verifyPayment] Admin WhatsApp message failed:", error);
        }
        return {
            success: true,
            message: "Payment verified successfully",
            data: order,
        };
    }
    static async verifySignature(rawBody, signature) {
        const hash = crypto_1.default
            .createHmac("sha512", process.env.PAYSTACK_API_KEY)
            .update(rawBody)
            .digest("hex");
        return hash === signature;
    }
    static async handlePaystackEvent(event) {
        const transaction = await config_1.sequelize.transaction();
        try {
            switch (event.event) {
                case "charge.success": {
                    const data = event.data;
                    const paymentReference = data.reference;
                    const order = await orders_model_1.OrderModel.findOne({
                        where: {
                            orderNumber: paymentReference,
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
                    await order.update({
                        paymentStatus: "PAID",
                        orderStatus: "PAID",
                        transactionId: data.id.toString(),
                    }, {
                        transaction,
                    });
                    console.log(`Payment verified for order ${order.orderNumber}`);
                    return order;
                }
                case "charge.failed": {
                    const data = event.data;
                    const orderNumber = data.reference;
                    const order = await orders_model_1.OrderModel.findOne({
                        where: {
                            orderNumber: orderNumber,
                        },
                        transaction,
                    });
                    if (order) {
                        await order.update({
                            paymentStatus: "FAILED",
                        }, {
                            transaction,
                        });
                        await transaction.commit();
                        return;
                    }
                }
                default:
                    console.log(`Unhandled event :${event.event}`);
                    await transaction.commit();
                    return;
            }
        }
        catch (error) {
            await transaction.rollback();
            console.log(error);
            throw error;
        }
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=Payment.js.map