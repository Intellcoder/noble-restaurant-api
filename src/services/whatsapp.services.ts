// shared/services/whatsapp.service.ts

import axios, { AxiosInstance } from "axios";

export interface SendWhatsAppMessageDto {
  phone: string;

  message: string;
}

export class WhatsAppService {
  private client: AxiosInstance;

  private readonly token: string;

  private readonly phoneNumberId: string;

  constructor() {
    this.token = process.env.WHATSAPP_ACCESS_TOKEN!;

    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID!;

    this.client = axios.create({
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

  async sendMessage(payload: SendWhatsAppMessageDto) {
    try {
      const response = await this.client.post(
        `/${this.phoneNumberId}/messages`,
        {
          messaging_product: "whatsapp",

          to: this.formatPhoneNumber(payload.phone),

          type: "text",

          text: {
            body: payload.message,
          },
        },
      );

      return {
        success: true,

        data: response.data,
      };
    } catch (error: any) {
      console.error("WhatsApp Error:", error?.response?.data || error.message);

      throw new Error("Failed to send WhatsApp message");
    }
  }

  /**
   * ----------------------------------------
   * SEND ORDER CONFIRMATION
   * ----------------------------------------
   */

  async sendOrderConfirmation(
    phone: string,

    orderNumber: string,

    totalAmount: number,
  ) {
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

  async sendAdminOrderNotification(order: {
    orderNumber: string;
    phoneNumber: string;
    totalAmount: number;
  }) {
    const adminPhone = process.env.ADMIN_PHONE!;

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

  async sendPaymentSuccess(
    phone: string,

    orderNumber: string,
  ) {
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

  async sendAdminPaymentSuccess(
    phone: string,

    orderNumber: string,
  ) {
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

  async sendDeliveryUpdate(
    phone: string,

    orderNumber: string,

    status: string,
  ) {
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

  private formatPhoneNumber(phone: string) {
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
