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
  const turbos = await getTurbos({
    partNumber: partNumber ? partNumber.toUpperCase() : undefined,
    make: typeof searchParams.make === "string" ? searchParams.make : undefined,
    model: typeof searchParams.model === "string" ? searchParams.model : undefined,
    engine: typeof searchParams.engine === "string" ? searchParams.engine : undefined,
    year: typeof searchParams.year === "string" && searchParams.year ? Number(searchParams.year) : undefined,
    bhp: typeof searchParams.bhp === "string" && searchParams.bhp ? Number(searchParams.bhp) : undefined
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1080px] px-4 py-14">
          <p className="text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Ace Turbo</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            Turbo <span className="text-[#0868a8]">Search</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#475569]">
            Filter stock by vehicle fitment or turbo part number. Trade users automatically see
            protected B2B pricing after sign-in.
          </p>
          <div className="mt-8">
            <TurboFilter
              defaults={{
                partNumber,
                make: typeof searchParams.make === "string" ? searchParams.make : "",
                model: typeof searchParams.model === "string" ? searchParams.model : "",
                year: typeof searchParams.year === "string" ? searchParams.year : "",
                engine: typeof searchParams.engine === "string" ? searchParams.engine : "",
                bhp: typeof searchParams.bhp === "string" ? searchParams.bhp : ""
              }}
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <div className="mx-auto max-w-[1080px] px-4 pb-16 pt-8">
        <AdSlot className="mb-6" slot="2480110010" />
        <section className="grid gap-4 md:grid-cols-2">
          {turbos.map((turbo: StoredTurbo) => (
            <TurboCard isTrade={isB2B(user)} key={turbo.sku} turbo={turbo} />
          ))}
        </section>
      </div>
    </main>
  );
}