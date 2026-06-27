import { Response, Request, NextFunction } from "express";
import { AdminServices } from "../services/admin.services";
import { customError } from "../errors/errorHandler";

export class AdminController {
  static async dashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const { stats, recentOrders } = await AdminServices.dashboard();

      return res.status(200).json({
        stats,
        recentOrders,
      });
    } catch (error) {
      console.log("Error:", error);
      return next(customError(`Error running operation`, 500));
    }
  }

  static async riders(req: Request, res: Response, next: NextFunction) {}
}
