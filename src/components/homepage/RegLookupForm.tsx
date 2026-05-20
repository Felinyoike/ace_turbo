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
    <aside className="relative overflow-hidden rounded-[28px] border border-outline-variant bg-[#201f22] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)]" aria-label="Turbo Finder">
      <div className="absolute inset-0 machine-lines opacity-35" aria-hidden="true" />
      <div className="relative">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-[20px] text-[#ff571a]" aria-hidden="true">⟡</span>
          <h2 className="font-tech text-[14px] uppercase tracking-[0.24em] text-[#e5e1e4]">Turbo Finder</h2>
        </div>

        <div className="space-y-6">
          <form onSubmit={submitReg}>
            <label className="mb-2 block font-tech text-[10px] uppercase tracking-[0.2em] text-[#c8c6c5]" htmlFor="registration">
              Enter your registration
            </label>
            <div className="flex gap-2">
              <input
                id="registration"
                name="registration"
                className="min-w-0 flex-1 border-b border-[#5c4037] bg-[#0e0e10] p-3 font-tech uppercase tracking-[0.1em] text-[#e5e1e4] outline-none placeholder:text-[#929090] focus:border-[#ff571a]"
                maxLength={12}
                placeholder="AB12CDE"
                required
              />
              <button 
                className="bg-[#ff571a] px-5 py-3 font-tech text-[12px] uppercase tracking-[0.2em] text-[#3a0b00] transition hover:brightness-110 disabled:opacity-50" 
                type="submit"
                disabled={loading}
              >
                {loading ? "..." : "Find"}
              </button>
            </div>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-1 border-t border-[#5c4037]" />
            <span className="mx-4 font-tech text-[10px] uppercase tracking-[0.24em] text-[#929090]">Or search by part</span>
            <div className="flex-1 border-t border-[#5c4037]" />
          </div>

          <form onSubmit={submitPart}>
            <label className="mb-2 block font-tech text-[10px] uppercase tracking-[0.2em] text-[#c8c6c5]" htmlFor="turboNumber">
              Turbo part number
            </label>
            <div className="flex gap-2">
              <input
                id="turboNumber"
                name="turboNumber"
                className="min-w-0 flex-1 border-b border-[#5c4037] bg-[#0e0e10] p-3 font-tech tracking-[0.08em] text-[#e5e1e4] outline-none placeholder:text-[#929090] focus:border-[#ff571a]"
                maxLength={32}
                placeholder="e.g. 49173-07508"
                required
              />
              <button 
                className="inline-flex items-center bg-white/5 px-5 py-3 font-tech text-[12px] uppercase tracking-[0.18em] text-[#e5e1e4] transition hover:bg-white/10" 
                type="submit"
              >
                Lookup
              </button>
            </div>
          </form>

          <button 
            className="w-full border border-[#c6c6cf] bg-transparent py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#c6c6cf] transition hover:bg-white/5 hover:text-[#ffdbd0]" 
            type="button"
            onClick={() => router.push("/turbos")}
          >
            Lookup technical specs
          </button>
        </div>

        {message ? <p className="mt-4 font-body text-sm text-[#ffb59e]">{message}</p> : null}
      </div>
    </aside>
  );
}
