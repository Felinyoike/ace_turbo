"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { CartItem, type CartLineItem } from "@/components/cart/CartItem";

export function CartPageClient({ initialItems, initialTotal }: { initialItems: (CartLineItem | null)[]; initialTotal: number }) {
  const [items, setItems] = useState<CartLineItem[]>(initialItems.filter(Boolean) as CartLineItem[]);
  const [total, setTotal] = useState(initialTotal);

  const refresh = useCallback(() => {
    fetch("/api/cart")
      .then((r) => r.json())
      .then((data) => {
        if (data.items) {
          setItems(data.items.filter(Boolean));
          setTotal(data.total || 0);
        }
      })
      .catch(() => {});
  }, []);

  async function clearCart() {
    await fetch("/api/cart", { method: "DELETE" });
    setItems([]);
    setTotal(0);
    window.dispatchEvent(new CustomEvent("cart-updated"));
  }

  if (!items.length) {
    return (
      <div className="border border-slate-200 bg-white p-8 text-center">
        <p className="text-[#475569]">Your cart is empty.</p>
        <Link href="/turbos" className="mt-4 inline-block bg-[#0868a8] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#054b7f]">
          Browse Stock
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <section className="border border-slate-200 bg-white p-6">
        <div className="grid gap-4">
          {items.map((item) => (
            <CartItem item={item} key={item.turboId} onUpdate={refresh} />
          ))}
        </div>
      </section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xl font-bold text-[#0f172a]">Total: GBP {total.toFixed(2)}</p>
        <div className="flex flex-wrap gap-3">
          <button
            className="border border-slate-200 px-5 py-3 text-sm font-bold text-[#0f172a] transition hover:border-red-300 hover:text-red-700"
            onClick={clearCart}
            type="button"
          >
            Clear Cart
          </button>
          <Link
            href="/checkout"
            className="bg-[#0868a8] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#054b7f]"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}