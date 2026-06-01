// services/reservation.service.ts

import { ReservationModel } from "../models/reservation.model";
import { CreateReservationDto } from "../types";

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

        phoneNumber: payload.phone,
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

    const reservationNumber = this.generateReservationNumber(
      payload.fullName,
      payload.date,
    );

    const reservation = await ReservationModel.create({
      fullname: payload.fullName,

      phoneNumber: payload.phone,
      email: payload.email,
      occasion: payload.occasion,
      date: payload.date,

      reservationNumber: reservationNumber,
      specialRequest: payload.specialRequest,

      time: payload.time,

      noOfGuests: payload.noOfGuest,
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

Reservation ID:
${reservation.reservationNumber}

Name:
${reservation.fullname}

Email:
${reservation.email}

Occasion:
${reservation.occasion}

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

Reservation ID:
${reservation.reservationNumber}

Name:
${reservation.fullname}

Phone:
${reservation.phoneNumber}

Email:
${reservation.email}

Occasion:
${reservation.occasion}

Special Request:
${reservation.specialRequest}

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

  private static generateReservationNumber(
    fullName: string,
    date: Date | string,
  ) {
    // Extract initials
    const initials = fullName
      .trim()
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    // Normalize date
    const reservationDate = new Date(date);

    const year = reservationDate.getFullYear().toString().slice(-2);

    const month = String(reservationDate.getMonth() + 1).padStart(2, "0");

    const day = String(reservationDate.getDate()).padStart(2, "0");

    const datePart = `${year}${month}${day}`;

    // Generate random string
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();

    return `NB-${initials}-${datePart}-${randomPart}`;
  }
}
