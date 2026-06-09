"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservation_controllers_1 = require("../controllers/reservation.controllers");
const validateRequest_1 = require("../middlewares/validateRequest");
const reservation_validators_1 = require("../utils/validators/reservation.validators");
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.validate)(reservation_validators_1.createReservationSchema), reservation_controllers_1.createReservation);
router.get("/", reservation_controllers_1.getAllReservations);
router.get("/:id", reservation_controllers_1.getReservationById);
router.put("/:id", reservation_controllers_1.updateReservation);
router.delete("/:id", reservation_controllers_1.deleteReservation);
exports.default = router;
//# sourceMappingURL=reservation.route.js.map