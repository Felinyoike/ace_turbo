export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Franchise Opportunities | Ace Turbo — Join the UK's Leading Turbo Franchise",
  description:
    "Ace Turbo is expanding across the UK. Join us as a franchisee in the fast-growing turbo remanufacturing sector. Investment from £50k–£65k. No prior mechanical experience needed.",
};

const packageItems = [
  "The right to use the Ace Turbo trademarks and brand.",
  "Access to our extensive technical data, pricing, and support network.",
  "The complete Ace Turbo system for remanufacturing, marketing and selling turbo products.",
  "Access to our proprietary information, specifications, know-how and confidential data.",
  "Office admin PC & printer.",
  "Basic remanufacturing core stock to get started.",
  "Signage and branded marketing materials.",
  "Machinery required to remanufacture turbochargers — including flow rigs, compressors, blasting equipment, parts cleaning machinery, work benches and tools.",
  "Initial marketing support prior to opening your operation.",
  "All fixtures, fittings and machinery included in the turnkey package.",
];

const idealTraits = [
  "Excellent interpersonal and people management skills",
  "Drive, enthusiasm and a can-do attitude",
  "Willingness to be hands-on — from building turbos to administration",
  "Business acumen or prior owner-operator experience",
  "Dedication to a proven operational system",
];

const stats = [
  { value: "£15B", label: "Worldwide turbo market by 2021" },
  { value: "30%", label: "Typical cost to reman vs new turbo" },
  { value: "12M+", label: "Diesel cars registered in UK" },
  { value: "10yr", label: "Initial franchise agreement term" },
];

