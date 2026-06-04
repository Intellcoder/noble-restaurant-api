"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationModel = void 0;
const index_1 = require("../config/index");
const sequelize_1 = require("sequelize");
class ReservationModel extends sequelize_1.Model {
}
exports.ReservationModel = ReservationModel;
ReservationModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    specialRequest: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    occasion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    reservationNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    time: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    noOfGuests: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, { sequelize: index_1.sequelize, tableName: "reservations" });
//# sourceMappingURL=reservation.model.js.map