import { sequelize } from "../config/index";
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export class ReservationModel extends Model<
  InferAttributes<ReservationModel>,
  InferCreationAttributes<ReservationModel>
> {
  declare id: CreationOptional<string>;
  declare fullname: string;
  declare phoneNumber: string;
  declare date: string;
  declare time: string;
  declare noOfGuests: number;
}

ReservationModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "reservations" },
);
