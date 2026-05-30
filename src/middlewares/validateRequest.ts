// middlewares/validateRequest.ts

import { Request, Response, NextFunction } from "express";

import { ZodObject } from "zod";

export const validate =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("BODY:", req.body);

      const validatedData = await schema.parseAsync(req.body);

      req.body = validatedData;

      next();
    } catch (error: any) {
      console.log(error);

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error?.issues || [],
      });
    }
  };