export default function FranchisePage() {
  return (
    <main className="min-h-screen bg-[#131315]">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#27272A] bg-[#1c1b1d]">
        <div className="machine-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#ff571a]/8 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-20 md:px-12">
          <p className="font-tech text-[13px] uppercase tracking-[0.3em] text-[#ffb59e]">
            Business Opportunity
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#e5e1e4]">
            Franchise <br /><span className="text-[#ff571a]">Opportunities</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-8 text-[#c6c6cf]">
            Ace Turbo is expanding — and we&apos;d love you to join us. We are looking for
            enthusiastic business partners to operate turbo remanufacturing franchises across
            the UK.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:01279-817451"
              className="inline-flex items-center gap-2 bg-[#ff571a] px-7 py-3.5 font-tech text-[12px] uppercase tracking-[0.22em] text-[#3a0b00] transition hover:brightness-110"
            >
              📞 Enquire Now — 01279-817451
            </a>
            <a
              href="mailto:contact@aceturbo.co.uk"
              className="inline-flex items-center gap-2 border border-[#ad897e] px-7 py-3.5 font-tech text-[12px] uppercase tracking-[0.22em] text-[#e5e1e4] transition hover:bg-white/5"
            >
              ✉ Email Your Interest
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-[#27272A] bg-[#0e0e10]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-[#27272A] px-4 md:grid-cols-4 md:px-12">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-8 text-center">
              <div className="font-display text-[2.2rem] font-extrabold text-[#ff571a]">{s.value}</div>
              <div className="mt-1 font-tech text-[10px] uppercase tracking-[0.2em] text-[#929090]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">

          {/* Main Content */}
          <div className="space-y-14">

            {/* The Opportunity */}
            <section>
              <h2 className="mb-2 font-tech text-[13px] uppercase tracking-[0.26em] text-[#ff571a]">
                Grab a Slice of the Action
              </h2>
              <h3 className="mb-5 font-display text-[2rem] uppercase text-[#e5e1e4]">
                The Market Opportunity
              </h3>
              <div className="space-y-5 text-[16px] leading-8 text-[#c6c6cf]">
                <p>
                  Ace Turbo&apos;s tried-and-tested formula, combined with an established team
                  with many years of experience in the turbo industry, means a solid foundation for
                  a very promising future. We are now looking for motivated individuals who want to
                  change their lives.
                </p>
                <p>
                  The worldwide turbo market is set to reach a record <strong className="text-[#e5e1e4]">$15 billion</strong> in value.
                  Since the first UK franchise was opened in the Autumn of 2013 it has been a
                  tremendous success. Prospects for the right people are outstanding — the cost to
                  remanufacture a turbo is typically <strong className="text-[#e5e1e4]">30% of the cost of a new turbo</strong>,
                  and sometimes as low as 10%.
                </p>
                <p>
                  The turbo remanufacturing sector is one of the fastest growing sectors of the
                  auto parts industry. With the rising cost of fuel, manufacturers have developed an
                  ever-increasing range of diesel vehicles — from 500 cc city cars to 6,000 cc
                  trucks. Every one of them has a turbocharger.
                </p>
                <p>
                  There are currently over <strong className="text-[#e5e1e4]">12 million diesel cars</strong> registered in
                  the UK. Combined with legally binding EU-wide CO₂ emission targets pushing
                  manufacturers toward turbocharged engines, the demand for turbo repairs and
                  remanufacturing continues to grow year on year.
                </p>
              </div>
            </section>

            {/* Training & Support */}
            <section>
              <h2 className="mb-2 font-tech text-[13px] uppercase tracking-[0.26em] text-[#ff571a]">
                Training &amp; Support
              </h2>
              <h3 className="mb-5 font-display text-[2rem] uppercase text-[#e5e1e4]">
                We Set You Up for Success
              </h3>
              <div className="space-y-5 text-[16px] leading-8 text-[#c6c6cf]">
                <p>
                  You will receive in-depth initial training held at our training centre in
                  Stansted, Essex. This incorporates both classroom and practical work until you
                  feel confident in all aspects of the turbo remanufacturing process.
                </p>
                <p>
                  Once you feel confident enough to start running your own operation, we will still
                  offer a dedicated technician who can stay at your workshop to assist with any
                  issues during your first week.
                </p>
                <p>
                  Further training courses are available to franchisees and team members on an
                  ongoing basis. Extensive and continuous support from a dedicated franchise
                  business manager covers recruiting, training, marketing, product control, pricing
                  and other operational areas.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { icon: "⚙", label: "Classroom Training", desc: "In-depth theory at our Stansted training centre." },
                  { icon: "🔧", label: "Practical Workshop", desc: "Hands-on remanufacturing until you&apos;re confident." },
                  { icon: "👤", label: "First-Week Technician", desc: "A dedicated technician with you at launch." },
                  { icon: "📊", label: "Ongoing Support", desc: "Business manager support for marketing, pricing and ops." },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 border border-[#27272A] bg-[#1c1b1d] p-5">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-tech text-[12px] uppercase tracking-[0.18em] text-[#e5e1e4]">{item.label}</h4>
                      <p className="mt-1 text-[13px] leading-6 text-[#929090]" dangerouslySetInnerHTML={{ __html: item.desc }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Who's Ideal */}
            <section>
              <h2 className="mb-2 font-tech text-[13px] uppercase tracking-[0.26em] text-[#ff571a]">
                The Ideal Candidate
              </h2>
              <h3 className="mb-5 font-display text-[2rem] uppercase text-[#e5e1e4]">
                Who&apos;s Right for This?
              </h3>
              <div className="mb-6 space-y-4 text-[16px] leading-8 text-[#c6c6cf]">
                <p>
                  We are looking for individuals, couples or business partnerships with exceptional
                  interpersonal and people skills. These are essential as you&apos;ll be dealing
                  with customers and leading your team on a daily basis.
                </p>
                <p>
                  The Ace Turbo franchise model has been deliberately designed so that a previous
                  mechanical or engineering background is{" "}
                  <strong className="text-[#e5e1e4]">not required</strong>. Anyone from an office
                  worker to a builder can build a turbo after just one day of training.
                </p>
                <p>
                  The most successful franchisees are entrepreneurial owner-operators with excellent
                  people skills. Being an Ace Turbo franchisee is a challenge that calls for
                  initiative, determination and dedication — but it is personally, professionally
                  and financially rewarding.
                </p>
              </div>
              <ul className="space-y-3">
                {idealTraits.map((trait) => (
                  <li key={trait} className="flex items-start gap-3 text-[15px] leading-7 text-[#c6c6cf]">
                    <span className="mt-1 flex-shrink-0 text-[#ff571a]">✓</span>
                    {trait}
                  </li>
                ))}
              </ul>
            </section>

            {/* Financial Information */}
            <section>
              <h2 className="mb-2 font-tech text-[13px] uppercase tracking-[0.26em] text-[#ff571a]">
                Financial Information
              </h2>
              <h3 className="mb-5 font-display text-[2rem] uppercase text-[#e5e1e4]">
                Your Investment
              </h3>
              <div className="mb-8 space-y-5 text-[16px] leading-8 text-[#c6c6cf]">
                <p>
                  The total investment typically ranges between{" "}
                  <strong className="text-[#e5e1e4]">£50,000 and £65,000</strong>, of which{" "}
                  <strong className="text-[#e5e1e4]">£10,000 should be in liquid funds</strong>. The
                  exact figure varies depending on your chosen site, building costs and the franchise
                  package agreed.
                </p>
                <p>
                  The initial agreement is for <strong className="text-[#e5e1e4]">10 years</strong>,
                  and is renewable by the franchisee subject to lease and other considerations.
                </p>
              </div>

              {/* Franchise Fee callout */}
              <div className="mb-8 border border-[#ff571a]/40 bg-[#1c1b1d] p-6">
                <p className="mb-2 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
                  No Franchise Fee
                </p>
                <p className="text-[15px] leading-7 text-[#c6c6cf]">
                  Currently there is <strong className="text-[#e5e1e4]">no franchise fee</strong>.
                  Every penny of your investment is used for machinery and stock to kit out your
                  chosen workshop — giving you a complete turnkey operation from day one. A small
                  portion goes towards administration including IT systems.
                </p>
              </div>

              {/* Package items */}
              <h4 className="mb-5 font-display text-[1.4rem] uppercase text-[#e5e1e4]">
                The Franchise <span className="text-[#ff571a]">Package</span>
              </h4>
              <div className="space-y-3">
                {packageItems.map((item, i) => (
                  <div key={i} className="flex gap-4 border border-[#27272A] bg-[#201f22] px-5 py-4">
                    <span className="flex-shrink-0 font-tech text-[11px] text-[#ff571a]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] leading-6 text-[#c6c6cf]">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Territories */}
            <div className="border-l-2 border-[#ff571a] bg-[#1c1b1d] p-6">
              <p className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
                Territory Availability
              </p>
              <p className="mt-3 text-[16px] leading-7 text-[#c6c6cf]">
                Territories are assigned on an exclusive first-come basis. If you have a particular
                geographic area in mind, contact us and we will let you know immediately whether it
                is available.
              </p>
            </div>

            {/* CTA Section */}
            <section className="relative overflow-hidden border border-[#27272A] bg-[#201f22] p-10">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#ff571a]/8 blur-3xl" aria-hidden="true" />
              <h3 className="mb-2 font-display text-[2rem] uppercase text-[#e5e1e4]">
                What Do I Do <span className="text-[#ff571a]">Next?</span>
              </h3>
              <p className="mb-6 text-[16px] leading-7 text-[#c6c6cf]">
                If you have any questions, call us on 01279-817451 and we will be happy to answer
                them. Alternatively, send us an email with your background and the area you are
                interested in and we will get back to you promptly.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:01279-817451"
                  className="inline-flex items-center gap-2 bg-[#ff571a] px-7 py-3.5 font-tech text-[12px] uppercase tracking-[0.22em] text-[#3a0b00] transition hover:brightness-110"
                >
                  Call 01279-817451
                </a>
                <a
                  href="mailto:contact@aceturbo.co.uk"
                  className="inline-flex items-center gap-2 border border-[#5c4037] px-7 py-3.5 font-tech text-[12px] uppercase tracking-[0.22em] text-[#e5e1e4] transition hover:bg-white/5"
                >
                  Email Your Enquiry
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-[#ff571a] bg-[#1c1b1d] p-6">
              <p className="font-tech text-[10px] uppercase tracking-[0.24em] text-[#ffb59e]">Investment Summary</p>
              <div className="mt-4 space-y-4">
                {[
                  ["Total Investment", "£50,000 – £65,000"],
                  ["Liquid Funds Required", "Min. £10,000"],
                  ["Franchise Fee", "None"],
                  ["Initial Term", "10 Years"],
                  ["Territory", "Exclusive"],
                  ["Prior Experience", "Not Required"],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex items-start justify-between gap-2 border-b border-[#27272A] pb-4 last:border-0 last:pb-0">
                    <span className="text-[12px] text-[#929090]">{label}</span>
                    <span className="text-right font-tech text-[12px] uppercase tracking-[0.1em] text-[#e5e1e4]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#27272A] bg-[#201f22] p-6">
              <h4 className="mb-3 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
                Enquire Today
              </h4>
              <p className="mb-4 text-[13px] leading-6 text-[#929090]">
                Territories are filling fast. Check your area is still available.
              </p>
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
                Why Ace Turbo?
              </h4>
              <ul className="space-y-3">
                {[
                  "No prior experience needed",
                  "Proven franchise model",
                  "Exclusive territory",
                  "Full turnkey setup",
                  "Ongoing head-office support",
                  "Growing market demand",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-[#c6c6cf]">
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
