import Link from "next/link";
import type { StoredTurbo } from "@/lib/persistence";

export function TurboCard({ turbo, isTrade }: { turbo: StoredTurbo; isTrade: boolean }) {
  const price = isTrade && turbo.tradePrice ? turbo.tradePrice : turbo.price;
  const isLowStock = turbo.stock <= 2;

  return (
    <article className="relative border border-slate-200 bg-white transition hover:border-[#0868a8]/40 hover:shadow-md group">
      {/* Blue left accent matching site's .angle-panel language */}
      <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#0868a8] to-[#60a5fa] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />

      <div className="p-5">
        {/* Top row: type badge + stock */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="font-tech text-[9px] uppercase tracking-[0.28em] text-[#0868a8]">
            {turbo.type || "Turbocharger"}
          </span>
          <span
            className={`font-tech text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 border ${
              isLowStock
                ? "border-amber-200 bg-amber-50 text-amber-700"
                : "border-slate-200 bg-slate-50 text-[#475569]"
            }`}
          >
            {turbo.stock} in stock
          </span>
        </div>

        {/* SKU — primary identifier, monospaced */}
        <h2 className="font-tech text-[18px] font-bold tracking-tight text-[#0f172a] leading-none mb-2">
          {turbo.sku}
        </h2>

        {/* Vehicle fitment details — mirrors the legacy table columns */}
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 border-t border-slate-100 pt-3">
          {turbo.make && (
            <div>
              <p className="font-tech text-[8px] uppercase tracking-[0.2em] text-[#94a3b8]">Make</p>
              <p className="font-tech text-[12px] text-[#0f172a]">{turbo.make}</p>
            </div>
          )}
          {turbo.model && (
            <div>
              <p className="font-tech text-[8px] uppercase tracking-[0.2em] text-[#94a3b8]">Model</p>
              <p className="font-tech text-[12px] text-[#0f172a]">{turbo.model}</p>
            </div>
          )}
          {turbo.year && (
            <div>
              <p className="font-tech text-[8px] uppercase tracking-[0.2em] text-[#94a3b8]">Year</p>
              <p className="font-tech text-[12px] text-[#0f172a]">{turbo.year}</p>
            </div>
          )}
          {turbo.engine && (
            <div>
              <p className="font-tech text-[8px] uppercase tracking-[0.2em] text-[#94a3b8]">Engine</p>
              <p className="font-tech text-[12px] text-[#0f172a]">{turbo.engine}</p>
            </div>
          )}
          {turbo.bhp && (
            <div>
              <p className="font-tech text-[8px] uppercase tracking-[0.2em] text-[#94a3b8]">BHP</p>
              <p className="font-tech text-[12px] text-[#0f172a]">{turbo.bhp} bhp</p>
            </div>
          )}
        </div>

        {/* Description */}
        {turbo.description && (
          <p className="mt-3 text-[13px] leading-6 text-[#64748b] line-clamp-2">
            {turbo.description}
          </p>
        )}

        {/* Price + CTA */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="font-tech text-[8px] uppercase tracking-[0.2em] text-[#94a3b8]">
              {isTrade ? "Trade Price" : "Retail Price"}
            </p>
            <p className="font-tech text-[18px] font-bold text-[#0f172a]">
              £{price.toFixed(2)}
            </p>
          </div>
          <Link
            className="border border-[#0868a8] bg-[#0868a8] px-5 py-2.5 font-tech text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-[#054b7f] hover:border-[#054b7f]"
            href={"/turbos/" + turbo.seoSlug}
          >
            View →
          </Link>
        </div>
      </div>
    </article>
  );
}