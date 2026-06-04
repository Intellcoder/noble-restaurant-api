import { z } from "zod";
export declare const createReservationSchema: z.ZodObject<{
    fullName: z.ZodString;
    phone: z.ZodString;
    email: z.ZodOptional<z.ZodEmail>;
    occasion: z.ZodString;
    date: z.ZodString;
    specialRequest: z.ZodOptional<z.ZodString>;
    time: z.ZodString;
    noOfGuest: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
//# sourceMappingURL=reservation.validators.d.ts.map