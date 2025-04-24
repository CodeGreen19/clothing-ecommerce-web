"use server";

import { db } from "@/drizzle/db";
import { orders } from "@/drizzle/schema";
import { getUserIdFromAuthSession } from "@/features/auth/server/auth.helper";
import { eq } from "drizzle-orm";

export const userOrders = async () => {
  const userId = await getUserIdFromAuthSession();
  if (!userId) return { error: "user does'nt exists" };
  return db.select().from(orders).where(eq(orders.userId, userId));
};
