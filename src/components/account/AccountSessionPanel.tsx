"use client";

import { useState } from "react";
import type { StoredSession } from "@/lib/persistence";
import { describeUserAgent } from "@/lib/turboContent";

export function AccountSessionPanel({ initialSessions, currentSessionId }: { initialSessions: StoredSession[]; currentSessionId?: string }) {
  const [sessions, setSessions] = useState(initialSessions);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState<string | null>(null);

  async function revokeSession(sessionId: string) {
    setPending(sessionId);
    setMessage("");
    const response = await fetch("/api/account/sessions", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId })
    });
    const data = await response.json();
    setPending(null);
    if (!response.ok) {
      setMessage(data.error || "Could not revoke session.");
      return;
    }
    setSessions((current) => current.map((session) => (session.id === sessionId ? data.session : session)));
    setMessage("Session revoked.");
    if (sessionId === currentSessionId) {
      window.location.href = "/account";
    }
  }

  async function revokeOthers() {
    setPending("others");
    setMessage("");
    const response = await fetch("/api/account/sessions", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ revokeOthers: true })
    });
    const data = await response.json();
    setPending(null);
    if (!response.ok) {
      setMessage(data.error || "Could not revoke other sessions.");
      return;
    }
    const revokedIds = new Set((data.sessions as StoredSession[]).filter((session) => session.revokedAt).map((session) => session.id));
    setSessions((current) => current.map((session) => (revokedIds.has(session.id) ? { ...session, revokedAt: new Date().toISOString() } : session)));
    setMessage("Other sessions signed out.");
  }

  return (
    <section className="border border-slate-200 bg-white p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[#0f172a]">Session &amp; Device Access</h2>
          <p className="text-sm text-[#475569]">Review active logins and remove any device you do not recognise.</p>
        </div>
        <button
          className="border border-slate-200 px-4 py-2 text-sm font-bold text-[#0f172a] transition hover:border-[#0868a8]/40"
          disabled={pending === "others"}
          onClick={revokeOthers}
          type="button"
        >
          Sign out other devices
        </button>
      </div>
      <div className="grid gap-3">
        {sessions.map((session) => {
          const active = !session.revokedAt && new Date(session.expiresAt).getTime() > Date.now();
          const isCurrent = session.id === currentSessionId;
          return (
            <article className="border border-slate-100 bg-[#f8fafc] p-4" key={session.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-[#0f172a]">{describeUserAgent(session.userAgent)}</p>
                  <p className="mt-1 text-sm text-[#475569]">{session.ipAddress || "Unknown IP"} · started {new Date(session.createdAt).toLocaleString()}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#64748b]">Last seen {new Date(session.lastSeenAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={[
                    "px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]",
                    active ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-[#64748b] border border-slate-200"
                  ].join(" ")}>
                    {isCurrent && active ? "current session" : active ? "active" : session.revokedAt ? "revoked" : "expired"}
                  </span>
                  {active ? (
                    <button
                      className="border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100"
                      disabled={pending === session.id}
                      onClick={() => revokeSession(session.id)}
                      type="button"
                    >
                      Revoke
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {message ? <p className="mt-4 text-sm text-[#475569]">{message}</p> : null}
    </section>
  );
}