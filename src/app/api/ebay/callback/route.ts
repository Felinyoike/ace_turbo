export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { exchangeCodeForTokens } from "@/lib/ebayAuth";

export async function GET(request: Request) {
  await requireAdmin();

  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/admin/ebay?error=no_code`);
  }

  try {
    await exchangeCodeForTokens(code);
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/admin/ebay?connected=1`);
  } catch (err) {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/admin/ebay?error=${encodeURIComponent(String(err))}`);
  }
}
