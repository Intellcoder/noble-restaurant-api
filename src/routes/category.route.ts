import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  findCategory,
  findCategoryByName,
  getAllCategory,
  updateCategory,
} from "../controllers/category.controller";

const router = Router();

router.post("/", createCategory);
router.get("/", getAllCategory);
router.get("/:id", findCategory);
router.post("/name", findCategoryByName);
router.delete("/:id", deleteCategory);
router.patch("/:id", updateCategory);

export default router;
