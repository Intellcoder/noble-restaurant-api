"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controllers_1 = require("../controllers/orders.controllers");
const validateRequest_1 = require("../middlewares/validateRequest");
const order_validaton_1 = require("../utils/validators/order.validaton");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.validate)(order_validaton_1.createOrderSchema), orders_controllers_1.createOrder); // ✅
router.get("/", orders_controllers_1.getAllOrders);
router.get("/id/:id", orders_controllers_1.getOrderById);
router.get("/number/:orderNumber", orders_controllers_1.getOrderByNumber);
router.get("/verify-payment/:orderId", 
//   validate(verifyPaymentSchema),
orders_controllers_1.verifyPayment); // ✅ added schema
router.patch("/status/:orderId", (0, validateRequest_1.validate)(order_validaton_1.updateOrderStatusSchema), orders_controllers_1.updateOrderStatus); // ✅ added schema
router.delete("/:orderId", orders_controllers_1.deleteOrder);
exports.default = router;
//# sourceMappingURL=order.route.js.map