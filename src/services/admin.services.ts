import { OrderModel } from "../models/orders.model";
import { ReservationModel } from "../models/reservation.model";

export class AdminServices {
  static async dashboard() {
    //admin dashboard

    const { rows, count } = await OrderModel.findAndCountAll();
    const reservations = await ReservationModel.findAndCountAll();
  }
}
