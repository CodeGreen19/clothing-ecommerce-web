"use server";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";

export const adminUsers = async () => {
  return await db.select().from(users);
};
