export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Turbo Fitting | Ace Turbo — Supply & Fit by Specialists",
  description: "Comprehensive turbo fitting service for workshops and private customers. Supply & fit pricing with extended warranty. Call 01279-817451.",
};

const benefits = [
  { title: "Fitted by Specialists", desc: "Carried out by a dedicated turbo specialist." },
  { title: "More Economical", desc: "The supply & fit element allows the overall cost to be reduced." },
  { title: "Extended Warranty", desc: "Warranty extended to cover removal and refitting costs if the turbo fails." },
];

export default function TurboFittingPage() {
  return (
    <main className="min-h-screen bg-[#131315]">
      <section className="relative overflow-hidden border-b border-[#27272A] bg-[#1c1b1d]">
        <div className="machine-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="font-tech text-[13px] uppercase tracking-[0.3em] text-[#ffb59e]">Services</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#e5e1e4]">
            Turbo <span className="text-[#ff571a]">Fitting</span>
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#c6c6cf]">
            Comprehensive turbo fitting by turbo specialists — supply &amp; fit pricing with an extended warranty for complete peace of mind.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="tel:01279-817451" className="inline-flex items-center gap-2 bg-[#ff571a] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#3a0b00] transition hover:brightness-110">
              📞 Get a Fitting Quote
            </a>
            <a href="mailto:contact@aceturbo.co.uk" className="inline-flex items-center gap-2 border border-[#ad897e] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#e5e1e4] transition hover:bg-white/5">
              ✉ Email Us
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <div className="space-y-12">
            <section>
              <h2 className="mb-5 font-tech text-[13px] uppercase tracking-[0.26em] text-[#ff571a]">Supply &amp; Fit Service</h2>
              <div className="space-y-5 text-[16px] leading-8 text-[#c6c6cf]">
                <p>We provide a comprehensive turbo fitting service for customers who wish to have the job done by a specialist. Whether you are a private customer or a professional workshop, our team can supply the right turbocharger and fit it correctly.</p>
                <p>If you would like a quote on a supply &amp; fit basis, please call us on <a href="tel:01279-817451" className="font-semibold text-[#ff571a] hover:underline">01279-817451</a> or send us an email with your vehicle details.</p>
              </div>
            </section>

            <section>
              <h2 className="mb-6 font-display text-[1.75rem] uppercase text-[#e5e1e4]">Benefits of Letting <span className="text-[#ff571a]">Us Fit It</span></h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {benefits.map((b, i) => (
                  <div key={b.title} className="flex flex-col gap-4 border border-[#27272A] bg-[#1c1b1d] p-6">
                    <span className="font-display text-[2.5rem] font-extrabold leading-none text-[#ff571a]/30">0{i + 1}</span>
                    <h3 className="font-tech text-[13px] uppercase tracking-[0.18em] text-[#e5e1e4]">{b.title}</h3>
                    <p className="text-[14px] leading-6 text-[#929090]">{b.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="border-l-2 border-[#ff571a] bg-[#1c1b1d] p-6">
              <p className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">Warranty Advantage</p>
              <p className="mt-3 text-[16px] leading-7 text-[#c6c6cf]">When we supply and fit your turbocharger, your warranty is extended to cover removal and refitting costs in the event of a fault during the warranty period — a significant advantage over purchasing the part alone.</p>
            </div>

            <section className="border border-[#27272A] bg-[#201f22] p-8">
              <h3 className="mb-3 font-display text-2xl uppercase text-[#e5e1e4]">Get a Supply &amp; Fit Quote</h3>
              <p className="mb-6 text-[16px] leading-7 text-[#c6c6cf]">Call us on 01279-817451 or send an email. Have your vehicle registration or make/model/engine ready for a faster response.</p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:01279-817451" className="inline-flex items-center gap-2 bg-[#ff571a] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#3a0b00] transition hover:brightness-110">Call 01279-817451</a>
                <a href="mailto:contact@aceturbo.co.uk" className="inline-flex items-center gap-2 border border-[#5c4037] px-6 py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#e5e1e4] transition hover:bg-white/5">Email Us</a>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="border border-[#27272A] bg-[#201f22] p-6">
              <h4 className="mb-4 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">All Services</h4>
              <nav className="space-y-1">
                {[["Turbo Repairs", "/services/turbo-repairs"], ["Remanufactured Turbos", "/services/remanufactured"], ["Turbo Fitting", "/services/turbo-fitting"], ["Turbo Parts", "/services/turbo-parts"], ["New Turbos", "/services/new-turbos"]].map(([label, href]) => (
                  <Link key={href} href={href} className="flex items-center justify-between border border-transparent px-4 py-3 text-[14px] text-[#c6c6cf] transition hover:border-[#27272A] hover:bg-[#1c1b1d] hover:text-[#ffdbd0]">
                    {label}<span className="text-[#ff571a]">→</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border border-[#27272A] bg-[#1c1b1d] p-6">
              <h4 className="mb-3 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">Contact Us</h4>
              <a href="tel:01279-817451" className="block w-full bg-[#ff571a] py-3 text-center font-tech text-[12px] uppercase tracking-[0.2em] text-[#3a0b00] transition hover:brightness-110">01279-817451</a>
              <a href="mailto:contact@aceturbo.co.uk" className="mt-2 block w-full border border-[#5c4037] py-3 text-center font-tech text-[12px] uppercase tracking-[0.2em] text-[#e5e1e4] transition hover:bg-white/5">contact@aceturbo.co.uk</a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
