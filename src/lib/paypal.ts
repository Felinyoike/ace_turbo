const BASE_URL =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

export function isPayPalConfigured() {
  return !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

async function getAccessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) throw new Error("PayPal credentials not configured");

  const res = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  if (!res.ok) throw new Error(`PayPal auth failed: ${res.status}`);
  const data = await res.json();
  return data.access_token as string;
}

export async function createPayPalOrder(order: {
  id: number;
  total: number;
  items: Array<{ name: string; quantity: number; unitPrice: number }>;
}) {
  const token = await getAccessToken();
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const res = await fetch(`${BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: String(order.id),
          amount: {
            currency_code: "GBP",
            value: order.total.toFixed(2),
            breakdown: {
              item_total: { currency_code: "GBP", value: order.total.toFixed(2) }
            }
          },
          items: order.items.map((item) => ({
            name: item.name.slice(0, 127),
            quantity: String(item.quantity),
            unit_amount: { currency_code: "GBP", value: item.unitPrice.toFixed(2) }
          }))
        }
      ],
      application_context: {
        brand_name: "Ace Turbo",
        user_action: "PAY_NOW",
        return_url: `${baseUrl}/account/orders?success=1`,
        cancel_url: `${baseUrl}/checkout?cancel=1`
      }
    })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`PayPal order creation failed: ${JSON.stringify(err)}`);
  }

  return (await res.json()) as { id: string; status: string };
}

export async function capturePayPalOrder(paypalOrderId: string) {
  const token = await getAccessToken();

  const res = await fetch(`${BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`PayPal capture failed: ${JSON.stringify(err)}`);
  }

  const data = await res.json() as {
    id: string;
    status: string;
    purchase_units: Array<{
      reference_id: string;
      payments: { captures: Array<{ id: string; status: string }> };
    }>;
  };

  return {
    paypalOrderId: data.id,
    status: data.status,
    captureId: data.purchase_units[0]?.payments?.captures[0]?.id,
    internalOrderId: Number(data.purchase_units[0]?.reference_id || 0)
  };
}
