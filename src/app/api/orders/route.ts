export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { orderSchema } from "@/validators/orderSchema";
import { createOrderFromCart, listOrdersForCurrentUser } from "@/lib/orders";
import { createPayPalOrder, isPayPalConfigured } from "@/lib/paypal";
import { jsonError } from "@/lib/http";
import { rateLimit } from "@/lib/rateLimit";

export async function GET() {
  return NextResponse.json({ orders: await listOrdersForCurrentUser() });
}

export async function POST(request: Request) {
  const limiter = await rateLimit("orders:create", 10, 60_000);
  if (!limiter.allowed) return jsonError("Too many checkout attempts. Please try again shortly.", 429);

  const parsed = orderSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid order", issues: parsed.error.flatten() }, { status: 400 });

  const order = await createOrderFromCart({
    email: parsed.data.email,
    shippingAddress: parsed.data.address
  });

  if (!order) return NextResponse.json({ error: "Failed to create order" }, { status: 500 });

  if (!isPayPalConfigured()) {
    return NextResponse.json({
      order,
      checkoutUrl: `/checkout?order=${order.id}&mock=1`,
      mode: "mock"
    });
  }

  const paypalOrder = await createPayPalOrder({
    id: order.id,
    total: order.total,
    items: order.items
  });

  return NextResponse.json({
    order,
    paypalOrderId: paypalOrder.id,
    mode: "paypal"
  });
}
