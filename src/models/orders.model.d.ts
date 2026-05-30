import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
export declare class OrderModel extends Model<InferAttributes<OrderModel>, InferCreationAttributes<OrderModel>> {
    id: CreationOptional<string>;
    orderNumber: string;
    phoneNumber: string;
    deliveryType: "DELIVERY" | "PICKUP";
    deliveryAddress: string;
    subtotal: number;
    deliveryFee: number;
    transactionId?: string | null;
    totalAmount: number;
    paymentReference: CreationOptional<string>;
    paymentMethod: "BANK_TRANSFER" | "CARD" | "CASH_ON_DELIVERY";
    paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
    orderStatus: "PENDING_PAYMENT" | "PAID" | "CONFIRMED" | "DELIVERED" | "CANCELLED" | "FAILED" | "OUT_FOR_DELIVERY";
    whatsappNotificationSent?: boolean;
    customerWhatsappSent?: boolean;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}
//# sourceMappingURL=orders.model.d.ts.map