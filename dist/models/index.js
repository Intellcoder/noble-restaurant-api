"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = require("./category.model");
const combo_model_1 = require("./combo.model");
const foods_model_1 = require("./foods.model");
const orderItem_model_1 = require("./orderItem.model");
const orders_model_1 = require("./orders.model");
orders_model_1.OrderModel.hasMany(orderItem_model_1.OrderItemModel, {
    foreignKey: "orderId",
    as: "items",
    onDelete: "CASCADE",
});
orderItem_model_1.OrderItemModel.belongsTo(orders_model_1.OrderModel, {
    foreignKey: "orderId",
    as: "order",
});
foods_model_1.FoodModel.hasMany(orderItem_model_1.OrderItemModel, {
    foreignKey: "foodItemId",
    as: "orderItems",
});
orderItem_model_1.OrderItemModel.belongsTo(foods_model_1.FoodModel, {
    foreignKey: "foodItemId",
    as: "foodItem",
});
combo_model_1.ComboModel.belongsToMany(foods_model_1.FoodModel, {
    through: "ComboFoodItems",
    as: "items",
    foreignKey: "comboId",
});
foods_model_1.FoodModel.belongsToMany(combo_model_1.ComboModel, {
    through: "ComboFoodItems",
    as: "combos",
    foreignKey: "foodItemId",
});
category_model_1.CategoryModel.hasMany(foods_model_1.FoodModel, {
    foreignKey: "categoryId",
    as: "foods",
});
foods_model_1.FoodModel.belongsTo(category_model_1.CategoryModel, {
    foreignKey: "categoryId",
    as: "foodCategory",
});
//# sourceMappingURL=index.js.map