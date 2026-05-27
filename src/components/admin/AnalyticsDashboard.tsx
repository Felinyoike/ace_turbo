"use client";

import { useEffect, useState } from "react";

type Summary = {
  totalOrders: number;
  recentOrders: number;
  weekOrders: number;
  totalRevenue: number;
  weekRevenue: number;
  totalTurbos: number;
  lookupCount: number;
  recentLookups: number;
};

type TopTurbo = {
  id: number;
  sku: string;
  name: string;
  orderCount: number;
  stock: number | null;
};

type AnalyticsData = {
  summary: Summary;
  topTurbos: TopTurbo[];
  ordersByDay: Record<string, number>;
  revenueByDay: Record<string, number>;
};

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load analytics");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Loading analytics...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return null;

  const { summary, topTurbos, ordersByDay, revenueByDay } = data;
  const days = Object.keys(ordersByDay).sort();
  const maxOrders = Math.max(...(Object.values(ordersByDay) as number[]), 1);
  const maxRevenue = Math.max(...(Object.values(revenueByDay) as number[]), 1);

  return (
    <div className="grid gap-8">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Orders (7 days)" value={summary.weekOrders} />
        <StatCard label="Orders (30 days)" value={summary.recentOrders} />
        <StatCard label="Revenue (7 days)" value={`£${summary.weekRevenue.toFixed(2)}`} />
        <StatCard label="Revenue (30 days)" value={`£${summary.totalRevenue.toFixed(2)}`} />
        <StatCard label="Total Orders" value={summary.totalOrders} />
        <StatCard label="Total Turbos" value={summary.totalTurbos} />
        <StatCard label="Lookups (7 days)" value={summary.recentLookups} />
        <StatCard label="Total Lookups" value={summary.lookupCount} />
      </div>

      {/* Orders Chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-[#0f172a]">Orders — Last 30 Days</h2>
        <div className="mt-4 flex items-end gap-1" style={{ height: 160 }}>
          {days.map((day) => (
            <div key={day} className="group relative flex flex-1 flex-col items-center">
              <div
                className="w-full rounded-t bg-[#0868a8] transition group-hover:bg-[#054b7f]"
                style={{ height: `${(ordersByDay[day] / maxOrders) * 140}px`, minHeight: ordersByDay[day] > 0 ? 4 : 0 }}
              />
              <span className="absolute -top-5 hidden rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-white group-hover:block">
                {day.slice(5)}: {ordersByDay[day]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>{days[0]?.slice(5)}</span>
          <span>{days[days.length - 1]?.slice(5)}</span>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-[#0f172a]">Revenue — Last 30 Days</h2>
        <div className="mt-4 flex items-end gap-1" style={{ height: 160 }}>
          {days.map((day) => (
            <div key={day} className="group relative flex flex-1 flex-col items-center">
              <div
                className="w-full rounded-t bg-emerald-500 transition group-hover:bg-emerald-600"
                style={{ height: `${((revenueByDay[day] || 0) / maxRevenue) * 140}px`, minHeight: (revenueByDay[day] || 0) > 0 ? 4 : 0 }}
              />
              <span className="absolute -top-5 hidden rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-white group-hover:block">
                {day.slice(5)}: £{(revenueByDay[day] || 0).toFixed(0)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>{days[0]?.slice(5)}</span>
          <span>{days[days.length - 1]?.slice(5)}</span>
        </div>
      </div>

      {/* Top Turbos */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-[#0f172a]">Top Selling Turbos</h2>
        {topTurbos.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">No order data yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-bold uppercase text-slate-500">
                  <th className="pb-2 pr-4">#</th>
                  <th className="pb-2 pr-4">SKU</th>
                  <th className="pb-2 pr-4">Product</th>
                  <th className="pb-2 pr-4 text-right">Orders</th>
                  <th className="pb-2 text-right">Stock</th>
                </tr>
              </thead>
              <tbody>
                {topTurbos.map((turbo, idx) => (
                  <tr key={turbo.id} className="border-b border-slate-100">
                    <td className="py-2 pr-4 text-slate-400">{idx + 1}</td>
                    <td className="py-2 pr-4 font-mono text-xs text-[#0868a8]">{turbo.sku}</td>
                    <td className="py-2 pr-4 text-[#0f172a]">{turbo.name}</td>
                    <td className="py-2 pr-4 text-right font-bold text-[#0f172a]">{turbo.orderCount}</td>
                    <td className="py-2 text-right text-slate-500">{turbo.stock ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* GA4 Note */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h3 className="font-bold text-blue-900">Google Analytics Integration</h3>
        <p className="mt-1 text-sm text-blue-800">
          {process.env.NEXT_PUBLIC_GA_ID
            ? `GA4 active — Measurement ID: ${process.env.NEXT_PUBLIC_GA_ID}. View full visitor reports at analytics.google.com.`
            : "GA4 not yet configured. Set NEXT_PUBLIC_GA_ID in your environment to enable visitor tracking and conversion reporting."}
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-extrabold text-[#0f172a]">{value}</p>
    </div>
  );
}
