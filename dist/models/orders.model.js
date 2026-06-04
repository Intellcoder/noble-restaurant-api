"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const index_1 = require("../config/index");
const sequelize_1 = require("sequelize");
class OrderModel extends sequelize_1.Model {
}
exports.OrderModel = OrderModel;
OrderModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    orderNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    deliveryType: {
        type: sequelize_1.DataTypes.ENUM("DELIVERY", "PICKUP"),
        allowNull: false,
    },
    deliveryAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    subtotal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    totalAmount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    deliveryFee: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    // paymentMethod: {
    //   type: DataTypes.ENUM("BANK_TRANSFER", "CARD", "CASH_ON_DELIVERY"),
    //   allowNull: false,
    // },
    paymentStatus: {
        type: sequelize_1.DataTypes.ENUM("PENDING", "PAID", "FAILED", "REFUNDED"),
        allowNull: false,
    },
    paymentReference: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    transactionId: {
        type: sequelize_1.DataTypes.STRING,
    },
    orderStatus: {
        type: sequelize_1.DataTypes.ENUM("PENDING_PAYMENT", "PAID", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED", "FAILED"),
        allowNull: false,
    },
    whatsappNotificationSent: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    customerWhatsappSent: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date(Date.now()),
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: index_1.sequelize,
    tableName: "orders",
});
//# sourceMappingURL=orders.model.js.map