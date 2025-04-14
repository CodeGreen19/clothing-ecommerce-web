import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { UserTableType } from "./drizzle/types";
import { getUserById } from "./features/auth/server/auth.helper";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        userId: { label: "User Id", type: "text" },
      },
      async authorize(credentails) {
        let user: UserTableType | null = null;
        if (credentails.userId) {
          user = await getUserById(credentails.userId as string);
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
