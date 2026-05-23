export const dynamic = "force-dynamic";
import Link from "next/link";
import { CartPageClient } from "@/components/cart/CartPageClient";
import { buildCartView } from "@/lib/cart";

export default async function CartPage() {
  const cart = await buildCartView();
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[900px] px-4 py-14">
          <p className="text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Your Order</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            Shopping <span className="text-[#0868a8]">Cart</span>
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-[900px] px-4 py-12">
        <CartPageClient initialItems={cart.items} initialTotal={cart.total} />
      </div>
    </main>
  );
}