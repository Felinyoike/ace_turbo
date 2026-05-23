export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Turbo Repairs | Ace Turbo — Professional Workshop-Grade Service",
  description:
    "Professional turbocharger repairs using Melett components and a triple-axis balancing machine. Every repair comes with a balancing report. Call 01279-817451.",
};

const repairPoints = [
  "We use Melett turbo components exclusively — the industry gold standard.",
  "We replace ALL components inside the turbine unit, not just the faulty parts.",
  "Every repair includes a full balancing report to prove professional-grade completion.",
  "We set a ceiling on repair costs. If a repair exceeds the price of a remanufactured unit, we always advise you first.",
  "We possess both a balancing machine and a flow rig for post-repair testing.",
];

const warningPoints = [
  "Many companies claim to repair turbos but lack the required balancing machinery.",
  "Some operators work from garden sheds or as a garage side-project.",
  "Not all turbos can be repaired — and costs can rise if initial damage assessment is incomplete.",
  "Always verify that the company you choose has genuine professional equipment.",
];

export default function TurboRepairsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="machine-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="font-tech text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Services</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#0f172a]">
            Turbo <span className="text-[#0868a8]">Repairs</span>
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#475569]">
            Workshop-grade turbo repairs using industry-leading Melett components, triple-axis
            balancing and a flow rig. Every job comes with a full balancing report.
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
              ✉ Email Us
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">

          {/* Main Content */}
          <div className="space-y-12">

            {/* Our Services intro */}
            <section>
              <h2 className="mb-5 font-tech text-[13px] uppercase tracking-[0.26em] text-[#0868a8]">
                Our Services
              </h2>
              <div className="space-y-5 text-[16px] leading-8 text-[#475569]">
                <p>
                  Turbo repairs are an excellent way to save money and get your car back on the road
                  as quickly and economically as possible — provided the turbo company has a balancing
                  machine and flow rig to test the repair once the work has been completed.
                </p>
                <p>
                  As a professional turbo remanufacturer, we can only advise our customers on the best
                  course of action to help them strike a balance between quality and value for money.
                  To ensure we give our customers the best possible service, we only use{" "}
                  <span className="font-semibold text-[#0f172a]">Melett turbo components</span> in
                  our repairs.
                </p>
                <p>
                  We change everything inside the turbine unit — not just the faulty components. This
                  means all components are of the same age and will all last a similar time.
                </p>
              </div>
            </section>

            {/* Balancing Machine callout */}
            <div className="relative overflow-hidden border border-slate-200 bg-[#f8fafc] p-8">
              <div className="absolute right-0 top-0 h-24 w-24 -translate-y-10 translate-x-10 rotate-45 bg-[#0868a8]/8" aria-hidden="true" />
              <p className="mb-2 font-tech text-[10px] uppercase tracking-[0.26em] text-[#0868a8]">
                Equipment
              </p>
              <h3 className="font-display text-2xl uppercase text-[#0f172a]">Our Balancing Machine</h3>
              <p className="mt-3 text-[15px] leading-7 text-[#475569]">
                We operate a Cimat 48 twin balancing machine — the same equipment used by professional
                turbo remanufacturers worldwide. After every repair, we run a full flow-rig test and
                issue a printed balancing report.
              </p>
            </div>

            {/* What Makes Our Repair */}
            <section>
              <h2 className="mb-6 font-display text-[1.75rem] uppercase text-[#0f172a]">
                What Makes Our Repair <span className="text-[#0868a8]">Different</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {repairPoints.map((point, i) => (
                  <div
                    key={i}
                    className="flex gap-4 border border-slate-200 bg-white p-5 hover:shadow-sm transition-shadow"
                  >
                    <span className="mt-0.5 flex-shrink-0 text-[#0868a8]">✓</span>
                    <p className="text-[15px] leading-7 text-[#475569]">{point}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Melett repair kit */}
            <div className="border-l-2 border-[#0868a8] bg-[#eff6ff] p-6">
              <p className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#0868a8]">
                Component Quality
              </p>
              <p className="mt-3 text-[16px] leading-7 text-[#475569]">
                A typical Melett repair kit includes a comprehensive set of components covering the
                bearing housing, turbine shaft, seals, bearings, compressor wheel and back plate. We
                source these kits specifically to ensure every repair lasts.
              </p>
            </div>

            {/* Pricing transparency */}
            <section>
              <h2 className="mb-5 font-display text-[1.75rem] uppercase text-[#0f172a]">
                Honest <span className="text-[#0868a8]">Pricing</span>
              </h2>
              <p className="text-[16px] leading-7 text-[#475569]">
                A typical turbine unit has many components that could be damaged — and this is always
                the unknown element that can make the price of a repair increase. To help ensure that a
                repair price will not spiral, we set a ceiling. If we see that a turbo repair will cost
                more than the price of a remanufactured turbo, we will always advise you and let you
                decide before any additional work is carried out.
              </p>
            </section>

            {/* Be Aware warning */}
            <section className="border border-[#bfdbfe] bg-[#eff6ff] p-8">
              <h3 className="mb-4 font-display text-xl uppercase text-[#0868a8]">Be Aware!</h3>
              <p className="mb-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#334155]">
                Not all turbo repair companies are equal. Protect yourself:
              </p>
              <ul className="space-y-3">
                {warningPoints.map((point, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-7 text-[#475569]">
                    <span className="mt-1 flex-shrink-0 text-[#0868a8]">⚠</span>
                    {point}
                  </li>
                ))}
              </ul>
            </section>

            {/* Book CTA */}
            <section className="border border-slate-200 bg-[#f8fafc] p-8">
              <h3 className="mb-3 font-display text-2xl uppercase text-[#0f172a]">
                Book a Turbo Repair
              </h3>
              <p className="mb-6 text-[16px] leading-7 text-[#475569]">
                You can book a turbo repair with us confident in the knowledge that we will provide a
                honest and professional service. Call us or send an email to discuss your requirements
                and get a quote.
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
                  Email Us
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
              <p className="mb-4 text-[14px] leading-6 text-[#475569]">
                Get a free repair quote or send your registration to begin.
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
                Why Ace Turbo?
              </h4>
              <ul className="space-y-3">
                {[
                  "Melett components only",
                  "Full balancing report",
                  "Price ceiling guarantee",
                  "Flow-rig tested",
                  "24h quote response",
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
