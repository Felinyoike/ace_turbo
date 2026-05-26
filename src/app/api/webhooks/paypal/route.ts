export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { markOrderPaid } from "@/lib/orders";

export async function POST(request: Request) {
  if (!process.env.PAYPAL_WEBHOOK_ID) {
    return NextResponse.json({ received: true, note: "PayPal webhook not configured." });
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = payload?.event_type as string | undefined;

  if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
    const resource = payload.resource;
    const captureId = resource?.id as string | undefined;
    const paypalOrderId = resource?.supplementary_data?.related_ids?.order_id as string | undefined;
    const referenceId = resource?.custom_id ?? resource?.purchase_units?.[0]?.reference_id;
    const internalOrderId = Number(referenceId || 0);

    if (internalOrderId && captureId) {
      await markOrderPaid(internalOrderId, captureId, paypalOrderId);
    }
  }

  return NextResponse.json({ received: true });
}
