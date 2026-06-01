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
import {
  createOrderSchema,
  updateOrderStatusSchema,
  verifyPaymentSchema,
} from "../utils/validators/order.validaton";

const router = Router();

router.post("/", validate(createOrderSchema), createOrder); // ✅
router.get("/", getAllOrders);
router.get("/id/:id", getOrderById);
router.get("/number/:orderNumber", getOrderByNumber);
router.get(
  "/verify-payment/:orderId",
  //   validate(verifyPaymentSchema),
  verifyPayment,
); // ✅ added schema

router.patch(
  "/status/:orderId",
  validate(updateOrderStatusSchema),
  updateOrderStatus,
); // ✅ added schema
router.delete("/:orderId", deleteOrder);

export default router;
