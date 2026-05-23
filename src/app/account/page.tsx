export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import Link from "next/link";
import { AccountSessionPanel } from "@/components/account/AccountSessionPanel";
import { AuthPanel } from "@/components/account/AuthPanel";
import { getSessionUser } from "@/lib/auth";
import { verifySessionToken } from "@/lib/auth-token";
import { getSessions } from "@/lib/data-access";

export default async function AccountPage() {
  const user = await getSessionUser();
  const sessions = user ? await getSessions({ userId: user.id }) : [];
  const token = cookies().get("ace_auth")?.value;
  const currentSessionId = token ? (() => {
    try {
      return verifySessionToken(token).sid;
    } catch {
      return undefined;
    }
  })() : undefined;

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[900px] px-4 py-14">
          <p className="text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">My Account</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            Account <span className="text-[#0868a8]">Portal</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#475569]">
            Register, sign in, review order history, manage active sessions, and download invoice PDFs.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-[900px] px-4 py-12">
        {user ? (
          <div className="grid gap-6">
            <section className="border border-slate-200 bg-white p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#0868a8]">Signed in as</p>
              <h2 className="mt-2 text-2xl font-bold text-[#0f172a]">{user.firstName} {user.lastName}</h2>
              <p className="mt-1 text-[#475569]">{user.email} · {user.role}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link className="bg-[#0868a8] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#054b7f]" href="/account/orders">Order history</Link>
                <Link className="border border-slate-200 px-5 py-2 text-sm font-bold text-[#0f172a] transition hover:border-[#0868a8]/40" href="/account/invoices">Invoices</Link>
              </div>
            </section>
            <AccountSessionPanel currentSessionId={currentSessionId} initialSessions={sessions} />
          </div>
        ) : (
          <AuthPanel />
        )}
      </div>
    </main>
  );
}