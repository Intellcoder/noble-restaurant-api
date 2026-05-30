// routes/order.routes.ts

import { Router } from "express";

import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getOrderByNumber,
  updateOrderStatus,
  verifyPayment,
} from "../controllers/orders.controllers";
import { validate } from "../middlewares/validateRequest";
import { orderItemSchema } from "../utils/validators/order.validaton";

const router = Router();

/**
 * ----------------------------------------
 * CREATE ORDER
 * ----------------------------------------
 */
router.post("/", validate(orderItemSchema), createOrder);

/**
 * ----------------------------------------
 * GET ALL ORDERS
 * ----------------------------------------
 */
router.get(
  "/",

  getAllOrders,
);

/**
 * ----------------------------------------
 * GET ORDER BY ID
 * ----------------------------------------
 */
router.get(
  "/id/:id",

  getOrderById,
);

/**
 * ----------------------------------------
 * GET ORDER BY ORDER NUMBER
 * ----------------------------------------
 */
router.get(
  "/number/:orderNumber",

  getOrderByNumber,
);

/**
 * ----------------------------------------
 * VERIFY PAYMENT
 * ----------------------------------------
 */
router.post(
  "/verify-payment/:orderId",

  verifyPayment,
);

/**
 * ----------------------------------------
 * UPDATE ORDER STATUS
 * ----------------------------------------
 */
router.patch(
  "/status/:orderId",

  updateOrderStatus,
);

/**
 * ----------------------------------------
 * DELETE ORDER
 * ----------------------------------------
 */
router.delete(
  "/:orderId",

  deleteOrder,
);

export default router;
