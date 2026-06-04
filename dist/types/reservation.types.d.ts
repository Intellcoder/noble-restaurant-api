export interface Reservation {
    id: string;
    fullname: string;
    phoneNumber: string;
    date: Date;
    time: string;
    noOfGuests: number;
}
export interface CreateReservationDto {
    fullName: string;
    phone: string;
    email: string;
    occasion: string;
    specialRequest: string;
    date: string;
    time: string;
    noOfGuest: number;
}
//# sourceMappingURL=reservation.types.d.ts.map