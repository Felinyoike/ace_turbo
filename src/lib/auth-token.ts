import jwt from "jsonwebtoken";
import type { SessionUser } from "@/lib/auth";

const sessionSecret = process.env.NEXTAUTH_SECRET;
if (!sessionSecret && process.env.NODE_ENV === "production") {
  throw new Error("NEXTAUTH_SECRET must be set in production. Aborting.");
}
const secret = sessionSecret || "dev-ace-turbo-secret";

export type SessionTokenPayload = SessionUser & {
  sid: string;
  exp?: number;
  iat?: number;
};

export function createSessionToken(user: SessionUser, sid: string) {
  return jwt.sign({ ...user, sid }, secret, { expiresIn: "7d" });
}

export function verifySessionToken(token: string) {
  return jwt.verify(token, secret) as SessionTokenPayload;
}