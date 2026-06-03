"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

const FIELDS = [
  { label: "Make", name: "make", placeholder: "e.g. BMW" },
  { label: "Model", name: "model", placeholder: "e.g. 530d" },
  { label: "Year", name: "year", placeholder: "e.g. 2018" },
  { label: "Engine (cc)", name: "engine", placeholder: "e.g. 2993" },
  { label: "BHP", name: "bhp", placeholder: "e.g. 258" }
] as const;

export function TurboFilter({ defaults = {} }: { defaults?: Record<string, string> }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  function handleClear() {
    formRef.current?.reset();
    router.push("/turbos");
  }

  // Detect if any filter is currently active (came from reg lookup or manual entry)
  const hasActive = Object.values(defaults).some(Boolean);

  return (
    <form
      ref={formRef}
      className="border border-slate-200 bg-white shadow-sm"
      action="/turbos"
    >
      {/* Filter header strip */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span className="font-tech text-[9px] uppercase tracking-[0.28em] text-[#0868a8]">
            Filter Stock
          </span>
        </div>
        {hasActive && (
          <button
            type="button"
            onClick={handleClear}
            className="font-tech text-[9px] uppercase tracking-[0.2em] text-[#64748b] hover:text-red-500 transition-colors"
          >
            Clear filters ×
          </button>
        )}
      </div>

      {/* Filter fields grid */}
      <div className="grid grid-cols-2 gap-px bg-slate-100 sm:grid-cols-3 md:grid-cols-6">
        {FIELDS.map(({ label, name, placeholder }) => {
          const isActive = Boolean(defaults[name]);
          return (
            <div key={name} className="bg-white p-3">
              <label className={`block font-tech text-[9px] uppercase tracking-[0.22em] mb-1.5 ${isActive ? "text-[#0868a8]" : "text-[#64748b]"}`}>
                {label}
                {isActive && <span className="ml-1 text-[#0868a8]">●</span>}
              </label>
              <input
                name={name}
                placeholder={placeholder}
                defaultValue={defaults[name] || ""}
                className={`w-full border bg-slate-50 px-2 py-1.5 font-tech text-[12px] text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:bg-white transition-colors ${
                  isActive
                    ? "border-[#0868a8]/40 bg-[#eff6ff]"
                    : "border-slate-200 focus:border-[#0868a8]"
                }`}
              />
            </div>
          );
        })}

        {/* Part No. field */}
        <div className="bg-white p-3">
          <label className={`block font-tech text-[9px] uppercase tracking-[0.22em] mb-1.5 ${defaults.partNumber ? "text-[#0868a8]" : "text-[#64748b]"}`}>
            Part No.
            {defaults.partNumber && <span className="ml-1 text-[#0868a8]">●</span>}
          </label>
          <input
            name="partNumber"
            placeholder="e.g. 49173-07508"
            defaultValue={defaults.partNumber || ""}
            className={`w-full border bg-slate-50 px-2 py-1.5 font-tech text-[12px] text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:bg-white transition-colors ${
              defaults.partNumber
                ? "border-[#0868a8]/40 bg-[#eff6ff]"
                : "border-slate-200 focus:border-[#0868a8]"
            }`}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="px-3 pb-3 pt-2">
        <button
          className="w-full bg-[#0868a8] py-2.5 font-tech text-[10px] uppercase tracking-[0.28em] text-white transition hover:bg-[#054b7f]"
          type="submit"
        >
          Search Stock
        </button>
      </div>
    </form>
  );
}