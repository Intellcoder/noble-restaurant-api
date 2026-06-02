import { sequelize } from "../config/index";
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export class ComboItemModel extends Model<
  InferAttributes<ComboItemModel>,
  InferCreationAttributes<ComboItemModel>
> {
  declare id: CreationOptional<string>;
  declare foodId: string;
  declare foodName: string;
  declare comboId: string;
  declare imageUrl?: string;
  declare unitPrice: number;
}

ComboItemModel.init(
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
    comboId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comboItems",
  },
);
