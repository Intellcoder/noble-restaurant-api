import { Router } from "express";
import {
  createFood,
  getFoodById,
  updateFood,
  getAllFoods,
  deleteFood,
  fetchFoodByCategory,
} from "../controllers/foods.controllers";
import { validate } from "../middlewares/validateRequest";
import { createFoodSchema } from "../utils/validators/food.validators";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post(
  "/",
  upload.single("image"),
  validate(createFoodSchema),
  createFood,
);
router.get("/", getAllFoods);
router.get("/category", fetchFoodByCategory);
router.get("/:id", getFoodById);
router.put("/:id", upload.single("image"), updateFood);
router.delete("/:id", deleteFood);

export default router;
