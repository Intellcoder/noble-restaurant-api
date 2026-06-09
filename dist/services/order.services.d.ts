import { OrderModel } from "../models/orders.model";
import { CreateOrderDto } from "../types";
export declare class OrderServices {
    /**
     * ----------------------------------------
     * GENERATE ORDER NUMBER
     * ----------------------------------------
     */
    private static generateOrderNumber;
    /**
     * ----------------------------------------
     * CREATE ORDER
     * ----------------------------------------
     */
    static createOrder(payload: CreateOrderDto): Promise<{
        success: boolean;
        message: string;
        data: {
            order: OrderModel;
            paymentLink: any;
            transactionReference: any;
        };
    }>;
    /**
     * ----------------------------------------
     * GET ORDER BY ID
     * ----------------------------------------
     */
    static getOrderById(id: string): Promise<OrderModel>;
    /**
     * ----------------------------------------
     * FIND ORDER BY ORDER NUMBER
     * ----------------------------------------
     */
    static findByOrderNumber(orderNumber: string): Promise<OrderModel>;
    /**
     * ----------------------------------------
     * GET ALL ORDERS
     * ----------------------------------------
     */
    static findAllOrders(): Promise<{
        success: boolean;
        totalOrders: number;
        orders: OrderModel[];
    }>;
    /**
     * ----------------------------------------
     * VERIFY PAYMENT
     * ----------------------------------------
     */
    static verifyPayment(orderId: string): Promise<void>;
    static verifyOrder(orderId: string): Promise<{
        success: boolean;
        message: string;
        data: OrderModel;
    }>;
    /**
     * ----------------------------------------
     * UPDATE ORDER STATUS
     * ----------------------------------------
     */
    static updateOrderStatus(orderId: string, status: "PENDING_PAYMENT" | "PAID" | "CONFIRMED" | "DELIVERED" | "CANCELLED" | "FAILED" | "OUT_FOR_DELIVERY"): Promise<{
        success: boolean;
        message: string;
        data: OrderModel;
    }>;
    /**
     * ----------------------------------------
     * DELETE ORDER
     * ----------------------------------------
     */
    static delete(orderId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=order.services.d.ts.map