export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser, isAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false }
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user || !isAdmin(user)) {
    redirect("/account");
  }

  return <div className="min-h-screen bg-white">{children}</div>;
}