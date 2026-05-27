"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { trackBeginCheckout, trackPurchase } from "@/lib/analytics";

type Step = "form" | "paypal";

export function CheckoutPanel() {
  const [step, setStep] = useState<Step>("form");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [paypalOrderId, setPaypalOrderId] = useState<string | null>(null);

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          address: form.get("address")
        })
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Failed to create order.");
        return;
      }

      if (data.mode === "mock") {
        window.location.href = data.checkoutUrl;
        return;
      }

      setOrderId(data.order.id);
      setPaypalOrderId(data.paypalOrderId);
      setStep("paypal");
      trackBeginCheckout(data.order.total || 0, data.order.items || []);
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function captureOrder(paypalOId: string) {
    const response = await fetch(`/api/orders/${orderId}/capture`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ paypalOrderId: paypalOId })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Capture failed");
    return data;
  }

  if (step === "paypal" && paypalOrderId) {
    return (
      <div className="grid gap-4 border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-[#0f172a]">Complete Payment</h2>
        <p className="text-sm text-[#475569]">
          Your order has been reserved. Complete payment via PayPal below.
        </p>
        <PayPalScriptProvider options={{ clientId: paypalClientId, currency: "GBP" }}>
          <PayPalButtons
            style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
            createOrder={() => Promise.resolve(paypalOrderId)}
            onApprove={async (data) => {
              try {
                const captureData = await captureOrder(data.orderID);
                trackPurchase(orderId || 0, captureData.order?.total || 0, captureData.order?.items || []);
                window.location.href = "/account/orders?success=1";
              } catch (err) {
                setMessage(String(err));
              }
            }}
            onError={(err) => setMessage("PayPal error: " + String(err))}
            onCancel={() => setMessage("Payment cancelled. You can try again.")}
          />
        </PayPalScriptProvider>
        <button
          className="text-sm text-[#475569] underline hover:text-[#0f172a]"
          type="button"
          onClick={() => { setStep("form"); setMessage(""); }}
        >
          ← Change delivery details
        </button>
        {message ? <p className="text-sm text-red-500">{message}</p> : null}
      </div>
    );
  }

  return (
    <form className="grid gap-4 border border-slate-200 bg-white p-6" onSubmit={submit}>
      <h2 className="text-lg font-bold text-[#0f172a]">Delivery Details</h2>
      <label className="grid gap-1 text-sm font-bold text-[#0f172a]">
        Email
        <input
          className="border border-slate-200 bg-white px-3 py-3 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0868a8] focus:outline-none"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
        />
      </label>
      <label className="grid gap-1 text-sm font-bold text-[#0f172a]">
        Delivery Address
        <textarea
          className="border border-slate-200 bg-white px-3 py-3 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0868a8] focus:outline-none"
          name="address"
          rows={3}
          placeholder="Full delivery address"
          required
        />
      </label>
      <button
        className="bg-[#0868a8] px-5 py-3 font-bold text-white transition hover:bg-[#054b7f] disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        {loading ? "Creating order..." : "Continue to PayPal"}
      </button>
      {message ? <p className="text-sm text-red-500">{message}</p> : null}
    </form>
  );
}