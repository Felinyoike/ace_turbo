export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getEbayAuthUrl, isEbayConfigured } from "@/lib/ebayAuth";
import { jsonError } from "@/lib/http";

export async function GET() {
  await requireAdmin();

  if (!isEbayConfigured()) {
    return jsonError("eBay credentials not configured. Set EBAY_APP_ID and EBAY_CERT_ID.", 400);
  }

  const authUrl = getEbayAuthUrl();
  return NextResponse.redirect(authUrl);
}
