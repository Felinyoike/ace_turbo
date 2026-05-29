export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { z } from "zod";
import { jsonError } from "@/lib/http";
import { rateLimit } from "@/lib/rateLimit";
import { createVisitorLog } from "@/lib/visitor-analytics";

const trackSchema = z.object({
  page: z.string().min(1).max(2048),
  referrer: z.string().max(2048).optional().nullable(),
  userAgent: z.string().max(512).optional().nullable()
});

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  return request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip") || "127.0.0.1";
}

export async function POST(request: Request) {
  const limiter = await rateLimit("analytics:track", 120, 60_000);
  if (!limiter.allowed) return jsonError("Too many tracking requests. Please try again shortly.", 429);

  const parsed = trackSchema.safeParse(await request.json());
  if (!parsed.success) return jsonError("Invalid analytics payload");

  await createVisitorLog({
    page: parsed.data.page,
    referrer: parsed.data.referrer,
    userAgent: parsed.data.userAgent,
    ipAddress: getClientIp(request)
  });

  return NextResponse.json({ status: "tracked" }, { status: 201 });
}
