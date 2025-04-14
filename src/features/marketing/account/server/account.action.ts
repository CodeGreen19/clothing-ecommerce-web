"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const userLogout = async () => {
  await signOut({ redirect: true, redirectTo: "/" });
};

export const updateRole = async (id: string) => {
  const [data] = await db
    .update(users)
    .set({ role: "Admin" })
    .where(eq(users.id, id))
    .returning();
  await signIn("credentials", { userId: data.id });
};
