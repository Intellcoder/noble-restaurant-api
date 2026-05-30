import { Request, Response, NextFunction } from "express";
import { OrderServices } from "../services/order.services";
import { success } from "zod";

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
    next(error);
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
    next(error);
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
    next(error);
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await OrderServices.findAllOrders();

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verifyPayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { orderId } = req.params;
    const { paymentReference } = req.body;

    if (!orderId || Array.isArray(orderId)) {
      throw new Error("Invalid order id");
    }
    const result = await OrderServices.verifyPayment(orderId, paymentReference);

    return res.status(200).json({
      success: true,
      message: `Payment verified successfully`,
    });
  } catch (error) {
    console.log(error);
    next(error);
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
    const result = await OrderServices.updateOrderStatus(orderId, status);

    return res.status(200).json({
      success: true,
      message: `Order status updated successfully`,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    next(error);
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
    next(error);
  }
};
