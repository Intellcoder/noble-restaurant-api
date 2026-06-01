import { ComboModel } from "../models/combo.model";
import { FoodModel } from "../models/foods.model";

type CreateComboDTO = {
  name: string;
  description?: string | null;
  price: number;
  image?: string;
  foodItemIds: string[];
};

export class ComboService {
  static async createCombo(payload: CreateComboDTO) {
    // 1. create combo
    const combo = await ComboModel.create({
      name: payload.name,
      description: payload.description ?? null,
      price: payload.price,
      image: payload.image,
      isActive: true,
    });

    // 2. attach food items
    if (payload.foodItemIds && payload.foodItemIds.length > 0) {
      const foods = await FoodModel.findAll({
        where: { id: payload.foodItemIds },
      });

      await (combo as any).setItems(foods);
    }

    // 3. return full combo with items
    const result = await ComboModel.findByPk(combo.id, {
      include: [
        {
          model: FoodModel,
          as: "items",
        },
      ],
    });

    return result;
  }
}
