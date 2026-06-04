import { ReservationModel } from "../models/reservation.model";
import { CreateReservationDto } from "../types";
export declare class ReservationService {
    /**
     * ----------------------------------------
     * CREATE RESERVATION
     * ----------------------------------------
     */
    static createReservation(payload: CreateReservationDto): Promise<{
        success: boolean;
        message: string;
        data: ReservationModel;
    }>;
    /**
     * ----------------------------------------
     * GET ALL RESERVATIONS
     * ----------------------------------------
     */
    static getAllReservations(): Promise<{
        success: boolean;
        totalReservations: number;
        data: ReservationModel[];
    }>;
    /**
     * ----------------------------------------
     * GET RESERVATION BY ID
     * ----------------------------------------
     */
    static getReservationById(id: string): Promise<ReservationModel>;
    /**
     * ----------------------------------------
     * UPDATE RESERVATION
     * ----------------------------------------
     */
    static updateReservation(id: string, payload: Partial<CreateReservationDto>): Promise<{
        success: boolean;
        message: string;
        data: ReservationModel;
    }>;
    /**
     * ----------------------------------------
     * DELETE RESERVATION
     * ----------------------------------------
     */
    static deleteReservation(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    private static generateReservationNumber;
}
//# sourceMappingURL=reservation.services.d.ts.map