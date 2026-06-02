import { sequelize } from "../config/database";
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class ComboModel extends Model<
  InferAttributes<ComboModel>,
  InferCreationAttributes<ComboModel>
> {
  declare id: CreationOptional<string>;

  declare name: string;

  declare description?: CreationOptional<string | null>;

  declare price: number; // final combo price

  declare image?: CreationOptional<string | null>;

  declare isActive: boolean;

  declare createdAt: CreationOptional<Date | null>;
}

ComboModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 5),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(Date.now()),
    },
  },
  {
    sequelize,
    tableName: "combos",
  },
);
