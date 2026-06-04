"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServices = void 0;
const orders_model_1 = require("../models/orders.model");
const reservation_model_1 = require("../models/reservation.model");
class AdminServices {
    static async dashboard() {
        //admin dashboard
        const { rows, count } = await orders_model_1.OrderModel.findAndCountAll();
        const reservations = await reservation_model_1.ReservationModel.findAndCountAll();
    }
}
exports.AdminServices = AdminServices;
//# sourceMappingURL=admin.services.js.map