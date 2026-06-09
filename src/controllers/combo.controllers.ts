import { Request, Response, NextFunction } from "express";
import { ComboService } from "../services/combo.services";

export const CreateCombos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    const combos = await ComboService.createCombo(data);

  
    return res.status(201).json({
      success: true,
      data: combos,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllCombos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("getting combos");
    const combos = await ComboService.getAllCombos();

    return res.status(200).json({
      success: true,
      data: combos,
    });
  } catch (error) {
    console.log("error:", error);
    return next(error);
  }
};

export const getComboById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const combo = await ComboService.getComboById(id as string);

    if (!combo) {
      return res.status(404).json({
        success: false,
        message: "Combo not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: combo,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateCombo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const combo = await ComboService.updateCombo(id as string, data);

    return res.status(200).json({
      success: true,
      message: "Combo updated successfully",
      data: combo,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteCombo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await ComboService.deleteCombo(id as string);

    return res.status(200).json({
      success: true,
      message: "Combo deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
