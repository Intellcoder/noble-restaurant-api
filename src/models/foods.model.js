"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodModel = void 0;
const index_1 = require("../config/index");
const sequelize_1 = require("sequelize");
class FoodModel extends sequelize_1.Model {
}
exports.FoodModel = FoodModel;
FoodModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2),
        allowNull: false,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    badge: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "categories",
        },
    },
    isAvailable: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: index_1.sequelize,
    tableName: "foods",
});
//# sourceMappingURL=foods.model.js.map