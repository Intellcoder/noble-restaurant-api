import { Request, Response, NextFunction } from "express";
import { CategoryServices } from "../services/category.services";
import { customError } from "../errors/errorHandler";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const result = await CategoryServices.create(data);

    return res.status(200).json({
      success: true,
      message: "category created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return next(customError("category creation failed", 500));
  }
};

export const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryServices.getAllCategories();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const findCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await CategoryServices.findById(id as string);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Failed to get category", 500));
  }
};
export const findCategoryByName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;
    const result = await CategoryServices.findByName(name);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Error running this operation", 500));
  }
};
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;
    const result = await CategoryServices.findByName(name);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await CategoryServices.deleteCategory(id as string);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
