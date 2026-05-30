import { z } from "zod";
/**
 * ----------------------------------------
 * ORDER ITEM SCHEMA
 * ----------------------------------------
 */
export declare const orderItemSchema: z.ZodObject<{
    foodId: z.ZodUUID;
    foodName: z.ZodString;
    quantity: z.ZodNumber;
    unitPrice: z.ZodNumber;
}, z.core.$strip>;
/**
 * ----------------------------------------
 * CREATE ORDER SCHEMA
 * ----------------------------------------
 */
export declare const createOrderSchema: z.ZodObject<{
    phoneNumber: z.ZodString;
    deliveryAddress: z.ZodOptional<z.ZodString>;
    paymentMethod: z.ZodEnum<{
        BANK_TRANSFER: "BANK_TRANSFER";
        CARD: "CARD";
    }>;
    items: z.ZodArray<z.ZodObject<{
        foodId: z.ZodUUID;
        foodName: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * ----------------------------------------
 * UPDATE ORDER STATUS SCHEMA
 * ----------------------------------------
 */
export declare const updateOrderStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        PAID: "PAID";
        FAILED: "FAILED";
        PENDING_PAYMENT: "PENDING_PAYMENT";
        CONFIRMED: "CONFIRMED";
        DELIVERED: "DELIVERED";
        CANCELLED: "CANCELLED";
        OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY";
        PREPARING: "PREPARING";
    }>;
}, z.core.$strip>;
/**
 * ----------------------------------------
 * VERIFY PAYMENT SCHEMA
 * ----------------------------------------
 */
export declare const verifyPaymentSchema: z.ZodObject<{
    paymentReference: z.ZodString;
}, z.core.$strip>;
/**
 * ----------------------------------------
 * TYPES
 * ----------------------------------------
 */
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
//# sourceMappingURL=order.validaton.d.ts.map