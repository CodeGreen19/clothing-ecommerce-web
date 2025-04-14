import { z } from "zod";

export const authPhoneNoSchema = z.object({
  phoneNo: z
    .string()
    .min(11, "Enter you phone number correctly")
    .max(11, "Phone number must be 11 char."),
});
export const authOtpSchema = z.object({
  otp: z.string().min(5, "Enter otp correctly").max(5, "Enter otp correctly"),
});
