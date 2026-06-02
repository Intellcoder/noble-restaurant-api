import { Router } from "express";
import {
  CreateCombos,
  deleteCombo,
  getAllCombos,
  getComboById,
  updateCombo,
} from "../controllers/combo.controllers";

const router = Router();

router.post("/", CreateCombos);
router.get("/", getAllCombos);
router.get("/:id", getComboById);
router.delete("/", deleteCombo);
router.put("/", updateCombo);

export default router;
