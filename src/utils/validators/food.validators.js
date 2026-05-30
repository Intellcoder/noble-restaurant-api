"use strict";
// validators/food.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodQuerySchema = exports.updateFoodSchema = exports.createFoodSchema = exports.foodCategoryEnum = void 0;
const zod_1 = require("zod");
/**
 * ----------------------------------------
 * FOOD CATEGORY ENUM
 * ----------------------------------------
 */
exports.foodCategoryEnum = zod_1.z.enum([
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
exports.createFoodSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, "Food name is required")
        .max(120, "Food name is too long"),
    description: zod_1.z
        .string()
        .trim()
        .min(10, "Description is too short")
        .max(1000, "Description is too long"),
    category: zod_1.z.string().min(1, "category is required"),
    price: zod_1.z.coerce.number().min(1, "Price must be greater than 0"),
    discountPrice: zod_1.z.number().min(0).optional(),
    //   image: z.string().url("Invalid image URL"),
    image: zod_1.z.array(zod_1.z.string()).optional(),
    badge: zod_1.z.string().min(1).optional(),
    categoryId: zod_1.z.uuid(),
    isAvailable: zod_1.z.coerce.boolean().default(true),
    quantity: zod_1.z.coerce.number().min(0).optional(),
});
/**
 * ----------------------------------------
 * UPDATE FOOD SCHEMA
 * ----------------------------------------
 */
exports.updateFoodSchema = exports.createFoodSchema.partial();
/**
 * ----------------------------------------
 * FOOD QUERY SCHEMA
 * ----------------------------------------
 */
exports.foodQuerySchema = zod_1.z.object({
    category: exports.foodCategoryEnum.optional(),
    search: zod_1.z.string().trim().optional(),
    featured: zod_1.z.enum(["true", "false"]).optional(),
    available: zod_1.z.enum(["true", "false"]).optional(),
    minPrice: zod_1.z.string().optional(),
    maxPrice: zod_1.z.string().optional(),
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
});
//# sourceMappingURL=food.validators.js.map