import { Router } from "express";
import {
  createFood,
  getFoodById,
  updateFood,
  getAllAvailableFoods,
  deleteFood,
  getAllFoods,
  toggleAvailbility,
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

router.get("/", getAllAvailableFoods);
router.get("/allfoods", getAllFoods);
router.get("/category", fetchFoodByCategory);
router.get("/:id", getFoodById);
router.patch("/:id/toggle", toggleAvailbility);
router.put("/:id", upload.single("image"), updateFood);
router.delete("/:id", deleteFood);

export default router;
