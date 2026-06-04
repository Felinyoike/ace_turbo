import Link from "next/link";
import { CartNavButton } from "@/components/cart/CartNavButton";
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="header-grid" aria-hidden="true" />
      <nav className="relative mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 md:px-16 lg:flex-row lg:items-center lg:justify-between" aria-label="Main navigation">
        <Link href="/" className="flex flex-col items-center text-center uppercase leading-none lg:items-start lg:text-left" aria-label="Ace Turbo home">
          <span className="font-display text-[30px] font-extrabold tracking-[0.18em] text-[#0f172a]">ACE <span className="text-[#0868a8]">TURBO</span></span>
          <small className="mt-1 font-tech text-[10px] tracking-[0.26em] text-[#64748b]">WORKSHOP-GRADE TURBO SUPPLY</small>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[15px] font-medium text-[#334155] lg:flex-1 lg:justify-center">
          <Link href="/" className="border-b-2 border-[#0868a8] pb-1 text-[#0868a8]">Home</Link>
          <Link href="/turbos" className="transition-colors hover:text-[#0868a8]">Turbo Finder</Link>
          <Link href="/services" className="transition-colors hover:text-[#0868a8]">Services</Link>
          <Link href="/franchise" className="transition-colors hover:text-[#0868a8]">Franchise Opp.</Link>
          <Link href="/legal/business-policy" className="transition-colors hover:text-[#0868a8]">Legal Stuff</Link>
          <Link href="/contact" className="transition-colors hover:text-[#0868a8]">Contact</Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
          <div className="hidden items-center gap-4 text-[#475569] md:flex">
            <button type="button" className="text-[20px] transition-colors hover:text-[#0868a8]" aria-label="Search">⌕</button>
            <CartNavButton />
          </div>
          <a href="tel:01279-817451" className="rounded-full border border-[#bfdbfe] px-4 py-2 text-[#334155] transition-colors hover:border-[#0868a8] hover:text-[#0868a8]">01279-817451</a>
          <Link href="/b2b" className="rounded-full bg-[#0868a8] px-5 py-2 font-tech text-[12px] uppercase tracking-[0.2em] text-white transition hover:bg-[#054b7f]">Dealer Portal</Link>
        </div>
      </nav>
    </header>
  );
}
