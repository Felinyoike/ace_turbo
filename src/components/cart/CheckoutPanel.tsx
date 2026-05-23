"use client";

import { useState } from "react";

export function CheckoutPanel() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage("Order created successfully.");
        window.dispatchEvent(new CustomEvent("cart-updated"));
      }
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
        {loading ? "Processing..." : "Continue to Payment"}
      </button>
      {message ? <p className="text-sm text-[#475569]">{message}</p> : null}
    </form>
  );
}