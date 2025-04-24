"use server";
import { db } from "@/drizzle/db";
import { orders } from "@/drizzle/schema";

export const adminOrders = async () => {
  return await db.select().from(orders);
};
