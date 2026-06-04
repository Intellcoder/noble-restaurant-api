import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
export declare class ReservationModel extends Model<InferAttributes<ReservationModel>, InferCreationAttributes<ReservationModel>> {
    id: CreationOptional<string>;
    fullname: string;
    phoneNumber: string;
    email: CreationOptional<string>;
    specialRequest: CreationOptional<string>;
    reservationNumber: string;
    occasion: string;
    date: string;
    time: string;
    noOfGuests: number;
}
//# sourceMappingURL=reservation.model.d.ts.map