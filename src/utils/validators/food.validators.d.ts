import { z } from "zod";
/**
 * ----------------------------------------
 * FOOD CATEGORY ENUM
 * ----------------------------------------
 */
export declare const foodCategoryEnum: z.ZodEnum<{
    STARTERS: "STARTERS";
    SOUPS_AND_SWALLOWS: "SOUPS_AND_SWALLOWS";
    RICE_AND_GRAINS: "RICE_AND_GRAINS";
    GRILLS_AND_PROTEINS: "GRILLS_AND_PROTEINS";
    DESSERTS: "DESSERTS";
    DRINKS: "DRINKS";
}>;
/**
 * ----------------------------------------
 * CREATE FOOD SCHEMA
 * ----------------------------------------
 */
export declare const createFoodSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    category: z.ZodString;
    price: z.ZodCoercedNumber<unknown>;
    discountPrice: z.ZodOptional<z.ZodNumber>;
    image: z.ZodOptional<z.ZodArray<z.ZodString>>;
    badge: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodUUID;
    isAvailable: z.ZodDefault<z.ZodCoercedBoolean<unknown>>;
    quantity: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
/**
 * ----------------------------------------
 * UPDATE FOOD SCHEMA
 * ----------------------------------------
 */
export declare const updateFoodSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    discountPrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    badge: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    categoryId: z.ZodOptional<z.ZodUUID>;
    isAvailable: z.ZodOptional<z.ZodDefault<z.ZodCoercedBoolean<unknown>>>;
    quantity: z.ZodOptional<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
/**
 * ----------------------------------------
 * FOOD QUERY SCHEMA
 * ----------------------------------------
 */
export declare const foodQuerySchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodEnum<{
        STARTERS: "STARTERS";
        SOUPS_AND_SWALLOWS: "SOUPS_AND_SWALLOWS";
        RICE_AND_GRAINS: "RICE_AND_GRAINS";
        GRILLS_AND_PROTEINS: "GRILLS_AND_PROTEINS";
        DESSERTS: "DESSERTS";
        DRINKS: "DRINKS";
    }>>;
    search: z.ZodOptional<z.ZodString>;
    featured: z.ZodOptional<z.ZodEnum<{
        true: "true";
        false: "false";
    }>>;
    available: z.ZodOptional<z.ZodEnum<{
        true: "true";
        false: "false";
    }>>;
    minPrice: z.ZodOptional<z.ZodString>;
    maxPrice: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * ----------------------------------------
 * TYPES
 * ----------------------------------------
 */
export type CreateFoodInput = z.infer<typeof createFoodSchema>;
export type UpdateFoodInput = z.infer<typeof updateFoodSchema>;
//# sourceMappingURL=food.validators.d.ts.map