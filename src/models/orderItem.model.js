"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemModel = void 0;
const index_1 = require("../config/index");
const sequelize_1 = require("sequelize");
class OrderItemModel extends sequelize_1.Model {
}
exports.OrderItemModel = OrderItemModel;
OrderItemModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
    },
    foodId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    foodName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    orderId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    unitPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    totalPrice: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize: index_1.sequelize,
    tableName: "orderitems",
});
//# sourceMappingURL=orderItem.model.js.map