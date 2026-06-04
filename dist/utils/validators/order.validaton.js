"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPaymentSchema = exports.updateOrderStatusSchema = exports.createOrderSchema = exports.orderItemSchema = void 0;
const zod_1 = require("zod");
exports.orderItemSchema = zod_1.z.object({
    foodId: zod_1.z.string("Invalid food ID"),
    foodName: zod_1.z.string().min(2, "Food name is required"),
    quantity: zod_1.z.coerce.number().min(1, "Quantity must be at least 1"),
    unitPrice: zod_1.z.coerce.number().min(1, "Price must be greater than 0"),
});
exports.createOrderSchema = zod_1.z.object({
    phoneNumber: zod_1.z
        .string()
        .regex(/^(\+234|0)[789][01]\d{8}$/, "Invalid Nigerian phone number"),
    deliveryType: zod_1.z.enum(["DELIVERY", "PICKUP"]),
    deliveryAddress: zod_1.z.string().optional(),
    //   paymentMethod: z.enum(["BANK_TRANSFER", "CARD"]),
    items: zod_1.z.array(exports.orderItemSchema).min(1, "At least one food item is required"),
});
/**
 * ----------------------------------------
 * UPDATE ORDER STATUS SCHEMA
 * ----------------------------------------
 */
exports.updateOrderStatusSchema = zod_1.z.object({
    status: zod_1.z.enum([
        "PENDING_PAYMENT",
        "PAID",
        "CONFIRMED",
        "PREPARING",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "FAILED",
        "CANCELLED",
    ]),
});
/**
 * ----------------------------------------
 * VERIFY PAYMENT SCHEMA
 * ----------------------------------------
 */
exports.verifyPaymentSchema = zod_1.z.object({
    paymentReference: zod_1.z.string().min(3, "Invalid payment reference"),
});
//# sourceMappingURL=order.validaton.js.map