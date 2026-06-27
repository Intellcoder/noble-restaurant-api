import crypto from "crypto";
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
};

export const generateRandomToken = (
  length = 6,
  type: "numeric" | "alphanumeric" = "numeric",
) => {
  const numericChars = "0123456789";
  const alphanumericChars = "ABCDEFGHIJKLMNOPQRSTUVW0123456789";

  const characters = type === "numeric" ? numericChars : alphanumericChars;

  let token = "";

  for (let i = 0; i < length; i++) {
    const buffer = crypto.randomBytes(1);
    const randomByte = buffer[0] ?? 0; // prevents undefined

    const randomIndex = randomByte % characters.length;

    token += characters[randomIndex] ?? "";
  }

  return token;
};

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
