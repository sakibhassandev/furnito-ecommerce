import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getSession() {
  const sessionCookie = await cookies();
  const session = sessionCookie.get("token");
  if (!session || !session.value) return null;
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
  const token = jwt.verify(session.value, process.env.JWT_SECRET);
  return token;
}
