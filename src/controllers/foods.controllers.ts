import { success } from "zod";
import { FoodService } from "../services/food.services";
import { Request, Response, NextFunction } from "express";
import { CloudinaryService } from "../utils/cloudinary";

export const createFood = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let imageUrl = "";
    if (req.file) {
      imageUrl = await CloudinaryService.uploadImage(req.file, "foods");
    }
    const data = req.body;
    console.log("reqbody:", data);

    const result = await FoodService.createFood(data, imageUrl);

    return res.status(201).json({
      success: true,
      message: "Food item created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getFoodById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.body;

    const result = await FoodService.findById(id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllFoods = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { total, foods } = await FoodService.findAll();

    return res.status(200).json({
      success: true,
      total: total,
      foods: foods,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateFood = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await FoodService.delete(id as string);

    return res.status(200).json({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
