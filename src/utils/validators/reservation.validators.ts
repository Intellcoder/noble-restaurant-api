import { email, z } from "zod";

export const createReservationSchema = z.object({
  fullName: z.string().min(1, "fullname is required"),
  phone: z.string().min(11, "phonenumber must be 11"),
  email: z.email().min(1, "email is required").optional(),
  occasion: z.string().min(1, "occasion is required"),
  date: z.string().min(1, "Date is required"),
  specialRequest: z.string().optional(),
  time: z.string().min(1, "Time is required"),
  noOfGuest: z.coerce.number(),
});
