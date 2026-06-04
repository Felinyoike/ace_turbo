import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { StoredTurbo } from "@/lib/persistence";

function primaryPartNumber(sku: string) {
  return sku.replace(/-\d+$/, "").split(/\s+/)[0] || sku;
}

function friendlyTurboFamily(type: string) {
  const cleaned = type.replace(/\s+/g, " ").trim();
  if (!cleaned || cleaned === "Turbocharger") return "Turbocharger";
  const family = cleaned.split(/\s+/).slice(0, 2).join(" ");
  return family ? `${family} turbo` : "Turbocharger";
}

function friendlyProductName(turbo: StoredTurbo) {
  return [turbo.make, turbo.model, turbo.engine, "Turbocharger"].filter(Boolean).join(" ");
}

export function TurboCard({ turbo, isTrade }: { turbo: StoredTurbo; isTrade: boolean }) {
  const price = isTrade && turbo.tradePrice ? turbo.tradePrice : turbo.price;
  const isLowStock = turbo.stock <= 2;
  const hasPrice = price > 0;
  const displayPartNumber = primaryPartNumber(turbo.sku);
  const displayName = friendlyProductName(turbo);
  const familyName = friendlyTurboFamily(turbo.type);

  return (
    <article className="relative border border-slate-200 bg-white transition hover:border-[#0868a8]/40 hover:shadow-md group">
      {/* Blue left accent matching site's .angle-panel language */}
      <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#0868a8] to-[#60a5fa] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />

      <div className="p-5">
        {/* Top row: type badge + stock */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="font-tech text-[9px] uppercase tracking-[0.28em] text-[#0868a8]">
            {familyName}
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

        {/* Friendly product name with part number as supporting detail */}
        <h2 className="font-tech text-[18px] font-bold tracking-tight text-[#0f172a] leading-none mb-2">
          {displayName}
        </h2>
        <p className="font-tech text-[10px] uppercase tracking-[0.18em] text-[#64748b]">
          Part No. {displayPartNumber}
        </p>

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
        <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
          <div>
            <p className="font-tech text-[8px] uppercase tracking-[0.2em] text-[#94a3b8]">
              {isTrade ? "Trade Price" : "Retail Price"}
            </p>
            <p className="font-tech text-[18px] font-bold text-[#0f172a]">
              {hasPrice ? `£${price.toFixed(2)}` : "Price on request"}
            </p>
          </div>
          <AddToCartButton
            price={price}
            turboId={turbo.id}
            turboName={displayName}
          />
          <Link
            className="inline-flex justify-center border border-[#0868a8] px-5 py-3 font-tech text-[10px] uppercase tracking-[0.2em] text-[#0868a8] transition hover:border-[#054b7f] hover:bg-[#eff6ff] hover:text-[#054b7f]"
            href={"/turbos/" + turbo.seoSlug}
          >
            View →
          </Link>
        </div>
      </div>
    </article>
  );
}
