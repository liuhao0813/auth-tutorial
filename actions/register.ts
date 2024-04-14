"use server";

import { getUserByEmail, createUser } from "@/data/user";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { name, email, password } = validatedFields.data;
  const user = await getUserByEmail(email);
  if (user) {
    return { error: "Email already exists!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await createUser({
    name,
    email,
    password: hashedPassword,
  });

  // TODO: Send email

  return { success: "Email sent!" };
};
