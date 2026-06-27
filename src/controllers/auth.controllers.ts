import { Response, Request, NextFunction } from "express";
import { AuthServices } from "../services/auth.services";
import { customError } from "../errors/errorHandler";
import { success } from "zod";

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const result = await AuthServices.Signup(data);

      return res.status(201).json({
        message: "Signup successfull!",
        result,
      });
    } catch (error) {
      console.log("Error:", error);
      return next(customError(`Error:${error}`, 500));
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { credential, password } = req.body;

      const { responseUser, accessToken } = await AuthServices.login(
        credential,
        password,
      );

      return res.status(200).json({
        success: true,
        message: "Login successfull",
        responseUser,
        accessToken,
      });
    } catch (error) {
      console.log("Error", error);
      return next(customError(error, 500));
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const result = await AuthServices.forgotPassword(email);

      return res.status(200).json({
        success: true,
        message: "Check your email for resetLink",
      });
    } catch (error) {
      console.log("Error:", error);
      return next(customError(`error:${error}`, 500));
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, newPassword } = req.body;

      const result = await AuthServices.resetPassword(token, newPassword);

      return res.status(200).json({
        success: true,
        message: "Password reset successfull",
      });
    } catch (error) {
      console.log("Error:", error);
      return next(customError(`Error:${error}`, 500));
    }
  }

  static async approveWorker(req: Request, res: Response, next: NextFunction) {}

  static async adminDashboard(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {}
}
