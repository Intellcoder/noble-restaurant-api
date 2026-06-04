"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReservationSchema = void 0;
const zod_1 = require("zod");
exports.createReservationSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "fullname is required"),
    phone: zod_1.z.string().min(11, "phonenumber must be 11"),
    email: zod_1.z.email().min(1, "email is required").optional(),
    occasion: zod_1.z.string().min(1, "occasion is required"),
    date: zod_1.z.string().min(1, "Date is required"),
    specialRequest: zod_1.z.string().optional(),
    time: zod_1.z.string().min(1, "Time is required"),
    noOfGuest: zod_1.z.coerce.number(),
});
//# sourceMappingURL=reservation.validators.js.map