"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboService = void 0;
const config_1 = require("../config");
const combo_model_1 = require("../models/combo.model");
const comboItems_model_1 = require("../models/comboItems.model");
const foods_model_1 = require("../models/foods.model");
class ComboService {
    /* =========================
       CREATE COMBO
    ========================== */
    static async createCombo(payload) {
        const transaction = await config_1.sequelize.transaction();
        try {
            const foods = await foods_model_1.FoodModel.findAll({
                where: {
                    id: payload.foodIds,
                },
            });
            if (foods.length < 2) {
                throw new Error("Select at least 2 foods");
            }
            const combo = await combo_model_1.ComboModel.create({
                name: payload.name,
                description: payload.description ?? null,
                price: payload.price,
                image: payload.image,
                isActive: true,
            }, { transaction });
            const comboItems = foods.map((food) => ({
                comboId: combo.id,
                foodId: food.id,
                foodName: food.name,
                imageUrl: food.imageUrl,
                quantity: 1,
                unitPrice: Number(food.price),
            }));
            await comboItems_model_1.ComboItemModel.bulkCreate(comboItems, { transaction });
            return combo;
        }
        catch (error) {
            console.log(error);
        }
    }
    /* =========================
       GET ALL COMBOS
    ========================== */
    static async getAllCombos() {
        return combo_model_1.ComboModel.findAll({
            include: [
                {
                    model: comboItems_model_1.ComboItemModel,
                    as: "items",
                    through: { attributes: [] },
                },
            ],
            order: [["createdAt", "DESC"]],
        });
    }
    /* =========================
       GET SINGLE COMBO
    ========================== */
    static async getComboById(id) {
        const combo = await combo_model_1.ComboModel.findByPk(id, {
            include: [
                {
                    model: comboItems_model_1.ComboItemModel,
                    as: "items",
                    through: { attributes: [] },
                },
            ],
        });
        if (!combo)
            throw new Error("Combo not found");
        return combo;
    }
    /* =========================
       UPDATE COMBO
    ========================== */
    static async updateCombo(id, payload) {
        return await config_1.sequelize.transaction(async (transaction) => {
            const combo = await combo_model_1.ComboModel.findByPk(id, { transaction });
            if (!combo) {
                throw new Error("Combo not found");
            }
            let foods = [];
            // fetch selected foods only if updating foods
            if (payload.foodIds?.length) {
                foods = await foods_model_1.FoodModel.findAll({
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
            const calculatedPrice = foods.length > 0
                ? foods.reduce((sum, food) => sum + Number(food.price), 0)
                : combo.price;
            await combo.update({
                name: payload.name ?? combo.name,
                description: payload.description ?? combo.description ?? null,
                price: payload.price ?? combo.price,
                image: payload.image ?? combo.image ?? null,
            }, { transaction });
            /* Replace combo items */
            if (foods.length > 0) {
                await comboItems_model_1.ComboItemModel.destroy({
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
                await comboItems_model_1.ComboItemModel.bulkCreate(newItems, { transaction });
            }
            return await combo_model_1.ComboModel.findByPk(id, {
                include: [
                    {
                        model: foods_model_1.FoodModel,
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
    static async deleteCombo(id) {
        return await config_1.sequelize.transaction(async (transaction) => {
            const combo = await combo_model_1.ComboModel.findByPk(id, { transaction });
            if (!combo)
                throw new Error("Combo not found");
            await comboItems_model_1.ComboItemModel.destroy({
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
    static async toggleComboStatus(id) {
        const combo = await combo_model_1.ComboModel.findByPk(id);
        if (!combo)
            throw new Error("Combo not found");
        await combo.update({
            isActive: !combo.isActive,
        });
        return combo;
    }
}
exports.ComboService = ComboService;
//# sourceMappingURL=combo.services.js.map