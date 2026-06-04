"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboModel = void 0;
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
class ComboModel extends sequelize_1.Model {
}
exports.ComboModel = ComboModel;
ComboModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 5),
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date(Date.now()),
    },
}, {
    sequelize: database_1.sequelize,
    tableName: "combos",
});
//# sourceMappingURL=combo.model.js.map