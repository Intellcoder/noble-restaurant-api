import { sequelize } from "../config/index";
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export class OrderItemModel extends Model<
  InferAttributes<OrderItemModel>,
  InferCreationAttributes<OrderItemModel>
> {
  declare id: CreationOptional<string>;
  declare foodId: string;
  declare foodName: string;
  declare orderId: string;
  declare imageUrl?: string;
  declare quantity: number;
  declare unitPrice: number;
  declare totalPrice: number;
}

OrderItemModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    foodId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    foodName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "orderitems",
  },
);
