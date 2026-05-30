import { Router } from "express";
import {
  createCategory,
  findCategory,
  findCategoryByName,
  getAllCategory,
} from "../controllers/category.controller";

const router = Router();

router.post("/", createCategory);
router.get("/", getAllCategory);
router.get("/:id", findCategory);
router.post("/name", findCategoryByName);

export default router;
