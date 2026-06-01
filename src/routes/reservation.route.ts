import { Router } from "express";
import {
  createReservation,
  deletReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
} from "../controllers/reservation.controllers";
import { validate } from "../middlewares/validateRequest";
import { createReservationSchema } from "../utils/validators/reservation.validators";

const router = Router();

router.post("/", validate(createReservationSchema), createReservation);
router.get("/", getAllReservations);
router.get("/:id", getReservationById);
router.put("/id", updateReservation);
router.delete("/id", deletReservation);

export default router;
