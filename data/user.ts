import { db } from "@/lib/db";

interface UserCreateInput {
  name: string;
  email: string;
  password: string;
}

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({ where: { email } });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({ where: { id } });
  return user;
};

export const createUser = async (data: UserCreateInput) => {
  const user = await db.user.create({ data });
  return user;
};
