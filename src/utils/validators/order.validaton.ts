import { z } from "zod";

export const orderItemSchema = z.object({
  foodId: z.string("Invalid food ID"),

  foodName: z.string().min(2, "Food name is required"),

  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),

  unitPrice: z.coerce.number().min(1, "Price must be greater than 0"),
});

export const createOrderSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^(\+234|0)[789][01]\d{8}$/, "Invalid Nigerian phone number"),

  deliveryType: z.enum(["DELIVERY", "PICKUP"]),

  deliveryAddress: z.string().optional(),

  //   paymentMethod: z.enum(["BANK_TRANSFER", "CARD"]),

  items: z.array(orderItemSchema).min(1, "At least one food item is required"),
});

/**
 * ----------------------------------------
 * UPDATE ORDER STATUS SCHEMA
 * ----------------------------------------
 */
export const updateOrderStatusSchema = z.object({
  status: z.enum([
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
export const verifyPaymentSchema = z.object({
  paymentReference: z.string().min(3, "Invalid payment reference"),
});

/**
 * ----------------------------------------
 * TYPES
 * ----------------------------------------
 */

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;

export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
