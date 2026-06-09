"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_1 = require("../controllers/webhook.controller");
const router = (0, express_1.Router)();
router.post("/paystack", webhook_controller_1.paystackwebhook);
exports.default = router;
//# sourceMappingURL=webhook.routes.js.map