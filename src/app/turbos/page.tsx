export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { TurboCard } from "@/components/turbos/TurboCard";
import { TurboFilter } from "@/components/turbos/TurboFilter";
import { getSessionUser, isB2B } from "@/lib/auth";
import { getTurbos } from "@/lib/data-access";
import type { StoredTurbo } from "@/lib/persistence";

export const metadata: Metadata = {
  title: "Turbo Search",
  description: "Search Ace Turbo stock by make, model, year, engine, BHP and part number.",
  alternates: { canonical: "/turbos" }
};

export default async function TurbosPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const partNumber = typeof searchParams.partNumber === "string" ? searchParams.partNumber : "";
  const user = await getSessionUser();
  const bhpValue = typeof searchParams.bhp === "string" && searchParams.bhp ? Number(searchParams.bhp) : undefined;

  const make  = typeof searchParams.make   === "string" ? searchParams.make   : undefined;
  const model = typeof searchParams.model  === "string" ? searchParams.model  : undefined;
  const year  = typeof searchParams.year   === "string" && searchParams.year  ? Number(searchParams.year)  : undefined;
  const engine = typeof searchParams.engine === "string" ? searchParams.engine : undefined;

  const turbos = await getTurbos({
    partNumber: partNumber ? partNumber.toUpperCase() : undefined,
    make,
    model,
    engine,
    year,
    bhp: bhpValue,
    // Apply ±3 BHP tolerance when BHP is supplied (mirrors legacy regnum2.php power range filter)
    bhpFuzzy: bhpValue !== undefined
  });

  // Determine if this is a reg-lookup result (has make+model or bhp set)
  const isRegLookup = Boolean((make || model) && bhpValue);
  const vehicleLabel = [make, model, year ? String(year) : ""].filter(Boolean).join(" ");

  return (
    <main className="min-h-screen bg-white">
      {/* ── Page Header ── */}
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1080px] px-4 py-12">
          <p className="font-tech text-[10px] uppercase tracking-[0.3em] text-[#0868a8]">Ace Turbo</p>
          <h1 className="mt-2 text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            Turbo <span className="text-[#0868a8]">Search</span>
          </h1>
          <p className="mt-3 max-w-2xl font-tech text-[13px] leading-7 text-[#475569]">
            Filter stock by vehicle fitment or turbo part number. Trade users automatically see
            protected B2B pricing after sign-in.
          </p>

          {/* Context banner when coming from reg lookup */}
          {isRegLookup && vehicleLabel && (
            <div className="mt-5 inline-flex items-center gap-3 border border-[#0868a8]/25 bg-[#eff6ff] px-4 py-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#0868a8]">
                Showing results for:
              </span>
              <span className="font-tech text-[11px] font-bold uppercase tracking-[0.15em] text-[#0f172a]">
                {vehicleLabel}
              </span>
              {bhpValue && (
                <span className="border border-[#0868a8]/30 bg-white px-2 py-0.5 font-tech text-[9px] uppercase tracking-[0.15em] text-[#0868a8]">
                  {bhpValue} BHP ±3
                </span>
              )}
            </div>
          )}

          {/* Part number context */}
          {partNumber && !isRegLookup && (
            <div className="mt-5 inline-flex items-center gap-3 border border-slate-200 bg-slate-50 px-4 py-2">
              <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#64748b]">
                Part number:
              </span>
              <span className="font-tech text-[11px] font-bold tracking-[0.15em] text-[#0f172a]">
                {partNumber}
              </span>
            </div>
          )}

          {/* Filter bar */}
          <div className="mt-6">
            <TurboFilter
              defaults={{
                partNumber,
                make: make ?? "",
                model: model ?? "",
                year: year ? String(year) : "",
                engine: engine ?? "",
                bhp: bhpValue ? String(bhpValue) : ""
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <div className="mx-auto max-w-[1080px] px-4 pb-16 pt-8">
        <AdSlot className="mb-6" slot="2480110010" />

        {/* Results count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="font-tech text-[10px] uppercase tracking-[0.24em] text-[#64748b]">
            {turbos.length === 0
              ? "No results found"
              : `${turbos.length} result${turbos.length === 1 ? "" : "s"} found`}
          </p>
          {turbos.length === 0 && (make || model || partNumber) && (
            <a
              href="/turbos"
              className="font-tech text-[9px] uppercase tracking-[0.2em] text-[#0868a8] hover:underline"
            >
              Clear and browse all →
            </a>
          )}
        </div>

        {turbos.length > 0 ? (
          <section className="grid gap-4 md:grid-cols-2" aria-label="Turbo results">
            {turbos.map((turbo: StoredTurbo) => (
              <TurboCard isTrade={isB2B(user)} key={turbo.sku} turbo={turbo} />
            ))}
          </section>
        ) : (
          /* Empty state */
          <div className="border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
            <svg className="mx-auto mb-4 opacity-30" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <p className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#64748b]">
              No matching turbos found
            </p>
            <p className="mt-2 text-[13px] text-[#94a3b8]">
              Try widening your search — adjust the make, model or year, or{" "}
              <a href="/contact" className="text-[#0868a8] hover:underline">contact us</a> for a manual lookup.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}