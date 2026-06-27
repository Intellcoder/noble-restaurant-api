import { Request, Response, NextFunction } from "express";
import { customError } from "../errors/errorHandler";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  console.log("url:", req.originalUrl);
  next(customError(`Route ${req.originalUrl} not found`, 404));
};

export default notFound;
