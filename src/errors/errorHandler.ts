// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
  public statusCode: number;
  constructor(message: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const customError = (message: any, statusCode: number) => {
  return new CustomError(message, statusCode);
};

export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
};
