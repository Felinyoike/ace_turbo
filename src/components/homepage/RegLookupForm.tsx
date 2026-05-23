"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sanitizeRegistration } from "@/lib/sanitize-strings";

export function RegLookupForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReg(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    
    const form = new FormData(event.currentTarget);
    const registration = sanitizeRegistration(String(form.get("registration") || ""));
    
    try {
      const response = await fetch("/api/car-lookup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ registration })
      });
      const data = await response.json();
      
      if (data.vehicle) {
        const params = new URLSearchParams();
        if (data.vehicle.make) params.set("make", data.vehicle.make.toUpperCase());
        if (data.vehicle.model) params.set("model", data.vehicle.model.toUpperCase());
        if (data.vehicle.engineCapacity) params.set("engine", data.vehicle.engineCapacity.toString());
        if (data.vehicle.yearOfManufacture) params.set("year", data.vehicle.yearOfManufacture.toString());
        router.push(`/turbos?${params.toString()}`);
      } else {
        setMessage(data.message || `No vehicle found for ${registration}.`);
      }
    } catch {
      setMessage("An error occurred during lookup.");
    } finally {
      setLoading(false);
    }
  }

  function submitPart(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const partNumber = String(form.get("turboNumber") || "").trim();
    if (partNumber) {
      router.push(`/turbos?partNumber=${encodeURIComponent(partNumber)}`);
    }
  }

  return (
    <aside className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(8,104,168,0.12)]" aria-label="Turbo Finder">
      <div className="absolute inset-0 machine-lines opacity-35" aria-hidden="true" />
      <div className="relative">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-[20px] text-[#0868a8]" aria-hidden="true">⟡</span>
          <h2 className="font-tech text-[14px] uppercase tracking-[0.24em] text-[#0f172a]">Turbo Finder</h2>
        </div>

        <div className="space-y-6">
          <form onSubmit={submitReg}>
            <label className="mb-2 block font-tech text-[10px] uppercase tracking-[0.2em] text-[#475569]" htmlFor="registration">
              Enter your registration
            </label>
            <div className="flex gap-2">
              <input
                id="registration"
                name="registration"
                className="min-w-0 flex-1 border-b border-[#bfdbfe] bg-slate-50 p-3 font-tech uppercase tracking-[0.1em] text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:border-[#0868a8]"
                maxLength={12}
                placeholder="AB12CDE"
                required
              />
              <button 
                className="bg-[#0868a8] px-5 py-3 font-tech text-[12px] uppercase tracking-[0.2em] text-white transition hover:bg-[#054b7f] disabled:opacity-50" 
                type="submit"
                disabled={loading}
              >
                {loading ? "..." : "Find"}
              </button>
            </div>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-1 border-t border-[#e2e8f0]" />
            <span className="mx-4 font-tech text-[10px] uppercase tracking-[0.24em] text-[#94a3b8]">Or search by part</span>
            <div className="flex-1 border-t border-[#e2e8f0]" />
          </div>

          <form onSubmit={submitPart}>
            <label className="mb-2 block font-tech text-[10px] uppercase tracking-[0.2em] text-[#475569]" htmlFor="turboNumber">
              Turbo part number
            </label>
            <div className="flex gap-2">
              <input
                id="turboNumber"
                name="turboNumber"
                className="min-w-0 flex-1 border-b border-[#bfdbfe] bg-slate-50 p-3 font-tech tracking-[0.08em] text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:border-[#0868a8]"
                maxLength={32}
                placeholder="e.g. 49173-07508"
                required
              />
              <button 
                className="inline-flex items-center bg-slate-100 px-5 py-3 font-tech text-[12px] uppercase tracking-[0.18em] text-[#334155] transition hover:bg-slate-200" 
                type="submit"
              >
                Lookup
              </button>
            </div>
          </form>

          <button 
            className="w-full border border-[#bfdbfe] bg-transparent py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#475569] transition hover:bg-[#eff6ff] hover:text-[#0868a8]" 
            type="button"
            onClick={() => router.push("/turbos")}
          >
            Lookup technical specs
          </button>
        </div>

        {message ? <p className="mt-4 font-body text-sm text-[#0868a8]">{message}</p> : null}
      </div>
    </aside>
  );
}
