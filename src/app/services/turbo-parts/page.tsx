export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Turbo Parts | Ace Turbo — Full Range of Turbocharger Components",
  description:
    "From a single turbine shaft nut to a complete Melett repair kit — Ace Turbo supplies the full range of turbo parts. Call 01279-817451 or visit our parts website.",
};

const partCategories = [
  { label: "Repair Kits", desc: "Complete Melett repair kits with all seals, bearings and washers." },
  { label: "CHRA / Cartridge", desc: "Brand-new turbine core assemblies for all major turbo brands." },
  { label: "Compressor Wheels", desc: "Billet aluminium and OEM-spec compressor wheels." },
  { label: "Turbine Shafts", desc: "Precision turbine shafts — new, not reground." },
  { label: "Actuators", desc: "Pneumatic and electronic actuator assemblies." },
  { label: "VNT Nozzle Rings", desc: "Variable nozzle turbine (VNT) ring assemblies." },
  { label: "Seals & Bearings", desc: "Individual seals, journal bearings and thrust bearings." },
  { label: "Back Plates", desc: "Compressor back plates for most common applications." },
  { label: "Gasket Kits", desc: "Full inlet and exhaust gasket kits for all major makes." },
];

export default function TurboPartsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="machine-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="font-tech text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Services</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#0f172a]">
            Turbo <span className="text-[#0868a8]">Parts</span>
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#475569]">
            Whether you need a single nut for the turbine shaft or a complete Melett repair kit, we
            can supply you with the best turbo parts in the world at competitive prices.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:01279-817451"
              className="inline-flex items-center gap-2 bg-[#0868a8] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-white transition hover:bg-[#054b7f]"
            >
              📞 Call 01279-817451
            </a>
            <a
              href="mailto:contact@aceturbo.co.uk"
              className="inline-flex items-center gap-2 border border-[#bfdbfe] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#334155] transition hover:bg-[#eff6ff]"
            >
              ✉ Email for Parts
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">

          {/* Main Content */}
          <div className="space-y-12">

            {/* Intro */}
            <section>
              <h2 className="mb-5 font-tech text-[13px] uppercase tracking-[0.26em] text-[#0868a8]">
                Comprehensive Parts Range
              </h2>
              <div className="space-y-5 text-[16px] leading-8 text-[#475569]">
                <p>
                  Whether you want a nut for the turbine shaft or a complete repair kit, we can supply
                  you with the best turbo parts in the world. Our comprehensive range covers almost
                  every aspect of the turbocharger across all major brands and vehicle applications.
                </p>
                <p>
                  Call us on{" "}
                  <a href="tel:01279-817451" className="font-semibold text-[#0868a8] hover:underline">
                    01279-817451
                  </a>{" "}
                  or email us with your part requirements and we will respond with availability and pricing.
                </p>
              </div>
            </section>

            {/* Parts Grid */}
            <section>
              <h2 className="mb-6 font-display text-[1.75rem] uppercase text-[#0f172a]">
                Parts <span className="text-[#0868a8]">Catalogue</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {partCategories.map((cat, i) => (
                  <div
                    key={cat.label}
                    className="group flex flex-col border border-slate-200 bg-white p-6 transition hover:border-[#0868a8]/40 hover:shadow-sm"
                  >
                    <p className="mb-2 font-tech text-[10px] uppercase tracking-[0.22em] text-[#0868a8]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-tech text-[13px] uppercase tracking-[0.18em] text-[#0f172a]">
                      {cat.label}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-[#64748b]">{cat.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Brands supported */}
            <section>
              <h2 className="mb-6 font-display text-[1.75rem] uppercase text-[#0f172a]">
                Brands <span className="text-[#0868a8]">Supported</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "Garrett", "BorgWarner", "IHI", "Mitsubishi", "Holset",
                  "KKK / BorgWarner", "Schwitzer", "Continental", "BMTS", "Toyota",
                ].map((brand) => (
                  <span
                    key={brand}
                    className="rounded-[2px] border border-[#bfdbfe] bg-[#eff6ff] px-4 py-2 font-tech text-[11px] uppercase tracking-[0.18em] text-[#0868a8]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </section>

            {/* Melett callout */}
            <div className="border border-[#0868a8]/20 bg-[#eff6ff] p-8">
              <p className="mb-2 font-tech text-[10px] uppercase tracking-[0.26em] text-[#0868a8]">
                Quality Standard
              </p>
              <h3 className="font-display text-2xl uppercase text-[#0f172a]">
                Melett-Grade Components
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#475569]">
                We source the same Melett components used in our own repair and remanufacturing
                processes. These are the industry gold standard for aftermarket turbo parts — used by
                professional workshops worldwide.
              </p>
            </div>

            {/* CTA */}
            <section className="border border-slate-200 bg-[#f8fafc] p-8">
              <h3 className="mb-3 font-display text-2xl uppercase text-[#0f172a]">
                Can&apos;t Find Your Part?
              </h3>
              <p className="mb-6 text-[16px] leading-7 text-[#475569]">
                Our comprehensive range covers almost every turbocharger component. If you cannot find
                what you need online, call us directly and we will source it for you.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:01279-817451"
                  className="inline-flex items-center gap-2 bg-[#0868a8] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-white transition hover:bg-[#054b7f]"
                >
                  Call 01279-817451
                </a>
                <a
                  href="mailto:contact@aceturbo.co.uk"
                  className="inline-flex items-center gap-2 border border-[#bfdbfe] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#334155] transition hover:bg-[#eff6ff]"
                >
                  Email for Parts
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-slate-200 bg-white p-6">
              <h4 className="mb-4 font-tech text-[11px] uppercase tracking-[0.24em] text-[#0868a8]">
                All Services
              </h4>
              <nav className="space-y-1">
                {[
                  ["Turbo Repairs", "/services/turbo-repairs"],
                  ["Remanufactured Turbos", "/services/remanufactured"],
                  ["Turbo Fitting", "/services/turbo-fitting"],
                  ["Turbo Parts", "/services/turbo-parts"],
                  ["New Turbos", "/services/new-turbos"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between border border-transparent px-4 py-3 text-[14px] text-[#475569] transition hover:border-slate-200 hover:bg-slate-50 hover:text-[#0868a8]"
                  >
                    {label}
                    <span className="text-[#0868a8]">→</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="border border-slate-200 bg-[#eff6ff] p-6">
              <h4 className="mb-3 font-tech text-[11px] uppercase tracking-[0.24em] text-[#0868a8]">
                Contact Us
              </h4>
              <a
                href="tel:01279-817451"
                className="block w-full bg-[#0868a8] py-3 text-center font-tech text-[12px] uppercase tracking-[0.2em] text-white transition hover:bg-[#054b7f]"
              >
                01279-817451
              </a>
              <a
                href="mailto:contact@aceturbo.co.uk"
                className="mt-2 block w-full border border-[#bfdbfe] py-3 text-center font-tech text-[12px] uppercase tracking-[0.2em] text-[#334155] transition hover:bg-white"
              >
                contact@aceturbo.co.uk
              </a>
            </div>

            <div className="border border-slate-200 bg-white p-6">
              <h4 className="mb-3 font-tech text-[11px] uppercase tracking-[0.24em] text-[#0868a8]">
                Quick Facts
              </h4>
              <ul className="space-y-3">
                {[
                  "Full parts range in stock",
                  "Melett-grade quality",
                  "All major brands covered",
                  "Trade & retail supply",
                  "Fast dispatch available",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[14px] text-[#475569]">
                    <span className="text-[#0868a8]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
