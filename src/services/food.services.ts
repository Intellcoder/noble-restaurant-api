import { FoodModel } from "../models/foods.model";
import { CreatedFoodDto, UpdateFoodDto } from "../types";
import { CategoryModel } from "../models/category.model";
import { CustomError } from "../errors/customError";

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
      requirePackaging: payload.requiredPackaging,
    });

    return food;
  }

  static async findById(id: string) {
    const food = await FoodModel.findByPk(id);

    if (!food) throw new CustomError("Not Found", 404);

    return food;
  }

  static async getAllAvailableFoods() {
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

  static async getAllfoods() {
    const { rows, count } = await FoodModel.findAndCountAll();

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

  static async getAllFoodsByCategory() {
    const foods = await CategoryModel.findAll({
      include: [
        {
          model: FoodModel,
          as: "foods",
          where: { isAvailable: true },
          attributes: [
            "id",
            "createdAt",
            "description",
            "imageUrl",
            "isAvailable",
            "requirePackaging",
            "name",
            "price",
            "badge",
          ],
        },
      ],
    });

    return foods;
  }

  static async toggleAvailbility(id: string) {
    const food = await FoodModel.findByPk(id);

    if (!food) {
      throw new Error("Food not foound");
    }

    food.isAvailable = !food.isAvailable;

    await food.save();

    return food;
  }
}
