// validators/food.validation.ts

import { z } from "zod";

/**
 * ----------------------------------------
 * FOOD CATEGORY ENUM
 * ----------------------------------------
 */
export const foodCategoryEnum = z.enum([
  "STARTERS",
  "SOUPS_AND_SWALLOWS",
  "RICE_AND_GRAINS",
  "GRILLS_AND_PROTEINS",
  "DESSERTS",
  "DRINKS",
]);

/**
 * ----------------------------------------
 * CREATE FOOD SCHEMA
 * ----------------------------------------
 */
export const createFoodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Food name is required")
    .max(120, "Food name is too long"),

  description: z
    .string()
    .trim()
    .min(10, "Description is too short")
    .max(1000, "Description is too long"),

  category: z.string().min(1, "category is required"),

  price: z.coerce.number().min(1, "Price must be greater than 0"),

  discountPrice: z.number().min(0).optional(),

  //   image: z.string().url("Invalid image URL"),

  image: z.array(z.string()).optional(),

  badge: z.string().min(1).optional(),

  categoryId: z.uuid(),

  isAvailable: z.coerce.boolean().default(true),

  quantity: z.coerce.number().min(0).optional(),
});

/**
 * ----------------------------------------
 * UPDATE FOOD SCHEMA
 * ----------------------------------------
 */
export const updateFoodSchema = createFoodSchema.partial();

/**
 * ----------------------------------------
 * FOOD QUERY SCHEMA
 * ----------------------------------------
 */
export const foodQuerySchema = z.object({
  category: foodCategoryEnum.optional(),

  search: z.string().trim().optional(),

  featured: z.enum(["true", "false"]).optional(),

  available: z.enum(["true", "false"]).optional(),

  minPrice: z.string().optional(),

  maxPrice: z.string().optional(),

  page: z.string().optional(),

  limit: z.string().optional(),
});

/**
 * ----------------------------------------
 * TYPES
 * ----------------------------------------
 */

export type CreateFoodInput = z.infer<typeof createFoodSchema>;

export type UpdateFoodInput = z.infer<typeof updateFoodSchema>;
