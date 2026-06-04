import { z } from "zod";
export declare const orderItemSchema: z.ZodObject<{
    foodId: z.ZodString;
    foodName: z.ZodString;
    quantity: z.ZodCoercedNumber<unknown>;
    unitPrice: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export declare const createOrderSchema: z.ZodObject<{
    phoneNumber: z.ZodString;
    deliveryType: z.ZodEnum<{
        DELIVERY: "DELIVERY";
        PICKUP: "PICKUP";
    }>;
    deliveryAddress: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        foodId: z.ZodString;
        foodName: z.ZodString;
        quantity: z.ZodCoercedNumber<unknown>;
        unitPrice: z.ZodCoercedNumber<unknown>;
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