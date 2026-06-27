import { sequelize } from "../config/database";
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class Packages extends Model<
  InferAttributes<Packages>,
  InferCreationAttributes<Packages>
> {
  declare id: CreationOptional<string>;
  declare status:
    | "Delivered"
    | "Assigned"
    | "Returned"
    | "Failed"
    | "In_Transit"
    | "Picked_Up";
  declare orderId: string;
  declare riderId: string;
  declare assignorId: string;
  declare assignedAt: Date;
  declare deliveredAt: Date | null;
}

Packages.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(
        "Picked_Up",
        "Assigned",
        "Failed",
        "In_Transit",
        "Delivered",
        "Returned",
      ),
      defaultValue: "Assigned",
      allowNull: false,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    riderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    assignedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    assignorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    deliveredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "packages",
  },
);
