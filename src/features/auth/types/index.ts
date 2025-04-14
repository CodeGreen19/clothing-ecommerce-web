import { z } from "zod";
import { authOtpSchema, authPhoneNoSchema } from "../schema/auth.schema";

export type authPhoneSchemaType = z.infer<typeof authPhoneNoSchema>;
export type authOTPSchemaType = z.infer<typeof authOtpSchema>;
