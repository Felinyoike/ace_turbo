export const dynamic = "force-dynamic";
import { getSessionUser, isB2B } from "@/lib/auth";
import Link from "next/link";

export default async function B2BPage() {
  const user = await getSessionUser();
  const b2b = isB2B(user);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1080px] px-4 py-14">
          <p className="text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Trade Accounts</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            Dealer <span className="text-[#0868a8]">Portal</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#475569]">
            {b2b
              ? "Your trade account is active. Access preferential pricing, bulk stock, and dedicated support."
              : "Apply for a B2B trade account to unlock wholesale pricing and priority stock access."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1080px] px-4 py-12">
        {b2b && user ? (
          <>
            {/* Welcome Card */}
            <section className="border border-[#bfdbfe] bg-[#eff6ff] p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#0868a8]">Signed in as</p>
              <h2 className="mt-1 text-2xl font-bold text-[#0f172a]">
                {user.firstName} {user.lastName}
                {user.company ? " — " + user.company : ""}
              </h2>
              <p className="mt-1 text-[14px] text-[#475569]">{user.email} · Trade Account</p>
            </section>

            {/* Dashboard Grid */}
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/turbos"
                className="group border border-slate-200 bg-white p-6 transition hover:border-[#0868a8]/40 hover:shadow-sm"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0868a8]">Stock</p>
                <h3 className="mt-2 text-[17px] font-bold text-[#0f172a] group-hover:text-[#0868a8]">Browse Trade Stock</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#475569]">
                  View all turbos with your protected B2B pricing applied automatically.
                </p>
              </Link>
              <Link
                href="/account/orders"
                className="group border border-slate-200 bg-white p-6 transition hover:border-[#0868a8]/40 hover:shadow-sm"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0868a8]">Orders</p>
                <h3 className="mt-2 text-[17px] font-bold text-[#0f172a] group-hover:text-[#0868a8]">Order History</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#475569]">
                  Track dispatch status and view past orders placed through your trade account.
                </p>
              </Link>
              <Link
                href="/account/invoices"
                className="group border border-slate-200 bg-white p-6 transition hover:border-[#0868a8]/40 hover:shadow-sm"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0868a8]">Billing</p>
                <h3 className="mt-2 text-[17px] font-bold text-[#0f172a] group-hover:text-[#0868a8]">Invoices</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#475569]">
                  Download PDF invoices for completed orders and reconcile payments.
                </p>
              </Link>
              <Link
                href="/turbos/brands"
                className="group border border-slate-200 bg-white p-6 transition hover:border-[#0868a8]/40 hover:shadow-sm"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0868a8]">Finder</p>
                <h3 className="mt-2 text-[17px] font-bold text-[#0f172a] group-hover:text-[#0868a8]">Turbo Finder</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#475569]">
                  Identify part numbers by manufacturer brand and data plate reference.
                </p>
              </Link>
              <Link
                href="/account"
                className="group border border-slate-200 bg-white p-6 transition hover:border-[#0868a8]/40 hover:shadow-sm"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0868a8]">Security</p>
                <h3 className="mt-2 text-[17px] font-bold text-[#0f172a] group-hover:text-[#0868a8]">Account Settings</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#475569]">
                  Manage sessions, review active logins, and control device access.
                </p>
              </Link>
              <a
                href="tel:01279-817451"
                className="group border border-slate-200 bg-white p-6 transition hover:border-[#0868a8]/40 hover:shadow-sm"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0868a8]">Support</p>
                <h3 className="mt-2 text-[17px] font-bold text-[#0f172a] group-hover:text-[#0868a8]">Dedicated Trade Line</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#475569]">
                  Priority phone support for B2B accounts — 01279-817451.
                </p>
              </a>
            </div>

            {/* Trade Info */}
            <section className="mt-10 border border-slate-200 bg-white p-6">
              <h2 className="text-[17px] font-bold uppercase tracking-wide text-[#0f172a]">Trade Account Benefits</h2>
              <ul className="mt-4 grid gap-3 text-[15px] leading-7 text-[#475569] md:grid-cols-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                  Protected wholesale pricing on all turbo units
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                  Priority dispatch — orders before 3 PM ship same day
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                  Dedicated account manager and trade support line
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                  Access to signed product data exports
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                  Net 30 payment terms available on approval
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                  Bulk quantity discounts on 5+ units
                </li>
              </ul>
            </section>
          </>
        ) : (
          <>
            {/* Non-B2B user — upgrade prompt */}
            <section className="border border-slate-200 bg-white p-8">
              <h2 className="text-2xl font-bold text-[#0f172a]">Request Trade Account Access</h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#475569]">
                The dealer portal is reserved for verified trade customers. If you run a garage,
                workshop, or fleet operation, you can apply for B2B access to unlock wholesale
                pricing and priority stock allocation.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="border border-slate-200 bg-[#f8fafc] p-5">
                  <h3 className="font-bold text-[#0f172a]">What you get</h3>
                  <ul className="mt-3 grid gap-2 text-[14px] leading-6 text-[#475569]">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                      Protected trade pricing (typically 20-40% off retail)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                      Priority same-day dispatch
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                      Dedicated account manager
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                      Bulk order discounts and net-30 terms
                    </li>
                  </ul>
                </div>
                <div className="border border-slate-200 bg-[#f8fafc] p-5">
                  <h3 className="font-bold text-[#0f172a]">How to apply</h3>
                  <p className="mt-3 text-[14px] leading-6 text-[#475569]">
                    Contact our team with your business details and we will upgrade your account
                    within 24 hours. You can also register a new account and select "B2B Trade
                    Account" during sign-up.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:contact@aceturbo.co.uk?subject=B2B%20Trade%20Account%20Request"
                  className="bg-[#0868a8] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#054b7f]"
                >
                  Email to Apply
                </a>
                <a
                  href="tel:01279-817451"
                  className="border border-slate-200 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a] transition hover:border-[#0868a8]/40"
                >
                  Call 01279-817451
                </a>
                <Link
                  href="/contact"
                  className="border border-slate-200 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f172a] transition hover:border-[#0868a8]/40"
                >
                  Contact Form
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}