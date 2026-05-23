"use client";

import { useState } from "react";

export function AuthPanel() {
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const mode = String(form.get("mode"));
    const response = await fetch("/api/auth/" + mode, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form))
    });
    const data = await response.json();
    setMessage(data.error || (mode === "login" ? "Signed in" : "Registered") + " successfully.");
    if (response.ok) window.location.href = "/account/orders";
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
          required
        />
        <button className="bg-[#0868a8] px-4 py-3 font-bold text-white transition hover:bg-[#054b7f]" type="submit">
          Sign In
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
          required
        />
        <input
          className="border border-slate-200 bg-white px-3 py-3 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0868a8] focus:outline-none"
          name="company"
          placeholder="Company (optional)"
        />
        <select
          className="border border-slate-200 bg-white px-3 py-3 text-[#0f172a] focus:border-[#0868a8] focus:outline-none"
          name="role"
          defaultValue="customer"
        >
          <option value="customer">Customer</option>
          <option value="b2b">B2B Trade Account</option>
        </select>
        <button className="bg-[#0f172a] px-4 py-3 font-bold text-white transition hover:bg-[#1e293b]" type="submit">
          Create Account
        </button>
      </form>
      {message ? <p className="text-sm text-[#475569] md:col-span-2">{message}</p> : null}
    </div>
  );
}