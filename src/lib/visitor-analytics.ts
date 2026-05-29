import crypto from "crypto";
import { pool } from "@/lib/db";

export type VisitorLogInput = {
  page: string;
  referrer?: string | null;
  userAgent?: string | null;
  ipAddress: string;
};

export function hashVisitorIp(ipAddress: string) {
  const salt = process.env.VISITOR_IP_SALT;
  if (!salt) throw new Error("VISITOR_IP_SALT is not configured");

  return crypto.createHash("sha256").update(`${salt}:${ipAddress}`).digest("hex");
}

export async function createVisitorLog(input: VisitorLogInput) {
  await pool.execute(
    "INSERT INTO VisitorLog (page, referrer, userAgent, hashedIp) VALUES (?, ?, ?, ?)",
    [
      input.page,
      input.referrer || null,
      input.userAgent || null,
      hashVisitorIp(input.ipAddress)
    ]
  );
}

export async function getVisitorCount() {
  const [rows] = await pool.query("SELECT COUNT(*) AS visitorCount FROM VisitorLog");
  return Number((rows as any[])[0]?.visitorCount || 0);
}
