export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSessionUser } from "@/lib/auth";
import { capturePayPalOrder } from "@/lib/paypal";
import { markOrderPaid, getOrderById } from "@/lib/orders";
import { jsonError } from "@/lib/http";

const schema = z.object({ paypalOrderId: z.string().min(1) });

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireSessionUser();
  const orderId = Number(params.id);
  if (!orderId) return jsonError("Invalid order ID");

  const order = await getOrderById(orderId);
  if (!order) return jsonError("Order not found", 404);
  if (order.userId !== user.id && order.email !== user.email) {
    return jsonError("Access denied", 403);
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return jsonError("Missing paypalOrderId");

  try {
    const capture = await capturePayPalOrder(parsed.data.paypalOrderId);
    if (capture.status !== "COMPLETED") {
      return jsonError(`Payment not completed: ${capture.status}`, 402);
    }
    const paid = await markOrderPaid(orderId, capture.captureId, capture.paypalOrderId);
    return NextResponse.json({ order: paid, status: "paid" });
  } catch (err) {
    return jsonError(`Payment capture failed: ${String(err)}`, 500);
  }
}
