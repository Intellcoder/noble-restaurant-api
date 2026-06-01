import { customError } from "../errors/errorHandler";
import { ReservationService } from "../services/reservation.services";
import { Request, Response, NextFunction } from "express";

export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    const result = await ReservationService.createReservation(data);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Error occurred", 500));
  }
};

export const getAllReservations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { totalReservations, data } =
      await ReservationService.getAllReservations();

    return res.status(200).json({
      success: true,
      totalReservations,
      data,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Error occurred", 500));
  }
};

export const getReservationById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await ReservationService.getReservationById(id as string);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    return next(customError("Error occurred", 500));
  }
};

export const updateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    console.log(error);
    return next(customError("Error occurred", 500));
  }
};
export const deletReservation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    console.log(error);
    return next(customError("Error occurred", 500));
  }
};
