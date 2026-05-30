import { sequelize } from "../config/index";
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export class OrderModel extends Model<
  InferAttributes<OrderModel>,
  InferCreationAttributes<OrderModel>
> {
  declare id: CreationOptional<string>;
  declare orderNumber: string;
  declare phoneNumber: string;
  declare deliveryType: "DELIVERY" | "PICKUP";
  declare deliveryAddress: string;
  declare subtotal: number;
  declare deliveryFee: number;
  declare transactionId?: string | null;
  declare totalAmount: number;
  declare paymentReference: CreationOptional<string>;
  declare paymentMethod: "BANK_TRANSFER" | "CARD" | "CASH_ON_DELIVERY";
  declare paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  declare orderStatus:
    | "PENDING_PAYMENT"
    | "PAID"
    | "CONFIRMED"
    | "DELIVERED"
    | "CANCELLED"
    | "FAILED"
    | "OUT_FOR_DELIVERY";
  declare whatsappNotificationSent?: boolean;
  declare customerWhatsappSent?: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
OrderModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryType: {
      type: DataTypes.ENUM("DELIVERY", "PICKUP"),
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deliveryFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM("BANK_TRANFER", "CARD", "CASH_ON_DELIVERY"),
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM("PENDING", "PAID", "FAILED", "REFUNDED"),
      allowNull: false,
    },
    paymentReference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.STRING,
    },
    orderStatus: {
      type: DataTypes.ENUM(
        "PENDING_PAYMENT",
        "PAID",
        "CONFIRMED",
        "PREPARING",
        "READY",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
        "FAILED",
      ),
      allowNull: false,
    },
    whatsappNotificationSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    customerWhatsappSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(Date.now()),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "orders",
  },
);
