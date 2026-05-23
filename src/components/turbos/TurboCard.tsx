import Link from "next/link";
import type { StoredTurbo } from "@/lib/persistence";

export function TurboCard({ turbo, isTrade }: { turbo: StoredTurbo; isTrade: boolean }) {
  const price = isTrade && turbo.tradePrice ? turbo.tradePrice : turbo.price;

  return (
    <article className="border border-slate-200 bg-white p-5 transition hover:border-[#0868a8]/40 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0868a8]">{turbo.type}</p>
          <h2 className="mt-2 text-xl font-black text-[#0f172a]">{turbo.sku}</h2>
        </div>
        <span className="bg-[#eff6ff] px-3 py-1 text-xs font-bold text-[#475569]">
          {turbo.stock} in stock
        </span>
      </div>
      <p className="mt-3 text-[15px] leading-7 text-[#475569]">{turbo.description}</p>
      <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-[#0868a8]">
        {isTrade ? "Trade" : "Retail"} — GBP {price.toFixed(2)}
      </p>
      <Link
        className="mt-4 inline-flex bg-[#0868a8] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#054b7f]"
        href={"/turbos/" + turbo.seoSlug}
      >
        View product
      </Link>
    </article>
  );
}