import Link from "next/link";
import { CartNavButton } from "@/components/cart/CartNavButton";
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-outline-variant bg-[#131315]/92 backdrop-blur-md">
      <div className="header-grid" aria-hidden="true" />
      <nav className="relative mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 md:px-16 lg:flex-row lg:items-center lg:justify-between" aria-label="Main navigation">
        <Link href="/" className="flex flex-col items-center text-center uppercase leading-none lg:items-start lg:text-left" aria-label="Ace Turbo home">
          <span className="font-display text-[30px] font-extrabold tracking-[0.18em] text-[#e5e1e4]">ACE <span className="text-[#ff571a]">TURBO</span></span>
          <small className="mt-1 font-tech text-[10px] tracking-[0.26em] text-[#929090]">WORKSHOP-GRADE TURBO SUPPLY</small>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[15px] font-medium text-[#c8c6c5] lg:flex-1 lg:justify-center">
          <Link href="/" className="border-b-2 border-[#ff571a] pb-1 text-[#ff571a]">Home</Link>
          <Link href="/turbos/brands" className="transition-colors hover:text-[#ffdbd0]">Turbo Finder</Link>
          <Link href="/services" className="transition-colors hover:text-[#ffdbd0]">Services</Link>
          <Link href="/franchise" className="transition-colors hover:text-[#ffdbd0]">Franchise Opp.</Link>
          <Link href="/legal/business-policy" className="transition-colors hover:text-[#ffdbd0]">Legal Stuff</Link>
          <Link href="/contact" className="transition-colors hover:text-[#ffdbd0]">Contact</Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
          <div className="hidden items-center gap-4 text-[#c6c6cf] md:flex">
            <button type="button" className="text-[20px] transition-colors hover:text-[#ffb59e]" aria-label="Search">⌕</button>
            <CartNavButton />
          </div>
          <a href="tel:01279-817451" className="rounded-full border border-[#5c4037] px-4 py-2 text-[#e5e1e4] transition-colors hover:border-[#ff571a] hover:text-[#ffdbd0]">01279-817451</a>
          <Link href="/b2b" className="rounded-full bg-[#ff571a] px-5 py-2 font-tech text-[12px] uppercase tracking-[0.2em] text-[#3a0b00] transition hover:brightness-110">Dealer Portal</Link>
        </div>
      </nav>
    </header>
  );
}
