"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const router = (0, express_1.Router)();
router.post("/", category_controller_1.createCategory);
router.get("/", category_controller_1.getAllCategory);
router.get("/:id", category_controller_1.findCategory);
router.post("/name", category_controller_1.findCategoryByName);
exports.default = router;
//# sourceMappingURL=category.route.js.map