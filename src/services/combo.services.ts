import { sequelize } from "../config";
import { ComboModel } from "../models/combo.model";
import { ComboItemModel } from "../models/comboItems.model";
import { FoodModel } from "../models/foods.model";

// type comboItem = {
//   foodId: string;
//   foodName: string;
//   imageUrl: string;
//   quantity: number;
//   unitPrice: number;
// };

type CreateComboDTO = {
  name: string;
  description?: string | null;
  price: number;
  image?: string;
  foodIds: string[];
};

type UpdateComboDTO = Partial<CreateComboDTO>;

export class ComboService {
  /* =========================
     CREATE COMBO
  ========================== */
  static async createCombo(payload: CreateComboDTO) {
    const transaction = await sequelize.transaction();

    try {
      const foods = await FoodModel.findAll({
        where: {
          id: payload.foodIds,
        },
      });

      if (foods.length < 2) {
        throw new Error("Select at least 2 foods");
      }

      const combo = await ComboModel.create(
        {
          name: payload.name,
          description: payload.description ?? null,
          price: payload.price,
          image: payload.image,
          isActive: true,
        },
        { transaction },
      );

      const comboItems = foods.map((food) => ({
        comboId: combo.id,
        foodId: food.id,
        foodName: food.name,
        imageUrl: food.imageUrl,
        quantity: 1,
        unitPrice: Number(food.price),
      }));

      await ComboItemModel.bulkCreate(comboItems, { transaction });

      await transaction.commit();

      return combo;
    } catch (error) {
      await transaction.rollback();

      console.log(error);

      throw error;
    }
  }

  static async getAllCombos() {
    const combos = await ComboModel.findAll({
      include: [
        {
          model: ComboItemModel,
          as: "items",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return combos;
  }

  /* =========================
     GET SINGLE COMBO
  ========================== */
  static async getComboById(id: string) {
    const combo = await ComboModel.findByPk(id, {
      include: [
        {
          model: ComboItemModel,
          as: "items",
          through: { attributes: [] },
        },
      ],
    });

    if (!combo) throw new Error("Combo not found");

    return combo;
  }

  /* =========================
     UPDATE COMBO
  ========================== */
  static async updateCombo(id: string, payload: UpdateComboDTO) {
    return await sequelize.transaction(async (transaction) => {
      const combo = await ComboModel.findByPk(id, { transaction });

      if (!combo) {
        throw new Error("Combo not found");
      }

      let foods: FoodModel[] = [];

      // fetch selected foods only if updating foods
      if (payload.foodIds?.length) {
        foods = await FoodModel.findAll({
          where: {
            id: payload.foodIds,
          },
          transaction,
        });

        if (foods.length !== payload.foodIds.length) {
          throw new Error("One or more foods not found");
        }
      }

      // optional: auto-calculate price from foods
      const calculatedPrice =
        foods.length > 0
          ? foods.reduce((sum, food) => sum + Number(food.price), 0)
          : combo.price;

      await combo.update(
        {
          name: payload.name ?? combo.name,
          description: payload.description ?? combo.description ?? null,
          price: payload.price ?? combo.price,
          image: payload.image ?? combo.image ?? null,
        },
        { transaction },
      );

      /* Replace combo items */
      if (foods.length > 0) {
        await ComboItemModel.destroy({
          where: {
            comboId: id,
          },
          transaction,
        });

        const newItems = foods.map((food) => ({
          comboId: id,
          foodId: food.id,
          foodName: food.name,
          imageUrl: food.imageUrl ?? null,
          quantity: 1,
          unitPrice: Number(food.price),
        }));

        await ComboItemModel.bulkCreate(newItems, { transaction });
      }

      return await ComboModel.findByPk(id, {
        include: [
          {
            model: FoodModel,
            as: "items",
            through: {
              attributes: [],
            },
          },
        ],
        transaction,
      });
    });
  }

  /* =========================
     DELETE COMBO
  ========================== */
  static async deleteCombo(id: string) {
    return await sequelize.transaction(async (transaction) => {
      const combo = await ComboModel.findByPk(id, { transaction });

      if (!combo) throw new Error("Combo not found");

      await ComboItemModel.destroy({
        where: { comboId: id },
        transaction,
      });

      await combo.destroy({ transaction });

      return {
        success: true,
        message: "Combo deleted successfully",
      };
    });
  }

  /* =========================
     TOGGLE STATUS
  ========================== */
  static async toggleComboStatus(id: string) {
    const combo = await ComboModel.findByPk(id);

    if (!combo) throw new Error("Combo not found");

    await combo.update({
      isActive: !combo.isActive,
    });

    return combo;
  }
}
