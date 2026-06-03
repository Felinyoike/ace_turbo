"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { sanitizeRegistration } from "@/lib/sanitize-strings";

type VehicleResult = {
  make?: string;
  model?: string;
  year?: number;
  engineCapacity?: number;
  fuelType?: string;
  colour?: string;
  bhp?: number;
  engineCode?: string;
  registrationNumber?: string;
};

export function RegLookupForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState<VehicleResult | null>(null);

  async function submitReg(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setVehicle(null);

    const form = new FormData(event.currentTarget);
    const registration = sanitizeRegistration(String(form.get("registration") || ""));

    try {
      const response = await fetch("/api/car-lookup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ registration })
      });
      const data = await response.json();

      if (!response.ok) {
        // jsonError returns { error: "..." }
        setMessage(data.error || data.message || `Lookup failed (${response.status}).`);
        return;
      }

      if (data.vehicle) {
        const v: VehicleResult = data.vehicle;
        setVehicle(v);

        // Redirect to vehicle page to show car details and matching turbos
        setTimeout(() => router.push(`/vehicle?reg=${encodeURIComponent(registration)}`), 900);
      } else {
        setMessage(data.error || data.message || `No vehicle found for ${registration}.`);
      }
    } catch {
      setMessage("Network error — please check your connection and try again.");
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
    <aside
      className="relative overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(8,104,168,0.12)]"
      aria-label="Turbo Finder"
    >
      {/* Diagonal accent lines — matches .machine-lines design language */}
      <div className="absolute inset-0 machine-lines opacity-35" aria-hidden="true" />

      {/* Blue left accent bar — matches .angle-panel pattern */}
      <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#0868a8] to-[#60a5fa]" aria-hidden="true" />

      <div className="relative">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <h2 className="font-tech text-[11px] uppercase tracking-[0.28em] text-[#0f172a]">
            Turbo Finder
          </h2>
          <span className="ml-auto font-tech text-[9px] uppercase tracking-[0.2em] text-[#0868a8]">
            VRM · Part No.
          </span>
        </div>

        <div className="space-y-5">
          {/* ── Registration lookup ── */}
          <form onSubmit={submitReg}>
            <label
              className="mb-1.5 block font-tech text-[9px] uppercase tracking-[0.25em] text-[#64748b]"
              htmlFor="registration"
            >
              Vehicle Registration
            </label>
            <div className="flex gap-0">
              <input
                id="registration"
                name="registration"
                className="min-w-0 flex-1 border border-r-0 border-slate-200 bg-slate-50 px-3 py-2.5 font-tech text-[13px] uppercase tracking-[0.15em] text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:border-[#0868a8] focus:bg-white transition-colors"
                maxLength={12}
                placeholder="AB12 CDE"
                required
              />
              <button
                className="border border-[#0868a8] bg-[#0868a8] px-5 py-2.5 font-tech text-[10px] uppercase tracking-[0.24em] text-white transition hover:bg-[#054b7f] hover:border-[#054b7f] disabled:opacity-50 flex items-center gap-1.5"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="inline-block h-3 w-3 animate-spin rounded-full border border-white border-t-transparent" />
                    <span>Searching</span>
                  </>
                ) : (
                  "Find Turbo"
                )}
              </button>
            </div>

            {/* Vehicle result card — shown briefly before navigating */}
            {vehicle && (
              <div className="mt-2 border border-[#0868a8]/25 bg-[#eff6ff] p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#0868a8]">
                      Vehicle identified
                    </p>
                    <p className="mt-0.5 font-tech text-[13px] font-bold uppercase text-[#0f172a]">
                      {[vehicle.make, vehicle.model].filter(Boolean).join(" ")}
                    </p>
                  </div>
                  <span className="border border-[#0868a8]/30 bg-white px-2 py-0.5 font-tech text-[10px] uppercase tracking-[0.15em] text-[#0868a8]">
                    {vehicle.year}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                  {vehicle.engineCapacity && (
                    <span className="font-tech text-[10px] text-[#475569]">
                      Engine <strong className="text-[#0f172a]">{vehicle.engineCapacity}cc</strong>
                    </span>
                  )}
                  {vehicle.bhp && (
                    <span className="font-tech text-[10px] text-[#475569]">
                      Power <strong className="text-[#0f172a]">{vehicle.bhp} BHP</strong>
                    </span>
                  )}
                  {vehicle.fuelType && (
                    <span className="font-tech text-[10px] text-[#475569]">
                      Fuel <strong className="text-[#0f172a]">{vehicle.fuelType}</strong>
                    </span>
                  )}
                  {vehicle.colour && (
                    <span className="font-tech text-[10px] text-[#475569]">
                      Colour <strong className="text-[#0f172a]">{vehicle.colour}</strong>
                    </span>
                  )}
                </div>
                <p className="mt-2 font-tech text-[9px] uppercase tracking-[0.2em] text-[#64748b]">
                  → Loading matching turbos…
                </p>
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-slate-200" />
            <span className="mx-3 font-tech text-[9px] uppercase tracking-[0.28em] text-[#94a3b8]">
              or part number
            </span>
            <div className="flex-1 border-t border-slate-200" />
          </div>

          {/* ── Part number lookup ── */}
          <form onSubmit={submitPart}>
            <label
              className="mb-1.5 block font-tech text-[9px] uppercase tracking-[0.25em] text-[#64748b]"
              htmlFor="turboNumber"
            >
              Turbo / OEM Part No.
            </label>
            <div className="flex gap-0">
              <input
                id="turboNumber"
                name="turboNumber"
                className="min-w-0 flex-1 border border-r-0 border-slate-200 bg-slate-50 px-3 py-2.5 font-tech text-[13px] tracking-[0.08em] text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:border-[#0868a8] focus:bg-white transition-colors"
                maxLength={32}
                placeholder="e.g. 49173-07508"
                required
              />
              <button
                className="border border-slate-300 bg-white px-4 py-2.5 font-tech text-[10px] uppercase tracking-[0.2em] text-[#334155] transition hover:border-[#0868a8] hover:text-[#0868a8]"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>

          {/* Browse all */}
          <button
            className="w-full border border-slate-200 bg-transparent py-2.5 font-tech text-[9px] uppercase tracking-[0.28em] text-[#64748b] transition hover:border-[#0868a8]/40 hover:bg-[#eff6ff] hover:text-[#0868a8]"
            type="button"
            onClick={() => router.push("/turbos")}
          >
            Browse Full Catalogue →
          </button>
        </div>

        {/* Error message */}
        {message && (
          <div className="mt-4 border border-red-200 bg-red-50 p-3">
            <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-red-600">
              {message}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
