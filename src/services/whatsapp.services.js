"use strict";
// shared/services/whatsapp.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppService = void 0;
const axios_1 = __importDefault(require("axios"));
class WhatsAppService {
    client;
    token;
    phoneNumberId;
    constructor() {
        this.token = process.env.WHATSAPP_ACCESS_TOKEN;
        this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        this.client = axios_1.default.create({
            baseURL: "https://graph.facebook.com/v19.0",
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-Type": "application/json",
            },
        });
    }
    /**
     * ----------------------------------------
     * SEND TEXT MESSAGE
     * ----------------------------------------
     */
    async sendMessage(payload) {
        try {
            const response = await this.client.post(`/${this.phoneNumberId}/messages`, {
                messaging_product: "whatsapp",
                to: this.formatPhoneNumber(payload.phone),
                type: "text",
                text: {
                    body: payload.message,
                },
            });
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            console.error("WhatsApp Error:", error?.response?.data || error.message);
            throw new Error("Failed to send WhatsApp message");
        }
    }
    /**
     * ----------------------------------------
     * SEND ORDER CONFIRMATION
     * ----------------------------------------
     */
    async sendOrderConfirmation(phone, orderNumber, totalAmount) {
        const message = `
🍽️ Noble Restaurant

✅ Your order has been received.

Order Number:
${orderNumber}

Total:
₦${totalAmount}

Your food is now being prepared 👨‍🍳
`;
        return await this.sendMessage({
            phone,
            message,
        });
    }
    /**
     * ----------------------------------------
     * SEND ADMIN NOTIFICATION
     * ----------------------------------------
     */
    async sendAdminOrderNotification(order) {
        const adminPhone = process.env.ADMIN_PHONE;
        const message = `
🚨 NEW ORDER RECEIVED

Order:
${order.orderNumber}

Phone:
${order.phoneNumber}

Total:
₦${order.totalAmount}
`;
        return await this.sendMessage({
            phone: adminPhone,
            message,
        });
    }
    /**
     * ----------------------------------------
     * SEND PAYMENT SUCCESS
     * ----------------------------------------
     */
    async sendPaymentSuccess(phone, orderNumber) {
        const message = `
💳 Payment Confirmed

Order:
${orderNumber}

Your order is now confirmed ✅
`;
        return await this.sendMessage({
            phone,
            message,
        });
    }
    async sendAdminPaymentSuccess(phone, orderNumber) {
        const message = `
💳 Payment Confirmed

Order:
${orderNumber}

Payment for this order is now confirmed ✅
`;
        return await this.sendMessage({
            phone,
            message,
        });
    }
    /**
     * ----------------------------------------
     * SEND DELIVERY UPDATE
     * ----------------------------------------
     */
    async sendDeliveryUpdate(phone, orderNumber, status) {
        const message = `
📦 Order Update

Order:
${orderNumber}

Status:
${status}
`;
        return await this.sendMessage({
            phone,
            message,
        });
    }
    /**
     * ----------------------------------------
     * FORMAT PHONE NUMBER
     * ----------------------------------------
     */
    formatPhoneNumber(phone) {
        /**
         * Convert:
         * 08012345678
         * → 2348012345678
         */
        if (phone.startsWith("0")) {
            return `234${phone.slice(1)}`;
        }
        return phone;
    }
}
exports.WhatsAppService = WhatsAppService;
//# sourceMappingURL=whatsapp.services.js.map