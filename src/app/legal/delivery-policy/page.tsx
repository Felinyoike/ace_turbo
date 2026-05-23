export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delivery Policy | Ace Turbo",
  description:
    "Delivery times, couriers and shipping conditions for Ace Turbo — UK Mainland and international.",
};

const deliveryPoints = [
  "Fast delivery: 1 working day.",
  "Normal delivery: up to 3 working days.",
  "Europe and international: up to 2 weeks.",
  "All orders paid before 3 PM (Monday to Friday) will be dispatched same day, excluding weekends and bank holidays.",
  "We try to get all orders delivered next day when selected, but this is not a condition of sale.",
  "We reserve the right to cancel any sale if the customer has selected incorrect postage for their location.",
  "If you live in the Highlands, Islands or Northern Ireland, please contact us first for a postage quote.",
  "You must inspect the packaging BEFORE signing for the goods and make appropriate comments when signing.",
  "We can deliver to destinations outside Mainland UK — please contact us for a postage and packaging quote first.",
];

export default function DeliveryPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Legal</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            Delivery <span className="text-[#0868a8]">Policy</span>
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#475569]">
            The following delivery policy refers to UK Mainland only. All delivery periods given
            are done so in good faith and are not guaranteed.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-[13px]">
            <Link href="/legal/business-policy" className="text-[#0868a8] hover:underline">
              Business Policy &rarr;
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/legal/refund" className="text-[#0868a8] hover:underline">
              Refund &amp; Cancellations &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          {/* Main content */}
          <div className="space-y-10">
            {/* Notice */}
            <div className="border border-[#bfdbfe] bg-[#eff6ff] px-6 py-5">
              <p className="text-[14px] font-semibold text-[#054b7f]">
                Please do not purchase anything before consulting us if you absolutely must have
                it by a set time. Delivery times are based on the service selected but are not
                guaranteed as the delivery aspect is outside our control.
              </p>
            </div>

            {/* Courier */}
            <div className="border-l-2 border-[#bfdbfe] pl-6">
              <h2 className="mb-3 text-[18px] font-bold uppercase tracking-wide text-[#0f172a]">
                Our Courier
              </h2>
              <p className="text-[15px] leading-7 text-[#475569]">
                We ship all orders via <span className="font-semibold text-[#0f172a]">Federal Express</span>.
              </p>
            </div>

            {/* Delivery conditions */}
            <div className="border-l-2 border-[#bfdbfe] pl-6">
              <h2 className="mb-4 text-[18px] font-bold uppercase tracking-wide text-[#0f172a]">
                Delivery Conditions
              </h2>
              <ul className="space-y-3">
                {deliveryPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-7 text-[#475569]">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Important notice */}
            <div className="border border-[#bfdbfe] bg-[#eff6ff] px-6 py-5">
              <p className="text-[14px] font-bold uppercase tracking-wide text-[#054b7f]">
                You must sign for damaged parcels accordingly.
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
                  <Link href="/legal/delivery-policy" className="font-semibold text-[#0868a8]">
                    Delivery Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/refund" className="text-[#475569] hover:text-[#0868a8] transition-colors">
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
