// services/reservation.service.ts

import { ReservationModel } from "../models/reservation.model";
import { type CreateReservationDto } from "../types";

import { WhatsAppService } from "./whatsapp.services";

const whatsappService = new WhatsAppService();

export class ReservationService {
  /**
   * ----------------------------------------
   * CREATE RESERVATION
   * ----------------------------------------
   */
  static async createReservation(payload: CreateReservationDto) {
    /**
     * ----------------------------------------
     * CHECK EXISTING RESERVATION SLOT
     * ----------------------------------------
     */

    const existingReservation = await ReservationModel.findOne({
      where: {
        date: payload.date,

        time: payload.time,

        phoneNumber: payload.phoneNumber,
      },
    });

    if (existingReservation) {
      throw new Error("You already have a reservation for this date and time");
    }

    /**
     * ----------------------------------------
     * CREATE RESERVATION
     * ----------------------------------------
     */

    const reservation = await ReservationModel.create({
      fullname: payload.fullname,

      phoneNumber: payload.phoneNumber,

      date: payload.date,

      time: payload.time,

      noOfGuests: payload.noOfGuests,
    });

    /**
     * ----------------------------------------
     * SEND CUSTOMER WHATSAPP MESSAGE
     * ----------------------------------------
     */

    try {
      await whatsappService.sendMessage({
        phone: reservation.phoneNumber,

        message: `
🍽️ Noble Restaurant

✅ Reservation Confirmed

Name:
${reservation.fullname}

Date:
${reservation.date}

Time:
${reservation.time}

Guests:
${reservation.noOfGuests}

We look forward to hosting you ❤️
`,
      });
    } catch (error) {
      console.error("Customer reservation WhatsApp failed:", error);
    }

    /**
     * ----------------------------------------
     * SEND ADMIN NOTIFICATION
     * ----------------------------------------
     */

    try {
      await whatsappService.sendMessage({
        phone: process.env.ADMIN_PHONE!,

        message: `
📅 NEW TABLE RESERVATION

Name:
${reservation.fullname}

Phone:
${reservation.phoneNumber}

Date:
${reservation.date}

Time:
${reservation.time}

Guests:
${reservation.noOfGuests}
`,
      });
    } catch (error) {
      console.error("Admin reservation WhatsApp failed:", error);
    }

    return {
      success: true,

      message: "Reservation created successfully",

      data: reservation,
    };
  }

  /**
   * ----------------------------------------
   * GET ALL RESERVATIONS
   * ----------------------------------------
   */
  static async getAllReservations() {
    const reservations = await ReservationModel.findAll({
      order: [["createdAt", "DESC"]],
    });

    return {
      success: true,

      totalReservations: reservations.length,

      data: reservations,
    };
  }

  /**
   * ----------------------------------------
   * GET RESERVATION BY ID
   * ----------------------------------------
   */
  static async getReservationById(id: string) {
    const reservation = await ReservationModel.findByPk(id);

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    return reservation;
  }

  /**
   * ----------------------------------------
   * UPDATE RESERVATION
   * ----------------------------------------
   */
  static async updateReservation(
    id: string,

    payload: Partial<CreateReservationDto>,
  ) {
    const reservation = await ReservationModel.findByPk(id);

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    await reservation.update(payload);

    return {
      success: true,

      message: "Reservation updated successfully",

      data: reservation,
    };
  }

  /**
   * ----------------------------------------
   * DELETE RESERVATION
   * ----------------------------------------
   */
  static async deleteReservation(id: string) {
    const reservation = await ReservationModel.findByPk(id);

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    await reservation.destroy();

    return {
      success: true,

      message: "Reservation deleted successfully",
    };
  }
}
