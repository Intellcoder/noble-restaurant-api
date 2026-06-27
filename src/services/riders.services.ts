import { col, fn, WhereOptions, Op } from "sequelize";
import { CustomError } from "../errors/customError";
import { Packages } from "../models/packages.model";
import { CreatepackageDto } from "../types/package.type";

export class RidersServices {
  static async createPackage(data: CreatepackageDto) {
    const deliverypackage = await Packages.create({
      status: "Assigned",
      orderId: data.orderId,
      riderId: data.riderId,
      assignorId: data.assignorId,
      assignedAt: new Date(Date.now()),
    });

    return deliverypackage;
  }

  static async findPackageById(id: string) {
    const deliverypackage = await Packages.findByPk(id);

    if (!deliverypackage) throw new CustomError("Package Not Found");

    return deliverypackage;
  }

  static async getRiderPackages(
    riderId: string,
    search?: string,
    status?: "Assigned" | "Delivered" | "Failed" | "Returned",
  ) {
    const whereClause: WhereOptions = {
      riderId,
    };

    //filter by status
    if (status) {
      whereClause.status = status;
    }

    // //search by package or Ordernumber
    // if(search){
    //     whereClause[Op.or]=[
    //         {
    //             orderNumber
    //         }
    //     ]
    // }

    const packages = await Packages.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    return packages;
  }

  static async getRiderPackageStats(riderId: string) {
    const stats = await Packages.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      where: {
        riderId,
      },
      group: ["status"],
    });

    return stats;
  }

  static async updateDeliveryStatus(
    id: string,
    status:
      | "Assigned"
      | "Delivered"
      | "Failed"
      | "Returned"
      | "In_Transit"
      | "Picked_Up",
  ) {
    const deliverypackage = await Packages.findByPk(id);

    if (!deliverypackage) throw new CustomError("Package Not Found");

    deliverypackage.status = status;

    await deliverypackage.save();

    return deliverypackage;
  }

  static async deletePackage(id: string) {
    const deliverypackage = await Packages.findByPk(id);

    if (!deliverypackage) throw new CustomError("Package Not Found");

    await deliverypackage.destroy();

    return true;
  }
}
