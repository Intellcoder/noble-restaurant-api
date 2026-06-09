import { OrderModel } from "../models/orders.model";
export declare class PaymentService {
    static initializePayment(data: {
        amount: number;
        orderNumber: string;
        phoneNumber: string;
    }): Promise<any>;
    static getAccessToken(): Promise<any>;
    static verifyPayment(orderNumber: string): Promise<{
        success: boolean;
        message: string;
        data?: never;
    } | {
        success: boolean;
        message: string;
        data: OrderModel;
    }>;
    static verifySignature(rawBody: string, signature: string): Promise<boolean>;
    static handlePaystackEvent(event: any): Promise<OrderModel | undefined>;
}
//# sourceMappingURL=Payment.d.ts.map