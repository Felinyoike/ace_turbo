export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAllOrders, getTurbos } from "@/lib/data-access";
import { readAppData } from "@/lib/persistence";
import { getVisitorCount } from "@/lib/visitor-analytics";

export async function GET() {
  await requireAdmin();

  const [turbos, orders, appData, visitorCount] = await Promise.all([
    getTurbos(),
    getAllOrders(),
    readAppData(),
    getVisitorCount()
  ]);

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const recentOrders = orders.filter((o) => new Date(o.createdAt) >= thirtyDaysAgo);
  const weekOrders = orders.filter((o) => new Date(o.createdAt) >= sevenDaysAgo);

  const totalRevenue = recentOrders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + o.total, 0);

  const weekRevenue = weekOrders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + o.total, 0);

  const topTurbos = turbos
    .map((t) => {
      const orderCount = orders.filter((o) =>
        o.items?.some((item: any) => item.turboId === t.id)
      ).length;
      return { id: t.id, sku: t.sku, name: `${t.make} ${t.model} ${t.engine}`, orderCount, stock: t.stock };
    })
    .sort((a, b) => b.orderCount - a.orderCount)
    .slice(0, 10);

  const lookupCount = appData.lookups?.length || 0;
  const recentLookups = (appData.lookups || []).filter(
    (l: any) => new Date(l.createdAt) >= sevenDaysAgo
  ).length;

  const ordersByDay: Record<string, number> = {};
  recentOrders.forEach((o) => {
    const day = new Date(o.createdAt).toISOString().slice(0, 10);
    ordersByDay[day] = (ordersByDay[day] || 0) + 1;
  });

  const revenueByDay: Record<string, number> = {};
  recentOrders.filter((o) => o.status === "paid").forEach((o) => {
    const day = new Date(o.createdAt).toISOString().slice(0, 10);
    revenueByDay[day] = (revenueByDay[day] || 0) + o.total;
  });

  return NextResponse.json({
    summary: {
      totalOrders: orders.length,
      recentOrders: recentOrders.length,
      weekOrders: weekOrders.length,
      totalRevenue,
      weekRevenue,
      totalTurbos: turbos.length,
      lookupCount,
      recentLookups,
      visitorCount
    },
    topTurbos,
    ordersByDay,
    revenueByDay
  });
}
