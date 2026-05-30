"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
exports.connectDatabase = connectDatabase;
const sequelize_1 = require("sequelize");
const index_1 = require("./index");
exports.sequelize = new sequelize_1.Sequelize(index_1.env.DATABASE_URL, {
    dialect: "postgres",
    logging: index_1.env.NODE_ENV === "development" ? console.log : false,
    dialectOptions: {
        ssl: index_1.env.NODE_ENV === "production"
            ? {
                require: true,
                rejectUnauthorized: false,
            }
            : false,
    },
});
async function connectDatabase() {
    try {
        await exports.sequelize.authenticate();
        await exports.sequelize.sync({ alter: false });
        console.log("✅ Database connected successfully");
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
}
//# sourceMappingURL=database.js.map