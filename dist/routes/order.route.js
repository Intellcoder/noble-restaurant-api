"use strict";
// routes/order.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controllers_1 = require("../controllers/orders.controllers");
const validateRequest_1 = require("../middlewares/validateRequest");
const order_validaton_1 = require("../utils/validators/order.validaton");
const router = (0, express_1.Router)();
/**
 * ----------------------------------------
 * CREATE ORDER
 * ----------------------------------------
 */
router.post("/", (0, validateRequest_1.validate)(order_validaton_1.orderItemSchema), orders_controllers_1.createOrder);
/**
 * ----------------------------------------
 * GET ALL ORDERS
 * ----------------------------------------
 */
router.get("/", orders_controllers_1.getAllOrders);
/**
 * ----------------------------------------
 * GET ORDER BY ID
 * ----------------------------------------
 */
router.get("/id/:id", orders_controllers_1.getOrderById);
/**
 * ----------------------------------------
 * GET ORDER BY ORDER NUMBER
 * ----------------------------------------
 */
router.get("/number/:orderNumber", orders_controllers_1.getOrderByNumber);
/**
 * ----------------------------------------
 * VERIFY PAYMENT
 * ----------------------------------------
 */
router.post("/verify-payment/:orderId", orders_controllers_1.verifyPayment);
/**
 * ----------------------------------------
 * UPDATE ORDER STATUS
 * ----------------------------------------
 */
router.patch("/status/:orderId", orders_controllers_1.updateOrderStatus);
/**
 * ----------------------------------------
 * DELETE ORDER
 * ----------------------------------------
 */
router.delete("/:orderId", orders_controllers_1.deleteOrder);
exports.default = router;
//# sourceMappingURL=order.route.js.map