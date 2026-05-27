export const dynamic = "force-dynamic";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1180px] px-4 py-14">
          <p className="text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">Admin</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            Analytics <span className="text-[#0868a8]">Dashboard</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#475569]">
            Visitor tracking, order performance, popular products, and revenue reporting.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-[1180px] px-4 py-10">
        <AnalyticsDashboard />
      </div>
    </main>
  );
}
