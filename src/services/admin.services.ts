import { QueryTypes } from "sequelize";
import { sequelize } from "../config";
import { OrderModel } from "../models/orders.model";
import { UserModel } from "../models/auth.model";

export class AdminServices {
  static async dashboard() {
    //admin dashboard
    const stats = await sequelize.query(
      `
      SELECT
  (SELECT COUNT(*) FROM orders) AS "totalOrders",

  (SELECT COUNT(*) FROM reservations) AS "totalReservations",

  (
    SELECT COALESCE(SUM("totalAmount"),0)
    FROM orders
    WHERE "paymentStatus"='PAID'
  ) AS "totalRevenue",

  (
    SELECT COUNT(*)
    FROM orders
    WHERE "paymentStatus"='PENDING'
  ) AS "pendingPayments",

  (
    SELECT COUNT(*)
    FROM orders
    WHERE "orderStatus"='DELIVERED'
  ) AS "delivery"`,

      {
        type: QueryTypes.SELECT,
      },
    );

    const recentOrders = await OrderModel.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
    });

    return {
      stats: stats[0],
      recentOrders,
    };
  }

  static async riders() {
    const stats = await sequelize.query(
      `
      
      SELECT 

      (SELECT COUNT(*)
      FROM packages
      WHERE "status" = 'Assigned'
      ) AS "ActiveDeliveries"

      (SELECT COUNT(*)
      FROM packages
      WHERE "status" = 'Delivered'
      ) AS "TotalCompleted"

      (SELECT COUNT(*)
      FROM packages
      WHERE "status" = 'Failed'
      ) AS "FailedDeliveries"

      (SELECT COUNT(*)
      FROM packages
      WHERE "status" = 'Delivered'
      AND DATE("updatedAt")=CURRENT_DATE
      ) AS "deliveredToday"
      `,
      {
        type: QueryTypes.SELECT,
      },
    );

    const riders = await UserModel.findAll({
      where: {
        role: "rider",
      },
      order: [["createdAt", "DESC"]],
    });
  }
}
