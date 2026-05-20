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
    <main className="min-h-screen bg-[#131315]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#27272A] bg-[#1c1b1d]">
        <div className="machine-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="font-tech text-[13px] uppercase tracking-[0.3em] text-[#ffb59e]">
            Browse by Brand
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#e5e1e4]">
            Turbo <span className="text-[#ff571a]">Finder</span>
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#c6c6cf]">
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
              <div className="border border-[#27272A] bg-[#201f22] px-6 py-5 md:ml-20">
                <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#ffb59e]">
                  Identification Snapshot
                </p>
                <p className="mt-2 max-w-3xl text-[14px] leading-7 text-[#c6c6cf]">
                  {brand.identificationGuide[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="border-t border-[#27272A] bg-[#0e0e10]">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-tech text-[13px] uppercase tracking-[0.26em] text-[#ffb59e]">
                Need Help Finding Your Turbo?
              </p>
              <h2 className="mt-2 font-display text-[2rem] uppercase text-[#e5e1e4]">
                Contact <span className="text-[#ff571a]">Our Team</span>
              </h2>
              <p className="mt-3 text-[16px] leading-7 text-[#c6c6cf]">
                If you're having trouble identifying your turbo part number, our experienced
                team is here to help. Give us a call or send us an email with your vehicle
                details.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <a
                href="tel:01279-817451"
                className="flex items-center justify-between border border-[#27272A] bg-[#1c1b1d] px-6 py-4 transition hover:border-[#ff571a]/40"
              >
                <div>
                  <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#929090]">
                    Phone
                  </p>
                  <p className="mt-1 font-display text-xl text-[#e5e1e4]">01279-817451</p>
                </div>
                <span className="text-[#ff571a]">→</span>
              </a>
              <a
                href="mailto:contact@aceturbo.co.uk"
                className="flex items-center justify-between border border-[#27272A] bg-[#1c1b1d] px-6 py-4 transition hover:border-[#ff571a]/40"
              >
                <div>
                  <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#929090]">
                    Email
                  </p>
                  <p className="mt-1 font-display text-xl text-[#e5e1e4]">
                    contact@aceturbo.co.uk
                  </p>
                </div>
                <span className="text-[#ff571a]">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
