import type { Metadata } from "next";
import { BrandCard } from "@/components/turbos/BrandCard";
import { TURBO_BRANDS } from "@/lib/turbo-brands";

export const metadata: Metadata = {
  title: "Turbo Finder | Ace Turbo — Browse Turbos by Brand",
  description:
    "Browse turbocharger brands including Garrett, Holset, IHI, Mitsubishi, Schwitzer, Toyota, and KKK. Learn how to identify part numbers for each brand.",
};

export default function TurboBrandsPage() {
  const brands = TURBO_BRANDS;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">
            Browse by Brand
          </p>
          <h1 className="mt-3 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            Turbo <span className="text-[#0868a8]">Finder</span>
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#475569]">
            Select your turbocharger brand to learn how to identify part numbers and find the
            correct turbo for your vehicle. We cover all major manufacturers.
          </p>
        </div>
      </section>

      {/* Brand Cards Grid */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
        <div className="grid gap-5">
          {brands.map((brand) => (
            <div key={brand.id} className="grid gap-3">
              <BrandCard brand={brand} />
              <div className="border border-slate-200 bg-[#f8fafc] px-6 py-5 md:ml-20">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#0868a8]">
                  Identification Snapshot
                </p>
                <p className="mt-2 max-w-3xl text-[14px] leading-7 text-[#475569]">
                  {brand.identificationGuide[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="border-t border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-[13px] uppercase tracking-[0.26em] text-[#0868a8]">
                Need Help Finding Your Turbo?
              </p>
              <h2 className="mt-2 text-[2rem] font-extrabold uppercase text-[#0f172a]">
                Contact <span className="text-[#0868a8]">Our Team</span>
              </h2>
              <p className="mt-3 text-[16px] leading-7 text-[#475569]">
                If you are having trouble identifying your turbo part number, our experienced
                team is here to help. Give us a call or send us an email with your vehicle details.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <a
                href="tel:01279-817451"
                className="flex items-center justify-between border border-slate-200 bg-white px-6 py-4 transition hover:border-[#0868a8]/50 hover:shadow-sm"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#64748b]">Phone</p>
                  <p className="mt-1 text-xl font-bold text-[#0f172a]">01279-817451</p>
                </div>
                <span className="text-xl text-[#0868a8]">→</span>
              </a>
              <a
                href="mailto:contact@aceturbo.co.uk"
                className="flex items-center justify-between border border-slate-200 bg-white px-6 py-4 transition hover:border-[#0868a8]/50 hover:shadow-sm"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#64748b]">Email</p>
                  <p className="mt-1 text-xl font-bold text-[#0f172a]">contact@aceturbo.co.uk</p>
                </div>
                <span className="text-xl text-[#0868a8]">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}