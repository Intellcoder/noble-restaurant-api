export interface Reservation {
    id: string;
    fullname: string;
    phoneNumber: string;
    date: Date;
    time: string;
    noOfGuests: number;
}
export interface CreateReservationDto {
    fullname: string;
    phoneNumber: string;
    date: string;
    time: string;
    noOfGuests: number;
}
//# sourceMappingURL=reservation.types.d.ts.map