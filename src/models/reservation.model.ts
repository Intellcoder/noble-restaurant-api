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
  declare email: CreationOptional<string>;
  declare specialRequest: CreationOptional<string>;
  declare reservationNumber: string;
  declare occasion: string;
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
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialRequest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    occasion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reservationNumber: {
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
