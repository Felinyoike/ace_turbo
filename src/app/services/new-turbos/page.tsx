export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New Turbos | Ace Turbo — Brand New OEM Turbochargers at Best Price",
  description:
    "Ace Turbo supplies brand new OEM turbos from all leading manufacturers — Garrett, BorgWarner, IHI, Mitsubishi and more. We beat any price by 10%. Call 01279-817451.",
};

const brands = [
  { name: "Garrett", note: "Global leader in turbocharger technology" },
  { name: "BorgWarner", note: "Precision engineered for performance & efficiency" },
  { name: "IHI", note: "Japanese precision — trusted by major OEMs" },
  { name: "Mitsubishi", note: "Heavy-duty diesel & petrol applications" },
  { name: "Holset", note: "Cummins-owned — commercial & industrial grade" },
  { name: "Continental / BMTS", note: "Advanced VTG and electric turbo systems" },
];

export default function NewTurbosPage() {
  return (
    <main className="min-h-screen bg-[#131315]">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-[#27272A] bg-[#1c1b1d]">
        <div className="machine-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="font-tech text-[13px] uppercase tracking-[0.3em] text-[#ffb59e]">Services</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#e5e1e4]">
            New <span className="text-[#ff571a]">Turbos</span>
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#c6c6cf]">
            Brand new OEM turbochargers from all leading manufacturers at highly competitive prices.
            Send us your best quote and we will beat it by 10%.
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
              ✉ Get a Quote
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
                OEM-Grade Replacement Turbos
              </h2>
              <div className="space-y-5 text-[16px] leading-8 text-[#c6c6cf]">
                <p>
                  Ace Turbo supplies brand new OEM turbochargers from all the leading turbo
                  manufacturers at very competitive prices. Whether you need a replacement for a
                  passenger car, a commercial vehicle, or heavy plant machinery, we have access to the
                  full range.
                </p>
                <p>
                  Tell us the best price you have been quoted and we will beat it by{" "}
                  <span className="font-semibold text-[#ff571a]">10%</span>. Call us with your
                  requirements on{" "}
                  <a href="tel:01279-817451" className="font-semibold text-[#ff571a] hover:underline">
                    01279-817451
                  </a>{" "}
                  or send an email with the details.
                </p>
              </div>
            </section>

            {/* Price Beat promise */}
            <div className="relative overflow-hidden border border-[#ff571a] bg-[#1c1b1d] p-8">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#ff571a]/10 blur-2xl" aria-hidden="true" />
              <p className="font-tech text-[11px] uppercase tracking-[0.26em] text-[#ffb59e]">
                Price Promise
              </p>
              <h2 className="mt-2 font-display text-[2rem] uppercase text-[#e5e1e4]">
                We Beat Any Price by{" "}
                <span className="text-[#ff571a]">10%</span>
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-7 text-[#c6c6cf]">
                Let us have the best price you&apos;ve been quoted elsewhere. We will supply the same
                OEM turbocharger — and beat that price by 10%. Call or email us to claim.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="tel:01279-817451"
                  className="inline-flex items-center bg-[#ff571a] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#3a0b00] transition hover:brightness-110"
                >
                  Call to Claim
                </a>
              </div>
            </div>

            {/* Manufacturers Supported */}
            <section>
              <h2 className="mb-6 font-display text-[1.75rem] uppercase text-[#e5e1e4]">
                Manufacturers We <span className="text-[#ff571a]">Supply</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {brands.map((b) => (
                  <div
                    key={b.name}
                    className="flex items-center gap-4 border border-[#27272A] bg-[#201f22] p-5 transition hover:border-[#ff571a]/30"
                  >
                    <div className="h-10 w-10 flex-shrink-0 rounded-[2px] bg-[#ff571a]/10 flex items-center justify-center">
                      <span className="font-display text-[11px] font-extrabold uppercase text-[#ff571a]">
                        {b.name.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-tech text-[13px] uppercase tracking-[0.18em] text-[#e5e1e4]">
                        {b.name}
                      </h3>
                      <p className="mt-1 text-[12px] leading-5 text-[#929090]">{b.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Trade & Retail */}
            <div className="border-l-2 border-[#ff571a] bg-[#1c1b1d] p-6">
              <p className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
                Trade &amp; Retail
              </p>
              <p className="mt-3 text-[16px] leading-7 text-[#c6c6cf]">
                We supply new turbos to both trade workshops and private customers. Trade accounts are
                available with preferential pricing — contact us or visit our{" "}
                <Link href="/b2b" className="font-semibold text-[#ff571a] hover:underline">
                  B2B Dealer Portal
                </Link>{" "}
                to apply.
              </p>
            </div>

            {/* CTA */}
            <section className="border border-[#27272A] bg-[#201f22] p-8">
              <h3 className="mb-3 font-display text-2xl uppercase text-[#e5e1e4]">
                Find Your New Turbo
              </h3>
              <p className="mb-6 text-[16px] leading-7 text-[#c6c6cf]">
                Use your vehicle registration, turbo part number or make/model/engine to get a precise
                quote. We usually respond within 24 hours.
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
                  Email for Quote
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

            <div className="border border-[#ff571a] bg-[#1c1b1d] p-6">
              <p className="font-tech text-[10px] uppercase tracking-[0.24em] text-[#ffb59e]">
                Price Promise
              </p>
              <p className="mt-2 font-display text-[1.5rem] uppercase text-[#e5e1e4]">
                Beat by <span className="text-[#ff571a]">10%</span>
              </p>
              <p className="mt-2 text-[13px] leading-6 text-[#929090]">
                Send us any competitor quote — we&apos;ll beat it.
              </p>
              <a
                href="tel:01279-817451"
                className="mt-4 block w-full bg-[#ff571a] py-3 text-center font-tech text-[12px] uppercase tracking-[0.2em] text-[#3a0b00] transition hover:brightness-110"
              >
                01279-817451
              </a>
            </div>

            <div className="border border-[#27272A] bg-[#1c1b1d] p-6">
              <h4 className="mb-3 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
                Why New OEM?
              </h4>
              <ul className="space-y-3">
                {[
                  "Full manufacturer warranty",
                  "OEM-identical spec",
                  "No old worn components",
                  "Immediate performance",
                  "Trade accounts available",
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
