import { z } from "zod";

export const checkoutFormSchema = z.object({
  fullName: z.string().min(1),
  phoneNo: z.string().min(1),
  district: z.string(),
  area: z.string(),
  address: z.string().min(1),
  email: z.string().optional(),
  orderNote: z.string().optional(),
});
