export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { carRegSchema } from "@/validators/carRegSchema";
import { fetchVehicleFromUkVehicleData } from "@/lib/ukvehicledata";
import { getRedis } from "@/lib/redis";
import { logLookup } from "@/lib/lookup";
import { jsonError } from "@/lib/http";
import { rateLimit } from "@/lib/rateLimit";
import { findVehicleByRegistration } from "@/lib/data-access";

const inMemoryVehicleCache = new Map<string, unknown>();

export async function POST(request: Request) {
  try {
    const limiter = await rateLimit("lookup:reg", 25, 60_000);
    if (!limiter.allowed)
      return jsonError("Too many registration lookups. Please try again shortly.", 429);

    const body = await request.json().catch(() => null);
    const parsed = carRegSchema.safeParse(body);
    if (!parsed.success) return jsonError("Invalid registration number — please check and try again.");

    const { registration } = parsed.data;
    const redis = getRedis();
    const cacheKey = `vehicle:${registration}`;
    const userIp = request.headers.get("x-forwarded-for") || "127.0.0.1";

    // 1. Redis cache
    try {
      const cached = await redis?.get(cacheKey);
      if (cached) {
        const vehicle = JSON.parse(cached) as Record<string, unknown>;
        logLookup(registration, "cache", userIp, vehicle).catch(() => {});
        return NextResponse.json({ registration, source: "cache", vehicle });
      }
    } catch {
      // Redis unavailable — continue without cache
    }

    // 2. DB lookup (non-fatal — remote DB may not be reachable in local dev)
    try {
      const storedVehicle = await findVehicleByRegistration(registration);
      if (storedVehicle) {
        redis?.set(cacheKey, JSON.stringify(storedVehicle), "EX", 60 * 60 * 24).catch(() => {});
        logLookup(registration, "db", userIp, storedVehicle as unknown as Record<string, unknown>).catch(() => {});
        return NextResponse.json({ registration, source: "db", vehicle: storedVehicle });
      }
    } catch {
      // DB unreachable (e.g. local dev without VPN) — fall through to API call
    }

    // 3. In-memory cache (dev hot-reload safe)
    if (inMemoryVehicleCache.has(registration)) {
      const vehicle = inMemoryVehicleCache.get(registration) as Record<string, unknown>;
      logLookup(registration, "db", userIp, vehicle).catch(() => {});
      return NextResponse.json({ registration, source: "memory", vehicle });
    }

    // 4. UK Vehicle Data API (same endpoint as legacy regnum2.php)
    const vehicle = await fetchVehicleFromUkVehicleData(registration);
    inMemoryVehicleCache.set(registration, vehicle);

    redis?.set(cacheKey, JSON.stringify(vehicle), "EX", 60 * 60 * 24).catch(() => {});
    logLookup(registration, "api", userIp, vehicle as Record<string, unknown>).catch(() => {});

    return NextResponse.json({
      registration,
      source: "api",
      vehicle
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred during lookup.";
    console.error("[car-lookup] Error:", message);
    return jsonError(message, 500);
  }
}
