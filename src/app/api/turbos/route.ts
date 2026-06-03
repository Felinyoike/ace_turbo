export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getTurbos } from "@/lib/data-access";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      partNumber: searchParams.get("partNumber") || undefined,
      make: searchParams.get("make") || undefined,
      model: searchParams.get("model") || undefined,
      year: searchParams.get("year") ? Number(searchParams.get("year")) : undefined,
      engine: searchParams.get("engine") || undefined,
      bhp: searchParams.get("bhp") ? Number(searchParams.get("bhp")) : undefined,
      bhpFuzzy: searchParams.has("bhp") // Apply ±3 tolerance when BHP is supplied
    };

    const turbos = await getTurbos(filters);

    return NextResponse.json({
      turbos,
      count: turbos.length,
      filters
    });
  } catch (error) {
    console.error("[turbos API] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch turbos" },
      { status: 500 }
    );
  }
}
