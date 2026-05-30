import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  "PORT",
  "DATABASE_URL",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 8000,

  DATABASE_URL: process.env.DATABASE_URL as string,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,

  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  SMTP_HOST: process.env.SMTP_HOST,

  SMTP_PORT: Number(process.env.SMTP_PORT),

  SMTP_USER: process.env.SMTP_USER,

  SMTP_PASS: process.env.SMTP_PASS,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,

  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,

  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
};
