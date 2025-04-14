import { db } from "@/drizzle/db";
import { users, verificationPhoneOtp } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  if (!user) return null;
  return user;
}
export async function insertOtp(
  identifier: string,
  expires: Date,
  otp: string,
) {
  await db.insert(verificationPhoneOtp).values({
    identifier,
    expires,
    otp,
  });
}
export async function getOtp(identifier: string, otp: string) {
  const result = await db
    .select()
    .from(verificationPhoneOtp)
    .where(
      and(
        eq(verificationPhoneOtp.identifier, identifier),
        eq(verificationPhoneOtp.otp, otp),
      ),
    )
    .limit(1);

  return result[0] ?? null;
}

export async function deleteOtp(identifier: string, otp: string) {
  await db
    .delete(verificationPhoneOtp)
    .where(
      and(
        eq(verificationPhoneOtp.identifier, identifier),
        eq(verificationPhoneOtp.otp, otp),
      ),
    );
}
export async function deleteOtpByNumber(identifier: string) {
  await db
    .delete(verificationPhoneOtp)
    .where(eq(verificationPhoneOtp.identifier, identifier));
}
