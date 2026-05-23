"use client";

import { useState } from "react";

export type CartLineItem = {
  turboId: number;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export function CartItem({ item, onUpdate }: { item: CartLineItem; onUpdate?: () => void }) {
  const [qty, setQty] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  async function updateQuantity(newQty: number) {
    setLoading(true);
    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ turboId: item.turboId, quantity: newQty })
    });
    setQty(newQty);
    setLoading(false);
    window.dispatchEvent(new CustomEvent("cart-updated"));
    if (onUpdate) onUpdate();
  }

  async function remove() {
    setLoading(true);
    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ turboId: item.turboId, quantity: 0 })
    });
    setLoading(false);
    window.dispatchEvent(new CustomEvent("cart-updated"));
    if (onUpdate) onUpdate();
  }

  return (
    <article className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
      <div>
        <h2 className="font-bold text-[#0f172a]">{item.name}</h2>
        <p className="text-sm text-[#475569]">{item.sku} · GBP {item.unitPrice.toFixed(2)} each</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-slate-200">
          <button
            className="px-3 py-1 text-[#0f172a] transition hover:bg-slate-100 disabled:opacity-50"
            onClick={() => updateQuantity(qty - 1)}
            disabled={loading || qty <= 1}
            type="button"
          >
            −
          </button>
          <span className="px-3 py-1 text-sm font-bold text-[#0f172a]">{qty}</span>
          <button
            className="px-3 py-1 text-[#0f172a] transition hover:bg-slate-100 disabled:opacity-50"
            onClick={() => updateQuantity(qty + 1)}
            disabled={loading || qty >= 20}
            type="button"
          >
            +
          </button>
        </div>
        <p className="min-w-[80px] text-right font-bold text-[#0f172a]">GBP {(item.unitPrice * qty).toFixed(2)}</p>
        <button
          className="border border-red-200 bg-red-50 px-3 py-1 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
          onClick={remove}
          disabled={loading}
          type="button"
        >
          Remove
        </button>
      </div>
    </article>
  );
}