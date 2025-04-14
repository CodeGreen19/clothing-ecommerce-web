"use server";

import { signIn } from "@/auth";

import { generateUniqueOTP } from "@/data/helper";
import { db } from "@/drizzle/db";
import { accounts, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { authOtpSchema, authPhoneNoSchema } from "../schema/auth.schema";
import { authOTPSchemaType, authPhoneSchemaType } from "../types";
import { deleteOtp, deleteOtpByNumber, getOtp, insertOtp } from "./auth.helper";

// google login
export const LoginWithGoogle = async () => {
  await signIn("google");
};

// phone number login
export const loginWithPhoneNo = async (authData: authPhoneSchemaType) => {
  const { success, data } = authPhoneNoSchema.safeParse(authData);
  if (!success) {
    return { error: "Invalid Credentials" };
  }
  const otp = generateUniqueOTP();
  const expires = new Date(Date.now() + 1000 * 60 * 2);

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.phoneNo, data.phoneNo));

  // for existed user
  if (user) {
    //if exists so delete
    await deleteOtpByNumber(data.phoneNo);
    //create new token
    await insertOtp(data.phoneNo, expires, otp);
    return { message: "OTP has Sent !" };
  }

  // new user
  await db
    .insert(users)
    .values({
      phoneNo: data.phoneNo,
    })
    .returning();
  //create new token
  await insertOtp(data.phoneNo, expires, otp);
  // todo: send otp via sms

  return { message: "OTP has Sent !" };
};

export const varifyOtp = async ({
  authData,
  phoneNo,
}: {
  authData: authOTPSchemaType;
  phoneNo: string;
}) => {
  const { success, data } = authOtpSchema.safeParse(authData);
  if (!success) {
    return { error: "Invalid credentials" };
  }
  const [existedUser] = await db
    .select({ phoneNo: users.phoneNo, id: users.id })
    .from(users)
    .where(eq(users.phoneNo, phoneNo));

  if (!existedUser) {
    return { error: "User doesn't exists " };
  }
  //otp validation validation
  const otpInfo = await getOtp(phoneNo, data.otp);
  if (!otpInfo) return { error: "OTP is not valid !" };
  if (new Date(otpInfo.expires) < new Date()) {
    return { error: "OTP has Expired !" };
  }

  await deleteOtp(phoneNo, data.otp);

  // is account exist
  const [existedAccount] = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, existedUser.id));
  if (!existedAccount) {
    await db.insert(accounts).values({
      provider: "MobileNo",
      providerAccountId: crypto.randomUUID(),
      type: "oidc",
      userId: existedUser.id,
    });
  }
  await signIn("credentials", {
    userId: existedUser.id,
    redirect: false,
  });
  return { message: "Login Successfully" };
};
export const resendOTP = async ({ phoneNo }: { phoneNo: string }) => {
  const [existedUser] = await db
    .select({ phoneNo: users.phoneNo, id: users.id })
    .from(users)
    .where(eq(users.phoneNo, phoneNo));

  if (!existedUser) {
    return { error: "User doesn't exist" };
  }
  const otp = generateUniqueOTP();
  const expires = new Date(Date.now() + 1000 * 60 * 2);
  await deleteOtpByNumber(phoneNo);
  await insertOtp(phoneNo, expires, otp);
  // todo: send otp via sms

  return { message: "New OTP has sent !" };
};
