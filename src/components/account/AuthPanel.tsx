"use client";

import { useState } from "react";

export function AuthPanel() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const mode = String(form.get("mode"));
    try {
      const response = await fetch("/api/auth/" + mode, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form))
      });
      const data = await response.json();
      setMessage(data.error || (mode === "login" ? "Signed in" : "Registered") + " successfully.");
      if (response.ok) window.location.href = "/account/orders";
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <form className="grid gap-3 border border-slate-200 bg-white p-6" onSubmit={submit}>
        <h2 className="text-2xl font-bold text-[#0f172a]">Sign In</h2>
        <input type="hidden" name="mode" value="login" />
        <input
          className="border border-slate-200 bg-white px-3 py-3 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0868a8] focus:outline-none"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="border border-slate-200 bg-white px-3 py-3 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0868a8] focus:outline-none"
          type="password"
          name="password"
          placeholder="Password"
          minLength={12}
          required
        />
        <button className="bg-[#0868a8] px-4 py-3 font-bold text-white transition hover:bg-[#054b7f] disabled:opacity-50" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <form className="grid gap-3 border border-slate-200 bg-white p-6" onSubmit={submit}>
        <h2 className="text-2xl font-bold text-[#0f172a]">Register</h2>
        <input type="hidden" name="mode" value="register" />
        <input
          className="border border-slate-200 bg-white px-3 py-3 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0868a8] focus:outline-none"
          name="firstName"
          placeholder="First name"
          required
        />
        <input
          className="border border-slate-200 bg-white px-3 py-3 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0868a8] focus:outline-none"
          name="lastName"
          placeholder="Last name"
          required
        />
        <input
          className="border border-slate-200 bg-white px-3 py-3 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0868a8] focus:outline-none"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="border border-slate-200 bg-white px-3 py-3 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0868a8] focus:outline-none"
          type="password"
          name="password"
          placeholder="Password (12+ chars)"
          minLength={12}
          required
        />
        <input
          className="border border-slate-200 bg-white px-3 py-3 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0868a8] focus:outline-none"
          name="company"
          placeholder="Company (optional)"
        />
        <button className="bg-[#0f172a] px-4 py-3 font-bold text-white transition hover:bg-[#1e293b] disabled:opacity-50" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
      {message ? <p className="text-sm text-[#475569] md:col-span-2">{message}</p> : null}
    </div>
  );
}