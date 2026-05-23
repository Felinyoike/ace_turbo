import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#1e3a5f] bg-[#0f2844]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4 md:px-16">
        <div>
          <div className="mb-6 font-display text-[28px] uppercase text-[#60a5fa]">ACE TURBO</div>
          <p className="max-w-sm font-tech text-[12px] leading-relaxed text-[#94a3b8]">
            Precision engineered forced induction systems. Balanced to workshop tolerances for trade, retail and performance builds.
          </p>
        </div>

        <div className="space-y-4">
          <h5 className="font-tech text-[14px] uppercase tracking-[0.2em] text-[#60a5fa]">Resources</h5>
          <ul className="space-y-2">
            <li><Link href="/turbos" className="block text-[#94a3b8] transition-all hover:translate-x-1 hover:text-white">Technical Specs</Link></li>
            <li><Link href="/services/turbo-fitting" className="block text-[#94a3b8] transition-all hover:translate-x-1 hover:text-white">Installation Guides</Link></li>
            <li><Link href="/legal/business-policy" className="block text-[#94a3b8] transition-all hover:translate-x-1 hover:text-white">Service Manuals</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h5 className="font-tech text-[14px] uppercase tracking-[0.2em] text-[#60a5fa]">Company</h5>
          <ul className="space-y-2">
            <li><Link href="/franchise" className="block text-[#94a3b8] transition-all hover:translate-x-1 hover:text-white">About Engineering</Link></li>
            <li><Link href="/legal/delivery-policy" className="block text-[#94a3b8] transition-all hover:translate-x-1 hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/legal/refund" className="block text-[#94a3b8] transition-all hover:translate-x-1 hover:text-white">Terms of Sale</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h5 className="font-tech text-[14px] uppercase tracking-[0.2em] text-[#60a5fa]">Connect</h5>
          <div className="flex gap-4 text-[#94a3b8]">
            <a href="https://www.facebook.com/aceturbo.uk" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#93c5fd]" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/aceturbo-uk/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#93c5fd]" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.instagram.com/ace.turbouk/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#93c5fd]" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
          <p className="font-tech text-[12px] text-[#94a3b8]">contact@aceturbo.co.uk</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-[#1e3a5f] px-4 py-6 md:flex-row md:items-center md:justify-between md:px-16">
        <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-[#64748b]">© 2026 Ace Turbo Engineering. Precision tuned.</span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#0868a8] animate-pulse" />
          <span className="font-tech text-[10px] uppercase tracking-[0.18em] text-[#64748b]">System Status: Nominal</span>
        </div>
      </div>
    </footer>
  );
}
