import Link from "next/link";
import type { TurboBrand } from "@/types/turbo-brands";

interface BrandCardProps {
  brand: TurboBrand;
}

/**
 * BrandCard Component
 * 
 * Displays a single turbo brand as a clickable card on the main brands landing page.
 * Uses a 3-column grid layout (tag/content/arrow) matching the services pattern.
 * 
 * Features:
 * - Entire card is clickable and navigates to brand detail page
 * - Hover effect changes border color to orange
 * - Arrow indicator visible only on desktop (md:flex)
 * - Responsive: single column on mobile, full grid on desktop
 * - BOOSTFORGE theme styling with dark backgrounds and orange accents
 */
export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link
      href={`/turbos/brands/${brand.slug}`}
      className="group grid grid-cols-1 border border-slate-200 bg-white transition hover:border-[#0868a8]/40 hover:shadow-md md:grid-cols-[80px_1fr_auto]"
    >
      {/* Tag */}
      <div className="flex items-center justify-center border-b border-slate-200 bg-slate-50 px-6 py-5 md:border-b-0 md:border-r">
        <span className="font-tech text-[10px] uppercase tracking-[0.26em] text-[#0868a8]">
          {brand.tag}
        </span>
      </div>

      {/* Content */}
      <div className="px-6 py-6 md:py-7">
        <h2 className="font-display text-[1.5rem] uppercase text-[#0f172a] transition group-hover:text-[#0868a8]">
          {brand.name}
        </h2>
        <p className="mt-2 max-w-2xl text-[14px] leading-7 text-[#64748b]">{brand.summary}</p>
      </div>

      {/* Arrow - visible only on desktop */}
      <div className="hidden items-center justify-center px-6 md:flex">
        <span className="text-[1.5rem] text-[#cbd5e1] transition group-hover:text-[#0868a8]">
          →
        </span>
      </div>
    </Link>
  );
}
