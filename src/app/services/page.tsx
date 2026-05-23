export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Ace Turbo — Turbo Repairs, Remanufacturing & More",
  description:
    "Ace Turbo offers the complete range of turbocharger services — repairs using Melett parts, remanufactured units with new CHRA, fitting, parts supply and new OEM turbos.",
};

const services = [
  {
    href: "/services/turbo-repairs",
    label: "Turbo Repairs",
    tag: "01",
    summary:
      "Professional turbo repairs using Melett components and a Cimat 48-twin balancing machine. Every repair includes a full balancing report.",
    bullets: ["Melett components only", "Flow-rig tested post-repair", "Price ceiling guarantee"],
  },
  {
    href: "/services/remanufactured",
    label: "Remanufactured Turbos",
    tag: "02",
    summary:
      "Our remanufactured turbos include a brand-new CHRA — not repaired old cores. Every unit comes with a 2-year warranty.",
    bullets: ["New CHRA fitted", "2-year warranty", "Competitive pricing"],
  },
  {
    href: "/services/turbo-fitting",
    label: "Turbo Fitting",
    tag: "03",
    summary:
      "Supply & fit service for workshops and private customers. Having us fit your turbo extends your warranty to cover removal and refitting costs.",
    bullets: ["Fitted by specialists", "Supply & fit pricing", "Extended warranty"],
  },
  {
    href: "/services/turbo-parts",
    label: "Turbo Parts",
    tag: "04",
    summary:
      "From a single turbine shaft nut to a complete Melett repair kit — our comprehensive range covers almost every aspect of the turbocharger.",
    bullets: ["Melett-grade quality", "All major brands", "Trade & retail supply"],
  },
  {
    href: "/services/new-turbos",
    label: "New Turbos",
    tag: "05",
    summary:
      "Brand new OEM turbochargers from Garrett, BorgWarner, IHI, Mitsubishi and more. Send us your best quote and we'll beat it by 10%.",
    bullets: ["All major OEM brands", "10% price-beat promise", "Trade accounts available"],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="machine-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="font-tech text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">What We Do</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#0f172a]">
            Our <span className="text-[#0868a8]">Services</span>
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#475569]">
            A complete range of turbocharger services — from a precision repair to a brand-new
            OEM unit. All work carried out to professional workshop standards.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
        <div className="grid gap-5">
          {services.map((svc) => (
            <Link
              key={svc.href}
              href={svc.href}
              className="group grid grid-cols-1 border border-slate-200 bg-white transition hover:border-[#0868a8]/40 hover:shadow-md md:grid-cols-[80px_1fr_auto]"
            >
              {/* Tag */}
              <div className="flex items-center justify-center border-b border-slate-200 bg-slate-50 px-6 py-5 md:border-b-0 md:border-r">
                <span className="font-tech text-[10px] uppercase tracking-[0.26em] text-[#0868a8]">
                  {svc.tag}
                </span>
              </div>

              {/* Content */}
              <div className="px-6 py-6 md:py-7">
                <h2 className="font-display text-[1.5rem] uppercase text-[#0f172a] transition group-hover:text-[#0868a8]">
                  {svc.label}
                </h2>
                <p className="mt-2 max-w-2xl text-[14px] leading-7 text-[#64748b]">{svc.summary}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {svc.bullets.map((b) => (
                    <span
                      key={b}
                      className="border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 font-tech text-[10px] uppercase tracking-[0.16em] text-[#0868a8]"
                    >
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden items-center justify-center px-6 md:flex">
                <span className="text-[1.5rem] text-[#cbd5e1] transition group-hover:text-[#0868a8]">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="font-tech text-[13px] uppercase tracking-[0.26em] text-[#0868a8]">
                Not Sure Which Service?
              </p>
              <h2 className="mt-2 font-display text-[2rem] uppercase text-[#0f172a]">
                Talk to <span className="text-[#0868a8]">Our Team</span>
              </h2>
              <p className="mt-3 text-[16px] leading-7 text-[#475569]">
                Our technicians will advise you on whether a repair, remanufacture or new unit
                is the most cost-effective solution for your specific turbo failure.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <a
                href="tel:01279-817451"
                className="flex items-center justify-between border border-slate-200 bg-white px-6 py-4 transition hover:border-[#0868a8]/40 hover:shadow-sm"
              >
                <div>
                  <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#64748b]">Phone</p>
                  <p className="mt-1 font-display text-xl text-[#0f172a]">01279-817451</p>
                </div>
                <span className="text-[#0868a8]">→</span>
              </a>
              <a
                href="mailto:contact@aceturbo.co.uk"
                className="flex items-center justify-between border border-slate-200 bg-white px-6 py-4 transition hover:border-[#0868a8]/40 hover:shadow-sm"
              >
                <div>
                  <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#64748b]">Email</p>
                  <p className="mt-1 font-display text-xl text-[#0f172a]">contact@aceturbo.co.uk</p>
                </div>
                <span className="text-[#0868a8]">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
