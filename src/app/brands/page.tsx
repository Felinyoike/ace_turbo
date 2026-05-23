export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Turbocharger Brands | Ace Turbo — Garrett, BorgWarner, IHI & More",
  description:
    "Ace Turbo supplies and repairs turbochargers from all major manufacturers — Garrett, BorgWarner, IHI, Mitsubishi, Holset, KKK and more. Find your brand.",
};

const brands = [
  {
    name: "Garrett",
    slug: "garrett",
    desc: "The world's most recognised turbocharger brand. Garrett turbos are found across a vast range of passenger cars, commercial vehicles and performance applications. Ace Turbo holds stock of Garrett units and replacement parts.",
    applications: ["Volkswagen Group", "Ford", "BMW", "Mercedes-Benz", "Renault"],
  },
  {
    name: "BorgWarner",
    slug: "borgwarner",
    desc: "BorgWarner (formerly KKK / 3K) supplies turbos to some of the world's largest vehicle manufacturers. Their advanced Variable Turbine Geometry (VTG) technology is found in performance and diesel applications alike.",
    applications: ["Audi", "Porsche", "Volkswagen", "Skoda", "SEAT"],
  },
  {
    name: "IHI",
    slug: "ihi",
    desc: "IHI Corporation is Japan's premier turbocharger manufacturer, supplying OEM units to the majority of Japanese vehicle brands. Renowned for precision engineering and long service life.",
    applications: ["Toyota", "Mazda", "Subaru", "Suzuki", "Mitsubishi"],
  },
  {
    name: "Mitsubishi",
    slug: "mitsubishi",
    desc: "Mitsubishi Heavy Industries (MHI) turbos are widely fitted across diesel passenger cars, light commercial vehicles and 4x4 applications. Known for robust heavy-duty performance.",
    applications: ["Mitsubishi", "Hyundai", "Kia", "Land Rover", "Isuzu"],
  },
  {
    name: "Holset",
    slug: "holset",
    desc: "A Cummins company, Holset specialises in turbos for heavy-duty diesel applications — commercial vehicles, buses and industrial engines. Ace Turbo supplies and repairs Holset units.",
    applications: ["Cummins", "DAF", "Iveco", "MAN", "Scania"],
  },
  {
    name: "Continental / BMTS",
    slug: "bmts",
    desc: "Continental and BMTS produce advanced turbo systems including electric variable geometry turbos (e-VGT). Increasingly found in modern European passenger cars with stringent emissions requirements.",
    applications: ["BMW", "MINI", "Opel / Vauxhall", "Citroën", "Peugeot"],
  },
];

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="machine-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="font-tech text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Turbo Finder</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#0f172a]">
            Turbocharger <span className="text-[#0868a8]">Brands</span>
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#475569]">
            We supply, repair and remanufacture turbochargers from all major manufacturers.
            Select a brand to explore the models we cover.
          </p>
        </div>
      </section>

      {/* Brand Grid */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {brands.map((brand, i) => (
            <article
              key={brand.slug}
              className="group flex flex-col border border-slate-200 bg-white transition hover:border-[#0868a8]/40 hover:shadow-md"
            >
              {/* Brand header */}
              <div className="relative overflow-hidden border-b border-slate-200 bg-slate-50 p-6">
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#0868a8]/6 blur-2xl" aria-hidden="true" />
                <p className="font-tech text-[10px] uppercase tracking-[0.26em] text-[#0868a8]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-1 font-display text-[2rem] uppercase text-[#0f172a] transition group-hover:text-[#0868a8]">
                  {brand.name}
                </h2>
              </div>

              {/* Brand body */}
              <div className="flex flex-1 flex-col gap-5 p-6">
                <p className="text-[14px] leading-7 text-[#64748b]">{brand.desc}</p>

                <div>
                  <p className="mb-2 font-tech text-[10px] uppercase tracking-[0.2em] text-[#0868a8]">
                    Common Applications
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {brand.applications.map((app) => (
                      <span
                        key={app}
                        className="border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 font-tech text-[10px] uppercase tracking-[0.16em] text-[#0868a8]"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex gap-3 pt-2">
                  <Link
                    href={`/turbos?brand=${brand.slug}`}
                    className="flex-1 border border-[#bfdbfe] py-2.5 text-center font-tech text-[11px] uppercase tracking-[0.18em] text-[#334155] transition hover:bg-[#eff6ff]"
                  >
                    Browse Units
                  </Link>
                  <a
                    href="tel:01279-817451"
                    className="flex-1 bg-[#0868a8] py-2.5 text-center font-tech text-[11px] uppercase tracking-[0.18em] text-white transition hover:bg-[#054b7f]"
                  >
                    Get a Quote
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Can't find your brand CTA */}
      <section className="border-t border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-4 py-16 text-center md:px-12">
          <p className="font-tech text-[13px] uppercase tracking-[0.26em] text-[#0868a8]">
            Not Listed?
          </p>
          <h2 className="font-display text-[2rem] uppercase text-[#0f172a]">
            We Cover <span className="text-[#0868a8]">All Brands</span>
          </h2>
          <p className="max-w-lg text-[16px] leading-7 text-[#475569]">
            If your turbo brand or model isn&apos;t listed here, call us directly. We have access
            to parts and technical data for virtually every turbocharger ever fitted to a
            road vehicle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:01279-817451"
              className="inline-flex items-center gap-2 bg-[#0868a8] px-7 py-3.5 font-tech text-[12px] uppercase tracking-[0.22em] text-white transition hover:bg-[#054b7f]"
            >
              Call 01279-817451
            </a>
            <a
              href="mailto:contact@aceturbo.co.uk"
              className="inline-flex items-center gap-2 border border-[#bfdbfe] px-7 py-3.5 font-tech text-[12px] uppercase tracking-[0.22em] text-[#334155] transition hover:bg-[#eff6ff]"
            >
              Email an Enquiry
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
