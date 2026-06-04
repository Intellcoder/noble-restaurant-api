"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const combo_controllers_1 = require("../controllers/combo.controllers");
const router = (0, express_1.Router)();
router.post("/", combo_controllers_1.CreateCombos);
router.get("/", combo_controllers_1.getAllCombos);
router.get("/:id", combo_controllers_1.getComboById);
router.delete("/", combo_controllers_1.deleteCombo);
router.put("/", combo_controllers_1.updateCombo);
exports.default = router;
//# sourceMappingURL=combo.routes.js.map