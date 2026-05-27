export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { submitEbayListing } from "@/lib/ebayTrading";
import { isEbayConnected } from "@/lib/ebayAuth";
import { jsonError } from "@/lib/http";

const schema = z.object({
  turboId: z.number().optional(),
  listingType: z.enum(["Turbo", "CHRA"]),
  turboNumber: z.string().min(3),
  title: z.string().min(3).max(80),
  description: z.string().min(10),
  price: z.number().positive(),
  condition: z.enum(["New", "Remanufactured", "Used"]),
  quantity: z.number().int().positive().max(100).optional()
});

export async function GET() {
  await requireAdmin();
  const connected = await isEbayConnected();
  return NextResponse.json({ connected });
}

export async function POST(request: Request) {
  await requireAdmin();
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return jsonError("Invalid eBay listing request");
  const listing = await submitEbayListing(parsed.data);
  return NextResponse.json({ listing });
}
