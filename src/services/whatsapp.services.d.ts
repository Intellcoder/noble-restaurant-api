export interface SendWhatsAppMessageDto {
    phone: string;
    message: string;
}
export declare class WhatsAppService {
    private client;
    private readonly token;
    private readonly phoneNumberId;
    constructor();
    /**
     * ----------------------------------------
     * SEND TEXT MESSAGE
     * ----------------------------------------
     */
    sendMessage(payload: SendWhatsAppMessageDto): Promise<{
        success: boolean;
        data: any;
    }>;
    /**
     * ----------------------------------------
     * SEND ORDER CONFIRMATION
     * ----------------------------------------
     */
    sendOrderConfirmation(phone: string, orderNumber: string, totalAmount: number): Promise<{
        success: boolean;
        data: any;
    }>;
    /**
     * ----------------------------------------
     * SEND ADMIN NOTIFICATION
     * ----------------------------------------
     */
    sendAdminOrderNotification(order: {
        orderNumber: string;
        phoneNumber: string;
        totalAmount: number;
    }): Promise<{
        success: boolean;
        data: any;
    }>;
    /**
     * ----------------------------------------
     * SEND PAYMENT SUCCESS
     * ----------------------------------------
     */
    sendPaymentSuccess(phone: string, orderNumber: string): Promise<{
        success: boolean;
        data: any;
    }>;
    sendAdminPaymentSuccess(phone: string, orderNumber: string): Promise<{
        success: boolean;
        data: any;
    }>;
    /**
     * ----------------------------------------
     * SEND DELIVERY UPDATE
     * ----------------------------------------
     */
    sendDeliveryUpdate(phone: string, orderNumber: string, status: string): Promise<{
        success: boolean;
        data: any;
    }>;
    /**
     * ----------------------------------------
     * FORMAT PHONE NUMBER
     * ----------------------------------------
     */
    private formatPhoneNumber;
}
//# sourceMappingURL=whatsapp.services.d.ts.map