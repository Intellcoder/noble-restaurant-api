"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodService = void 0;
const foods_model_1 = require("../models/foods.model");
class FoodService {
    static async createFood(payload, imageUrl) {
        const food = await foods_model_1.FoodModel.create({
            name: payload.name,
            description: payload.description,
            price: payload.price,
            imageUrl: imageUrl,
            badge: payload.badge,
            category: payload.category,
            categoryId: payload.categoryId,
            quantity: payload.quantity,
            isAvailable: true,
        });
        return food;
    }
    static async findById(id) {
        const food = await foods_model_1.FoodModel.findByPk(id);
        return food;
    }
    static async findAll() {
        const { count, rows } = await foods_model_1.FoodModel.findAndCountAll();
        return {
            total: count,
            foods: rows,
        };
    }
    static async update(id, data) {
        const food = await foods_model_1.FoodModel.findByPk(id);
        if (!food)
            throw new Error("Food not found");
        await food.update(data);
        return food;
    }
    static async delete(id) {
        const food = await foods_model_1.FoodModel.findByPk(id);
        if (!food)
            throw new Error("Food not found");
        await food.destroy();
        return true;
    }
}
exports.FoodService = FoodService;
//# sourceMappingURL=food.services.js.map