import { Request, Response, NextFunction } from "express";
import { OrderServices } from "../services/order.services";
import { customError } from "../errors/errorHandler";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    const result = await OrderServices.createOrder(data);

    return res.status(201).json({
      success: true,
      message: `Order created successfully`,
      data: result,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Failed to create order", 500));
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      throw new Error("Invalid order id");
    }
    const order = await OrderServices.getOrderById(id);

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Failed to create order", 500));
  }
};

export const getOrderByNumber = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderNumber } = req.params;

    if (!orderNumber || Array.isArray(orderNumber)) {
      throw new Error("Invalid order id");
    }
    const order = await OrderServices.findByOrderNumber(orderNumber);

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Failed to create order", 500));
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await OrderServices.findAllOrders();

    console.log("orders:", orders);
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Failed to create order", 500));
  }
};

export const verifyPayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.params;

    if (!orderId || Array.isArray(orderId)) {
      throw new Error("Invalid order id");
    }
    const result = await OrderServices.verifyPayment(orderId);

    return res.status(200).json({
      success: true,
      message: `Payment verified successfully`,
      data: result,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Failed to create order", 500));
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId || Array.isArray(orderId)) {
      throw new Error("Invalid order id");
    }

    const { data, success, message } = await OrderServices.updateOrderStatus(
      orderId,
      status,
    );

    return res.status(200).json({
      success,
      message,
      data,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Failed to create order", 500));
  }
};
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.params;

    if (!orderId || Array.isArray(orderId)) {
      throw new Error("Invalid order id");
    }
    const result = await OrderServices.delete(orderId);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Failed to create order", 500));
  }
};
