import { z } from "zod";
import { checkoutFormSchema } from "../schema/checkout.schema";
import { CHECKOUT_METHOD_ARR } from "../constants";
import { InferSelectModel } from "drizzle-orm";
import { shippingInfo } from "@/drizzle/schema";

export type CheckoutInfoType = {
  name: string;
  phoneNo: string;
  district: string;
  area: string;
  address: string;
  email: string | undefined;
  note: string | undefined;
  delevery: "inside" | "outside";
  method: string;
  totalAmount: number;
};

export type CheckoutFormSchemaType = z.infer<typeof checkoutFormSchema>;
export type CheckoutMethodType = (typeof CHECKOUT_METHOD_ARR)[number];
export type DBShippingInfo = InferSelectModel<typeof shippingInfo>;
