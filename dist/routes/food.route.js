"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const foods_controllers_1 = require("../controllers/foods.controllers");
const validateRequest_1 = require("../middlewares/validateRequest");
const food_validators_1 = require("../utils/validators/food.validators");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const router = (0, express_1.Router)();
router.post("/", upload_middleware_1.upload.single("image"), (0, validateRequest_1.validate)(food_validators_1.createFoodSchema), foods_controllers_1.createFood);
exports.default = router;
//# sourceMappingURL=food.route.js.map