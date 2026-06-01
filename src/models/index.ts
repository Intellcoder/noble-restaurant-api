import { CategoryModel } from "./category.model";
import { ComboModel } from "./combo.model";
import { FoodModel } from "./foods.model";
import { OrderItemModel } from "./orderItem.model";
import { OrderModel } from "./orders.model";

OrderModel.hasMany(OrderItemModel, {
  foreignKey: "orderId",
  as: "items",
  onDelete: "CASCADE",
});

OrderItemModel.belongsTo(OrderModel, {
  foreignKey: "orderId",
  as: "order",
});

FoodModel.hasMany(OrderItemModel, {
  foreignKey: "foodItemId",
  as: "orderItems",
});

OrderItemModel.belongsTo(FoodModel, {
  foreignKey: "foodItemId",
  as: "foodItem",
});

ComboModel.belongsToMany(FoodModel, {
  through: "ComboFoodItems",
  as: "items",
  foreignKey: "comboId",
});

FoodModel.belongsToMany(ComboModel, {
  through: "ComboFoodItems",
  as: "combos",
  foreignKey: "foodItemId",
});

CategoryModel.hasMany(FoodModel, {
  foreignKey: "categoryId",
  as: "foods",
});

FoodModel.belongsTo(CategoryModel, {
  foreignKey: "categoryId",
  as: "foodCategory",
});
