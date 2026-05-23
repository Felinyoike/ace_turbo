export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Ace Turbo | Turbo Repairs, Parts & Remanufacturing Quotes",
  description:
    "Contact Ace Turbo for quotes on turbo repairs, remanufactured units, new turbos and parts. Based in Stansted, Essex. Call 01279-817451 or email us — 24h response.",
};

const enquiryTypes = [
  "Turbo repair quote",
  "Remanufactured turbo",
  "New OEM turbo",
  "Turbo parts",
  "Turbo fitting",
  "Franchise enquiry",
  "Trade / B2B account",
  "Other",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="machine-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <p className="font-tech text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Get in Touch</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#0f172a]">
            Contact <span className="text-[#0868a8]">Ace Turbo</span>
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-7 text-[#475569]">
            Use the form below for quotes, stock checks, trade enquiries and technical support.
            We guarantee a response within 24 hours.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* Contact Form */}
          <div>
            <h2 className="mb-8 font-tech text-[13px] uppercase tracking-[0.26em] text-[#0868a8]">
              Send an Enquiry
            </h2>
            <form
              method="POST"
              action="/api/contact"
              className="space-y-6"
            >
              {/* Name & Phone */}
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block space-y-2">
                  <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#64748b]">
                    Full Name *
                  </span>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full border-b border-[#bfdbfe] bg-slate-50 px-4 py-3 text-[15px] text-[#0f172a] outline-none transition focus:border-[#0868a8] placeholder:text-[#94a3b8]"
                    placeholder="John Smith"
                  />
                </label>
                <label className="block space-y-2">
                  <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#64748b]">
                    Phone Number *
                  </span>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="w-full border-b border-[#bfdbfe] bg-slate-50 px-4 py-3 text-[15px] text-[#0f172a] outline-none transition focus:border-[#0868a8] placeholder:text-[#94a3b8]"
                    placeholder="07700 900000"
                  />
                </label>
              </div>

              {/* Email */}
              <label className="block space-y-2">
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#64748b]">
                  Email Address *
                </span>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full border-b border-[#bfdbfe] bg-slate-50 px-4 py-3 text-[15px] text-[#0f172a] outline-none transition focus:border-[#0868a8] placeholder:text-[#94a3b8]"
                  placeholder="you@example.com"
                />
              </label>

              {/* Enquiry Type */}
              <label className="block space-y-2">
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#64748b]">
                  Enquiry Type
                </span>
                <select
                  id="contact-type"
                  name="type"
                  className="w-full border-b border-[#bfdbfe] bg-slate-50 px-4 py-3 text-[15px] text-[#0f172a] outline-none transition focus:border-[#0868a8]"
                >
                  <option value="">Select enquiry type…</option>
                  {enquiryTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>

              {/* Vehicle / Reg */}
              <label className="block space-y-2">
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#64748b]">
                  Vehicle / Engine or Turbo Part Number
                </span>
                <input
                  id="contact-vehicle"
                  name="vehicle"
                  type="text"
                  className="w-full border-b border-[#bfdbfe] bg-slate-50 px-4 py-3 text-[15px] text-[#0f172a] outline-none transition focus:border-[#0868a8] placeholder:text-[#94a3b8]"
                  placeholder="e.g. VW Golf 2.0 TDI 2019 / GT1544V"
                />
              </label>

              {/* Message */}
              <label className="block space-y-2">
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#64748b]">
                  Message / Details *
                </span>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  className="min-h-[140px] w-full resize-none border-b border-[#bfdbfe] bg-slate-50 px-4 py-3 text-[15px] text-[#0f172a] outline-none transition focus:border-[#0868a8] placeholder:text-[#94a3b8]"
                  placeholder="Describe your turbo issue, what parts you need, or any other details…"
                />
              </label>

              <button
                id="contact-submit"
                type="submit"
                className="w-full bg-[#0868a8] py-4 font-tech text-[12px] uppercase tracking-[0.26em] text-white transition hover:bg-[#054b7f]"
              >
                Send Enquiry — 24h Response Guaranteed
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">

            {/* Direct contacts */}
            <div className="border border-slate-200 bg-white p-6">
              <h3 className="mb-5 font-tech text-[11px] uppercase tracking-[0.26em] text-[#0868a8]">
                Direct Contact
              </h3>
              <div className="space-y-4">
                <a
                  href="tel:01279-817451"
                  className="flex items-center justify-between border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-[#0868a8]/40"
                >
                  <div>
                    <p className="font-tech text-[10px] uppercase tracking-[0.18em] text-[#64748b]">Phone</p>
                    <p className="mt-0.5 font-display text-[1.25rem] text-[#0f172a]">01279-817451</p>
                  </div>
                  <span className="text-[#0868a8]">→</span>
                </a>
                <a
                  href="mailto:contact@aceturbo.co.uk"
                  className="flex items-center justify-between border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-[#0868a8]/40"
                >
                  <div>
                    <p className="font-tech text-[10px] uppercase tracking-[0.18em] text-[#64748b]">Email</p>
                    <p className="mt-0.5 font-tech text-[13px] tracking-[0.04em] text-[#0f172a]">
                      contact@aceturbo.co.uk
                    </p>
                  </div>
                  <span className="text-[#0868a8]">→</span>
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="border border-slate-200 bg-white p-6">
              <h3 className="mb-4 font-tech text-[11px] uppercase tracking-[0.26em] text-[#0868a8]">
                Our Location
              </h3>
              <div className="space-y-2 text-[14px] leading-7 text-[#475569]">
                <p className="font-semibold text-[#0f172a]">Ace Turbo</p>
                <p>Stansted, Essex</p>
                <p>United Kingdom</p>
              </div>
              <div className="mt-5 border-t border-slate-200 pt-5">
                <p className="font-tech text-[10px] uppercase tracking-[0.18em] text-[#64748b]">
                  Opening Hours
                </p>
                <div className="mt-2 space-y-1 text-[13px] text-[#475569]">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="text-[#0f172a] font-medium">8:30am – 5:30pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-[#0f172a] font-medium">9:00am – 1:00pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-[#94a3b8]">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Response promise */}
            <div className="border border-[#0868a8]/30 bg-[#eff6ff] p-6">
              <div className="mb-2 font-display text-[2rem] font-extrabold text-[#0868a8]">24h</div>
              <p className="font-tech text-[11px] uppercase tracking-[0.22em] text-[#0f172a]">
                Response Guarantee
              </p>
              <p className="mt-2 text-[13px] leading-6 text-[#475569]">
                We guarantee a reply to every enquiry within one business day. For urgent matters,
                call us directly.
              </p>
            </div>

            {/* Social */}
            <div className="border border-slate-200 bg-white p-6">
              <h3 className="mb-4 font-tech text-[11px] uppercase tracking-[0.26em] text-[#0868a8]">
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Facebook", href: "https://www.facebook.com/aceturbo.uk" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/company/aceturbo-uk/" },
                  { label: "Instagram", href: "https://www.instagram.com/ace.turbouk/" },
                  { label: "Twitter / X", href: "https://twitter.com/" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-slate-200 bg-slate-50 px-4 py-3 text-center font-tech text-[10px] uppercase tracking-[0.18em] text-[#475569] transition hover:border-[#0868a8]/30 hover:text-[#0868a8]"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
