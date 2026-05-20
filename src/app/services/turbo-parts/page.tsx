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
    <main className="min-h-screen bg-[#131315]">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-[#27272A] bg-[#1c1b1d]">
        <div className="machine-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="font-tech text-[13px] uppercase tracking-[0.3em] text-[#ffb59e]">Services</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#e5e1e4]">
            Turbo <span className="text-[#ff571a]">Parts</span>
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#c6c6cf]">
            Whether you need a single nut for the turbine shaft or a complete Melett repair kit, we
            can supply you with the best turbo parts in the world at competitive prices.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:01279-817451"
              className="inline-flex items-center gap-2 bg-[#ff571a] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#3a0b00] transition hover:brightness-110"
            >
              📞 Call 01279-817451
            </a>
            <a
              href="mailto:contact@aceturbo.co.uk"
              className="inline-flex items-center gap-2 border border-[#ad897e] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#e5e1e4] transition hover:bg-white/5"
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
              <h2 className="mb-5 font-tech text-[13px] uppercase tracking-[0.26em] text-[#ff571a]">
                Comprehensive Parts Range
              </h2>
              <div className="space-y-5 text-[16px] leading-8 text-[#c6c6cf]">
                <p>
                  Whether you want a nut for the turbine shaft or a complete repair kit, we can supply
                  you with the best turbo parts in the world. Our comprehensive range covers almost
                  every aspect of the turbocharger across all major brands and vehicle applications.
                </p>
                <p>
                  Call us on{" "}
                  <a href="tel:01279-817451" className="font-semibold text-[#ff571a] hover:underline">
                    01279-817451
                  </a>{" "}
                  or email us with your part requirements and we will respond with availability and pricing.
                </p>
              </div>
            </section>

            {/* Parts Grid */}
            <section>
              <h2 className="mb-6 font-display text-[1.75rem] uppercase text-[#e5e1e4]">
                Parts <span className="text-[#ff571a]">Catalogue</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {partCategories.map((cat, i) => (
                  <div
                    key={cat.label}
                    className="group flex flex-col border border-[#27272A] bg-[#1c1b1d] p-6 transition hover:border-[#ff571a]/40"
                  >
                    <p className="mb-2 font-tech text-[10px] uppercase tracking-[0.22em] text-[#ffb59e]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-tech text-[13px] uppercase tracking-[0.18em] text-[#e5e1e4]">
                      {cat.label}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-[#929090]">{cat.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Brands supported */}
            <section>
              <h2 className="mb-6 font-display text-[1.75rem] uppercase text-[#e5e1e4]">
                Brands <span className="text-[#ff571a]">Supported</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "Garrett", "BorgWarner", "IHI", "Mitsubishi", "Holset",
                  "KKK / BorgWarner", "Schwitzer", "Continental", "BMTS", "Toyota",
                ].map((brand) => (
                  <span
                    key={brand}
                    className="rounded-[2px] border border-[#27272A] bg-[#201f22] px-4 py-2 font-tech text-[11px] uppercase tracking-[0.18em] text-[#c6c6cf]"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </section>

            {/* Melett callout */}
            <div className="border border-[#ff571a]/30 bg-[#1c1b1d] p-8">
              <p className="mb-2 font-tech text-[10px] uppercase tracking-[0.26em] text-[#ffb59e]">
                Quality Standard
              </p>
              <h3 className="font-display text-2xl uppercase text-[#e5e1e4]">
                Melett-Grade Components
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#c6c6cf]">
                We source the same Melett components used in our own repair and remanufacturing
                processes. These are the industry gold standard for aftermarket turbo parts — used by
                professional workshops worldwide.
              </p>
            </div>

            {/* CTA */}
            <section className="border border-[#27272A] bg-[#201f22] p-8">
              <h3 className="mb-3 font-display text-2xl uppercase text-[#e5e1e4]">
                Can&apos;t Find Your Part?
              </h3>
              <p className="mb-6 text-[16px] leading-7 text-[#c6c6cf]">
                Our comprehensive range covers almost every turbocharger component. If you cannot find
                what you need online, call us directly and we will source it for you.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:01279-817451"
                  className="inline-flex items-center gap-2 bg-[#ff571a] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#3a0b00] transition hover:brightness-110"
                >
                  Call 01279-817451
                </a>
                <a
                  href="mailto:contact@aceturbo.co.uk"
                  className="inline-flex items-center gap-2 border border-[#5c4037] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#e5e1e4] transition hover:bg-white/5"
                >
                  Email for Parts
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-[#27272A] bg-[#201f22] p-6">
              <h4 className="mb-4 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
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
                    className="flex items-center justify-between border border-transparent px-4 py-3 text-[14px] text-[#c6c6cf] transition hover:border-[#27272A] hover:bg-[#1c1b1d] hover:text-[#ffdbd0]"
                  >
                    {label}
                    <span className="text-[#ff571a]">→</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="border border-[#27272A] bg-[#1c1b1d] p-6">
              <h4 className="mb-3 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
                Contact Us
              </h4>
              <a
                href="tel:01279-817451"
                className="block w-full bg-[#ff571a] py-3 text-center font-tech text-[12px] uppercase tracking-[0.2em] text-[#3a0b00] transition hover:brightness-110"
              >
                01279-817451
              </a>
              <a
                href="mailto:contact@aceturbo.co.uk"
                className="mt-2 block w-full border border-[#5c4037] py-3 text-center font-tech text-[12px] uppercase tracking-[0.2em] text-[#e5e1e4] transition hover:bg-white/5"
              >
                contact@aceturbo.co.uk
              </a>
            </div>

            <div className="border border-[#27272A] bg-[#1c1b1d] p-6">
              <h4 className="mb-3 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
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
                  <li key={item} className="flex items-center gap-2 text-[14px] text-[#c6c6cf]">
                    <span className="text-[#ff571a]">✓</span> {item}
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
