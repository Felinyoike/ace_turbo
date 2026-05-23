"use client";

import Link from "next/link";
import { useState } from "react";
import { CartItem, type CartLineItem } from "@/components/cart/CartItem";

export function CartDrawer({ items, total }: { items: CartLineItem[]; total: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="border border-slate-200 px-4 py-2 text-sm font-bold text-[#0f172a] transition hover:border-[#0868a8]/40"
        onClick={() => setOpen(true)}
        type="button"
      >
        Cart preview
      </button>
      {open ? (
        <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-slate-200 bg-white p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#0f172a]">Cart</h2>
            <button
              className="border border-slate-200 px-3 py-1 text-sm text-[#475569] transition hover:border-[#0868a8]/40"
              onClick={() => setOpen(false)}
              type="button"
            >
              Close
            </button>
          </div>
          <div className="grid gap-4">
            {items.map((item) => <CartItem item={item} key={item.turboId} />)}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <p className="font-bold text-[#0f172a]">GBP {total.toFixed(2)}</p>
            <Link className="bg-[#0868a8] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#054b7f]" href="/checkout">Checkout</Link>
          </div>
        </aside>
      ) : null}
    </>
  );
}