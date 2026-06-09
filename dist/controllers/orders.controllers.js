"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderStatus = exports.verifyPayment = exports.getAllOrders = exports.getOrderByNumber = exports.getOrderById = exports.createOrder = void 0;
const order_services_1 = require("../services/order.services");
const errorHandler_1 = require("../errors/errorHandler");
const createOrder = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await order_services_1.OrderServices.createOrder(data);
        return res.status(201).json({
            success: true,
            message: `Order created successfully`,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Failed to create order", 500));
    }
};
exports.createOrder = createOrder;
const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            throw new Error("Invalid order id");
        }
        const order = await order_services_1.OrderServices.getOrderById(id);
        return res.status(200).json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Failed to create order", 500));
    }
};
exports.getOrderById = getOrderById;
const getOrderByNumber = async (req, res, next) => {
    try {
        const { orderNumber } = req.params;
        if (!orderNumber || Array.isArray(orderNumber)) {
            throw new Error("Invalid order id");
        }
        const order = await order_services_1.OrderServices.findByOrderNumber(orderNumber);
        return res.status(200).json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Failed to create order", 500));
    }
};
exports.getOrderByNumber = getOrderByNumber;
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await order_services_1.OrderServices.findAllOrders();
        console.log("orders:", orders);
        return res.status(200).json({
            success: true,
            data: orders,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Failed to create order", 500));
    }
};
exports.getAllOrders = getAllOrders;
const verifyPayment = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        if (!orderId || Array.isArray(orderId)) {
            throw new Error("Invalid order id");
        }
        const result = await order_services_1.OrderServices.verifyPayment(orderId);
        return res.status(200).json({
            success: true,
            message: `Payment verified successfully`,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Failed to create order", 500));
    }
};
exports.verifyPayment = verifyPayment;
const updateOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        if (!orderId || Array.isArray(orderId)) {
            throw new Error("Invalid order id");
        }
        const { data, success, message } = await order_services_1.OrderServices.updateOrderStatus(orderId, status);
        return res.status(200).json({
            success,
            message,
            data,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Failed to create order", 500));
    }
};
exports.updateOrderStatus = updateOrderStatus;
const deleteOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        console.log("running delete");
        if (!orderId || Array.isArray(orderId)) {
            throw new Error("Invalid order id");
        }
        const result = await order_services_1.OrderServices.delete(orderId);
        return res.status(200).json({
            success: true,
            message: result.message,
        });
    }
    catch (error) {
        console.log(error);
        return next((0, errorHandler_1.customError)("Failed to create order", 500));
    }
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=orders.controllers.js.map