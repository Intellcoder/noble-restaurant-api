"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.updateReservation = exports.getReservationById = exports.getAllReservations = exports.createReservation = void 0;
const reservation_services_1 = require("../services/reservation.services");
const errorHandler_1 = require("../errors/errorHandler");
const createReservation = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await reservation_services_1.ReservationService.createReservation(data);
        return res.status(200).json({
            success: true,
            message: result.message,
            data: result.data,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Operation Failed", 500));
    }
};
exports.createReservation = createReservation;
const getAllReservations = async (req, res, next) => {
    try {
        const { totalReservations, data } = await reservation_services_1.ReservationService.getAllReservations();
        return res.status(200).json({
            success: true,
            totalReservations,
            data,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Operation Failed", 500));
    }
};
exports.getAllReservations = getAllReservations;
const getReservationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await reservation_services_1.ReservationService.getReservationById(id);
        return res.status(200).json({
            success: true,
            result,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Operation Failed", 500));
    }
};
exports.getReservationById = getReservationById;
const updateReservation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await reservation_services_1.ReservationService.getReservationById(id);
        return res.status(200).json({
            success: true,
            result,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Operation Failed", 500));
    }
};
exports.updateReservation = updateReservation;
const deleteReservation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await reservation_services_1.ReservationService.getReservationById(id);
        return res.status(200).json({
            success: true,
            result,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Operation Failed", 500));
    }
};
exports.deleteReservation = deleteReservation;
//# sourceMappingURL=reservation.controllers.js.map