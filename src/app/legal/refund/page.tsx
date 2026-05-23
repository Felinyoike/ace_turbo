export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund & Cancellations | Ace Turbo",
  description:
    "Refund and cancellation policy for Ace Turbo — conditions, timelines and how to return goods.",
};

const returnCriteria = [
  "The packaging has not been damaged.",
  "You inform us in writing within 7 days of receiving the goods.",
  "Parts have not been installed or fitted.",
  "You return the goods via a secure method.",
  "You notify us in writing (email) why you are sending the goods back.",
  "We will refund your money as soon as we have inspected the goods, minus delivery charges.",
];

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Legal</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            Refund &amp; <span className="text-[#0868a8]">Cancellations</span>
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#475569]">
            We are happy to take returns provided they meet the criteria below. Please read this
            policy carefully before making a purchase.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-[13px]">
            <Link href="/legal/business-policy" className="text-[#0868a8] hover:underline">
              Business Policy &rarr;
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/legal/delivery-policy" className="text-[#0868a8] hover:underline">
              Delivery Policy &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          {/* Main content */}
          <div className="space-y-10">
            <div className="border-l-2 border-[#bfdbfe] pl-6">
              <h2 className="mb-4 text-[18px] font-bold uppercase tracking-wide text-[#0f172a]">
                Refund Policy
              </h2>
              <p className="mb-5 text-[15px] font-semibold leading-7 text-[#0f172a]">
                We are happy to take returns provided they meet all of the following criteria:
              </p>
              <ul className="space-y-3">
                {returnCriteria.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-7 text-[#475569]">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact prompt */}
            <div className="border border-[#bfdbfe] bg-[#eff6ff] px-6 py-5">
              <p className="text-[14px] font-semibold text-[#054b7f]">
                To initiate a return, please contact us by email at{" "}
                <a href="mailto:contact@aceturbo.co.uk" className="underline hover:text-[#0868a8]">
                  contact@aceturbo.co.uk
                </a>{" "}
                or call us on{" "}
                <a href="tel:01279-817451" className="underline hover:text-[#0868a8]">
                  01279-817451
                </a>.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-slate-200 bg-[#f8fafc] p-6">
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#0868a8]">Legal Pages</p>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <Link href="/legal/business-policy" className="text-[#475569] hover:text-[#0868a8] transition-colors">
                    Business Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/delivery-policy" className="text-[#475569] hover:text-[#0868a8] transition-colors">
                    Delivery Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/refund" className="font-semibold text-[#0868a8]">
                    Refund &amp; Cancellations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="border border-slate-200 bg-white p-6">
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#0868a8]">Contact Us</p>
              <a href="tel:01279-817451" className="block text-[15px] font-semibold text-[#0f172a] hover:text-[#0868a8] transition-colors">
                📞 01279-817451
              </a>
              <a href="mailto:contact@aceturbo.co.uk" className="mt-2 block text-[14px] text-[#475569] hover:text-[#0868a8] transition-colors">
                contact@aceturbo.co.uk
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
