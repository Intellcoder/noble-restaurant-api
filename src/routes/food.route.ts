import { Router } from "express";
import {
  createFood,
  getFoodById,
  updateFood,
  getAllFoods,
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

export default router;
