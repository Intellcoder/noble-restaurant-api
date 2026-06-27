import { sequelize } from "../config/database";
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id: CreationOptional<string>;
  declare fullname: string;
  declare email: string;
  declare userId: string;
  declare password: string;
  declare role: "admin" | "worker" | "rider" | "user";
  declare phoneNumber: CreationOptional<string>;
  declare isApproved: boolean;
  declare resetToken: string | null;
  declare resetTokenExpiry: Date | null;
  declare address: CreationOptional<string>;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "worker", "delivery", "user"),
      defaultValue: "user",
      allowNull: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    scopes: {
      withPassword: {
        attributes: {
          include: ["password"],
        },
      },
    },
    timestamps: true,
  },
);
