import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate =
  (schema: z.ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("BODY:", req.body);

      req.body = await schema.parseAsync(req.body);

      next();
    } catch (error: any) {
      console.log("validation error:", error);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error?.issues ?? [],
      });
    }
  };
