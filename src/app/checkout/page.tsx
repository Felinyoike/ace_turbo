export const dynamic = "force-dynamic";
import { buildCartView } from "@/lib/cart";
import { CheckoutPanel } from "@/components/cart/CheckoutPanel";
import Link from "next/link";

export default async function CheckoutPage() {
  const cart = await buildCartView();
  const items = cart.items.filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[900px] px-4 py-14">
          <p className="text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Payment</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            Secure <span className="text-[#0868a8]">Checkout</span>
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-[900px] px-4 py-12">
        {items.length ? (
          <div className="grid gap-6 md:grid-cols-[1fr_320px]">
            <CheckoutPanel />
            <aside className="border border-slate-200 bg-[#f8fafc] p-5 h-fit">
              <h2 className="mb-3 text-[15px] font-bold uppercase tracking-wide text-[#0f172a]">Order Summary</h2>
              <ul className="grid gap-2 text-sm text-[#475569]">
                {items.map((item) => (
                  <li key={item.turboId} className="flex justify-between gap-2">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-bold text-[#0f172a]">GBP {item.lineTotal.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between border-t border-slate-200 pt-4">
                <span className="font-bold text-[#0f172a]">Total</span>
                <span className="text-lg font-bold text-[#0f172a]">GBP {cart.total.toFixed(2)}</span>
              </div>
            </aside>
          </div>
        ) : (
          <div className="border border-slate-200 bg-white p-8 text-center">
            <p className="text-[#475569]">Your cart is empty. Add items before checking out.</p>
            <Link href="/turbos" className="mt-4 inline-block bg-[#0868a8] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#054b7f]">
              Browse Stock
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}