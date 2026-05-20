import type { TurboBrandDetail } from "@/types/turbo-brands";
import { BrandSidebar } from "./BrandSidebar";

interface BrandDetailLayoutProps {
  brand: TurboBrandDetail;
  children: React.ReactNode;
}

/**
 * BrandDetailLayout Component
 * 
 * Provides consistent layout structure for all brand detail pages.
 * Features a two-column grid with main content area on the left and sidebar on the right.
 * 
 * Layout:
 * - Desktop (lg+): Two-column grid [1fr 340px] with sidebar beside content
 * - Mobile (<lg): Single column with sidebar stacked below content
 * 
 * Props:
 * - brand: Brand data for context (currently unused but available for future enhancements)
 * - children: Main content area (identification guide, data plate image, notes)
 * 
 * Requirements: 3.6, 3.8, 12.6, 13.2, 13.3
 */
export function BrandDetailLayout({ brand, children }: BrandDetailLayoutProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-12">
      <div className="grid gap-12 lg:grid-cols-[1fr_340px]" data-testid="brand-layout">
        {/* Main Content Area */}
        <div className="space-y-12">
          {children}
        </div>

        {/* Sidebar */}
        <BrandSidebar />
      </div>
    </div>
  );
}
