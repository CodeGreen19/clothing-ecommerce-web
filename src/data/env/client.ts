import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_INSIDE_DHAKA_DELEVERY_AMOUNT: z.string().min(1),
    NEXT_PUBLIC_OUTSIDE_DHAKA_DELEVERY_AMOUNT: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_INSIDE_DHAKA_DELEVERY_AMOUNT:
      process.env.NEXT_PUBLIC_INSIDE_DHAKA_DELEVERY_AMOUNT,
    NEXT_PUBLIC_OUTSIDE_DHAKA_DELEVERY_AMOUNT:
      process.env.NEXT_PUBLIC_OUTSIDE_DHAKA_DELEVERY_AMOUNT,
  },
});
