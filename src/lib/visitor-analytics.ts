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

export function summarizeVisitorAnalyticsError(error: unknown) {
  if (!(error instanceof Error)) return String(error);

  const errorWithDetails = error as Error & {
    code?: string;
    errors?: Array<Error & { code?: string; address?: string; port?: number }>;
  };

  const code = errorWithDetails.code ? `${errorWithDetails.code}: ` : "";
  const nestedErrors = errorWithDetails.errors
    ?.map((nestedError) => {
      const nestedCode = nestedError.code ? `${nestedError.code} ` : "";
      const endpoint = nestedError.address && nestedError.port ? ` (${nestedError.address}:${nestedError.port})` : "";
      return `${nestedCode}${nestedError.message}${endpoint}`;
    })
    .join("; ");

  return nestedErrors ? `${code}${error.message} [${nestedErrors}]` : `${code}${error.message}`;
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
  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS visitorCount FROM VisitorLog");
    return Number((rows as any[])[0]?.visitorCount || 0);
  } catch (error) {
    console.warn("[visitor-analytics] Visitor count unavailable:", summarizeVisitorAnalyticsError(error));
    return 0;
  }
}
