import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";

import { getUserByEmail } from "@/data/user";

import { LoginSchema } from "./schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          console.log("validatedFields");
          return null;
        }
        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          console.log("user");
          return null;
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (passwordMatches) {
          return user;
        }
        console.log("passwordMatches");
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
