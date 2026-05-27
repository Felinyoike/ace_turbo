export const dynamic = "force-dynamic";
import Link from "next/link";

const cards = [
  { href: "/admin/analytics", label: "Analytics & Reporting", desc: "Orders, revenue, popular turbos, and visitor tracking." },
  { href: "/admin/turbos", label: "Turbo Data Entry", desc: "Add, edit and manage turbo product records." },
  { href: "/admin/car-lookup", label: "Car Reg Lookups", desc: "View customer registration number lookups." },
  { href: "/admin/car-lookup/stats", label: "Lookup Stats", desc: "API call counts, cache hits and DB usage." },
  { href: "/admin/orders", label: "Order Management", desc: "View, process and update customer orders." },
  { href: "/admin/users", label: "User & IP Management", desc: "Manage roles, sessions and IP blocks." },
  { href: "/admin/ebay", label: "eBay Listings", desc: "Generate and manage eBay listing drafts." },
  { href: "/admin/seo", label: "SEO Links", desc: "Canonical URLs and campaign-tagged links." },
  { href: "/admin/audit", label: "Security Audit", desc: "Track external audit scheduling." },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1120px] px-4 py-14">
          <p className="text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Internal</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            Admin <span className="text-[#0868a8]">Dashboard</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#475569]">
            Product data, lookups, orders, users, IP blocking, eBay listings, SEO links, and audit scheduling.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-[1120px] px-4 py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group border border-slate-200 bg-white p-6 transition hover:border-[#0868a8]/40 hover:shadow-sm"
            >
              <h2 className="text-[17px] font-bold text-[#0f172a] transition group-hover:text-[#0868a8]">
                {card.label}
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-[#475569]">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}