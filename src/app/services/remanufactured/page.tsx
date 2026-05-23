export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Remanufactured Turbos | Ace Turbo — New CHRA, 2-Year Warranty",
  description:
    "Ace Turbo remanufactured turbos include a brand new turbine unit (CHRA) — not repaired old cores. 2-year warranty backed by genuine component sourcing. Call 01279-817451.",
};

const uniquePoints = [
  "We do not use old turbine cores (CHRA) in our remanufacturing process.",
  "When exchange turbochargers are returned, we scrap the old turbine cores entirely.",
  "We buy Turbo CHRA units in bulk, offsetting labour costs — and pass the savings to our customers.",
  "Because we fit a new turbo core, we know it will last at least 8–10 years — so a 2-year warranty is a no-brainer.",
  "We are a small but highly professional company, always ready to help with questions and advice.",
];

const newComponents = [
  { label: "Bearing Housing", description: "Brand new OEM-specification bearing housing" },
  { label: "Turbine Shaft", description: "Brand new turbine shaft — no reused components" },
  { label: "Seals & Bearings", description: "Full set of new seals and precision bearings" },
  { label: "Compressor Wheel", description: "Brand new billet compressor wheel" },
  { label: "Back Plate", description: "Brand new back plate — fully sealed" },
];

export default function RemanufacturedTurbosPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="machine-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="font-tech text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Services</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#0f172a]">
            Remanufactured <span className="text-[#0868a8]">Turbos</span>
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#475569]">
            Every Ace Turbo remanufactured unit includes a brand-new CHRA — not a repaired old core.
            Backed by a 2-year warranty and our commitment to total quality.
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
              ✉ Get a Quote
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">

          {/* Main Content */}
          <div className="space-y-12">

            {/* The Reality */}
            <section>
              <h2 className="mb-5 font-tech text-[13px] uppercase tracking-[0.26em] text-[#0868a8]">
                The Reality of the Market
              </h2>
              <div className="space-y-5 text-[16px] leading-8 text-[#475569]">
                <p>
                  As a professional organisation in the turbo remanufacturing arena, we want to
                  provide a product that is second to none. However, the reality of many remanufactured
                  turbochargers in the market is that by definition they tend to be old, used and worn
                  components which have come to the end of their natural life.
                </p>
                <p>
                  Regardless of how much some turbo remanufacturers claim about their processes, the
                  sad reality is that in order to maximise profits, many simply install new seals and
                  bearings into old turbine cores — and fix other damage using parts
                  cannibalized from other old turbos.
                </p>
                <p>
                  Turbochargers need to rev at up to{" "}
                  <span className="font-semibold text-[#0f172a]">250,000 RPM</span>. In order to
                  provide maximum boost they need to be in tip-top condition. Simply changing seals and
                  bearings does not achieve that.
                </p>
              </div>
            </section>

            {/* Our Offering */}
            <div className="border border-[#0868a8]/20 bg-[#eff6ff] p-8">
              <h2 className="mb-3 font-display text-2xl uppercase text-[#0f172a]">
                Our Offering
              </h2>
              <p className="text-[16px] leading-7 text-[#475569]">
                As a progressive company, we believe that building a following of loyal and satisfied
                customers is the key to our long-term success. This can only be achieved by providing
                an excellent product backed by a strong warranty at a competitive price.
              </p>
            </div>

            {/* What Makes Us Unique */}
            <section>
              <h2 className="mb-6 font-display text-[1.75rem] uppercase text-[#0f172a]">
                Why Buy From <span className="text-[#0868a8]">Us?</span>
              </h2>
              <div className="space-y-4">
                {uniquePoints.map((point, i) => (
                  <div key={i} className="flex gap-4 border border-slate-200 bg-white p-5 hover:shadow-sm transition-shadow">
                    <span className="mt-0.5 flex-shrink-0 font-tech text-[12px] text-[#0868a8]">
                      0{i + 1}
                    </span>
                    <p className="text-[15px] leading-7 text-[#475569]">{point}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* New Components Grid */}
            <section>
              <h2 className="mb-2 font-display text-[1.75rem] uppercase text-[#0f172a]">
                Every Turbo Includes <span className="text-[#0868a8]">All New</span>
              </h2>
              <p className="mb-8 text-[15px] leading-7 text-[#475569]">
                All our turbos without exception come with a brand-new turbine unit (CHRA), meaning
                your turbo will have the following brand-new components:
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {newComponents.map((comp) => (
                  <div
                    key={comp.label}
                    className="border border-slate-200 bg-white p-6 transition hover:border-[#0868a8]/40 hover:shadow-sm"
                  >
                    <div className="mb-2 h-1 w-8 bg-[#0868a8]" />
                    <h3 className="font-tech text-[13px] uppercase tracking-[0.18em] text-[#0f172a]">
                      {comp.label}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-[#64748b]">{comp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CHRA Explanation */}
            <div className="border-l-2 border-[#0868a8] bg-[#eff6ff] p-6">
              <p className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#0868a8]">
                Technical Note
              </p>
              <p className="mt-3 text-[16px] leading-7 text-[#475569]">
                The turbine unit (CHRA) is the component that has impellers on both ends — it{" "}
                <em>is</em> the turbo. The other components around it are casings that guide airflow to
                and from its impellers. When a turbo fails, this is the component that is typically
                repaired — but we replace it entirely with a new unit.
              </p>
            </div>

            {/* Warranty CTA */}
            <section className="border border-slate-200 bg-[#f8fafc] p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl uppercase text-[#0f172a]">
                    2-Year <span className="text-[#0868a8]">Warranty</span>
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-[#475569]">
                    Every remanufactured turbo we supply is backed by our 2-year warranty — because we
                    know our product will last.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:01279-817451"
                    className="inline-flex items-center justify-center bg-[#0868a8] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-white transition hover:bg-[#054b7f]"
                  >
                    Call to Order
                  </a>
                </div>
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
              <p className="mb-4 text-[14px] leading-6 text-[#475569]">
                Find your turbo replacement by reg number, make/model, or turbo part number.
              </p>
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
                What You Get
              </h4>
              <ul className="space-y-3">
                {[
                  "Brand new CHRA (not repaired)",
                  "2-year warranty",
                  "New compressor wheel",
                  "New turbine shaft",
                  "Full seal & bearing set",
                  "Competitive pricing",
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
