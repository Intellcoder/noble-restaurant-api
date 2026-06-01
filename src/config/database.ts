import { Sequelize } from "sequelize";
import { env } from "./index";

export const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: "postgres",

  logging: env.NODE_ENV === "development" ? console.log : false,

  dialectOptions: {
    ssl:
      env.NODE_ENV === "production"
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,
  },
});

export async function connectDatabase() {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ alter: true });
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);

    process.exit(1);
  }
}
