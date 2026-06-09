import { where } from "sequelize";
import { FoodModel } from "../models/foods.model";
import { CreatedFoodDto, UpdateFoodDto } from "../types";

export class FoodService {
  static async createFood(payload: CreatedFoodDto, imageUrl: string) {
    const food = await FoodModel.create({
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

  static async findById(id: string) {
    const food = await FoodModel.findByPk(id);

    return food;
  }

  static async findAll() {
    const { count, rows } = await FoodModel.findAndCountAll({
      where: {
        isAvailable: true,
      },
    });

    return {
      total: count,
      foods: rows,
    };
  }

  static async update(id: string, data: Partial<UpdateFoodDto>) {
    const food = await FoodModel.findByPk(id);

    if (!food) throw new Error("Food not found");

    await food.update(data);

    return food;
  }

  static async delete(id: string) {
    const food = await FoodModel.findByPk(id);

    if (!food) throw new Error("Food not found");

    await food.destroy();

    return true;
  }
}
