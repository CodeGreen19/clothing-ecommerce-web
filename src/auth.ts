import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./drizzle/db";
import authConfig from "./auth.config";
import { RolesEnum } from "./drizzle/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userInfo = user as {
          id: string;
          phoneNo?: string;
          email?: string;
          name?: string;
          role: RolesEnum;
        };
        token.id = userInfo.id;
        token.phoneNo = userInfo.phoneNo;
        token.email = userInfo.email;
        token.name = userInfo.name;
        token.role = userInfo.role;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.phoneNo = token.phoneNo as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.role = token.role as RolesEnum;

      return session;
    },
  },
});
