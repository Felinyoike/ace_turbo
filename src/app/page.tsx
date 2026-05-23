import { AdSlot } from "@/components/ads/AdSlot";
import { RegLookupForm } from "@/components/homepage/RegLookupForm";
import { HeroImageCarousel } from "@/components/homepage/HeroImageCarousel";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[720px] w-full overflow-hidden flex flex-col justify-center border-b border-slate-200">
        {/* Full-bleed background carousel */}
        <HeroImageCarousel />

        {/* Overlays for text legibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0a1628]/85 via-[#0a1628]/55 to-[#0a1628]/20 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a1628]/50 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-20 mx-auto w-full max-w-[1180px] px-6 py-20">
          <div className="flex flex-col justify-center max-w-[560px]">
            {/* Headline */}
            <h1 className="mb-4 text-[42px] leading-none md:text-[56px] lg:text-[72px] font-black uppercase tracking-tight text-white">
              ENGINEERED <br />
              <span className="text-[#60a5fa]">VELOCITY</span>
            </h1>
            <p className="mb-10 text-[15px] leading-relaxed max-w-md text-slate-300 font-medium">
              Precision-tuned forced induction systems for professional racers and performance enthusiasts.
            </p>

            {/* Form Component */}
            <div className="max-w-[420px]">
              <RegLookupForm />
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPONENTS SECTION */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 pb-32 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-[#0868a8] font-tech text-[11px] uppercase tracking-[0.24em] mb-2">Components</p>
            <h2 className="text-3xl md:text-[36px] font-black uppercase text-[#0f172a] tracking-widest">
              PRECISION CORE PARTS
            </h2>
          </div>
          <Link href="/turbos/brands" className="inline-flex items-center gap-2 border border-[#0868a8] bg-white px-5 py-2.5 font-tech text-[11px] uppercase tracking-[0.2em] text-[#0868a8] transition-all hover:bg-[#0868a8] hover:text-white mt-6 md:mt-0">
            VIEW FULL CATALOG <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <article className="border border-slate-200 bg-white p-6 hover:border-[#0868a8]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="h-36 mb-6 w-full relative overflow-hidden bg-slate-50 transition-all">
                <Image
                  src="/images/CHRA.png"
                  alt="CHRA — Central Housing Rotating Assembly"
                  fill
                  unoptimized
                  className="object-contain object-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-[18px] font-bold uppercase tracking-widest text-[#0f172a] mb-2">CHRA</h3>
              <p className="text-[12px] text-[#64748b] font-tech">Precision Balanced<br />Assemblies</p>
            </div>
            <Link href="/services/turbo-parts" className="mt-6 inline-block w-fit text-[10px] font-tech uppercase tracking-[0.15em] text-[#0868a8] border border-[#bfdbfe] px-4 py-2 hover:bg-[#0868a8] hover:border-[#0868a8] hover:text-white transition-all">
              SHOP UNITS
            </Link>
          </article>
          
          {/* Card 2 */}
          <article className="border border-slate-200 bg-white p-6 hover:border-[#0868a8]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="h-36 mb-6 w-full relative overflow-hidden bg-slate-50 transition-all">
                <Image
                  src="/images/Actuators.png"
                  alt="Actuators — Pneumatic and Electronic"
                  fill
                  unoptimized
                  className="object-contain object-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-[18px] font-bold uppercase tracking-widest text-[#0f172a] mb-2">ACTUATORS</h3>
              <p className="text-[12px] text-[#64748b] font-tech">Pneumatic &amp; Electronic</p>
            </div>
            <Link href="/services/turbo-parts" className="mt-6 inline-block w-fit text-[10px] font-tech uppercase tracking-[0.15em] text-[#0868a8] border border-[#bfdbfe] px-4 py-2 hover:bg-[#0868a8] hover:border-[#0868a8] hover:text-white transition-all">
              BROWSE MODELS
            </Link>
          </article>

          {/* Card 3 */}
          <article className="border border-slate-200 bg-white p-6 hover:border-[#0868a8]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[300px]">
             <div>
              <div className="h-36 mb-6 w-full relative overflow-hidden bg-slate-50 transition-all">
                <Image
                  src="/images/Wheels.png"
                  alt="Wheels — Billet Aluminum Compressor and Turbine Wheels"
                  fill
                  unoptimized
                  className="object-contain object-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-[18px] font-bold uppercase tracking-widest text-[#0f172a] mb-2">WHEELS</h3>
              <p className="text-[12px] text-[#64748b] font-tech">Billet Aluminum Machined</p>
            </div>
            <Link href="/services/turbo-parts" className="mt-6 inline-block w-fit text-[10px] font-tech uppercase tracking-[0.15em] text-[#0868a8] border border-[#bfdbfe] px-4 py-2 hover:bg-[#0868a8] hover:border-[#0868a8] hover:text-white transition-all">
              SPEC SHEETS
            </Link>
          </article>

          {/* Card 4 */}
          <article className="border border-slate-200 bg-white p-6 hover:border-[#0868a8]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[300px]">
             <div>
              <div className="h-36 mb-6 w-full relative overflow-hidden bg-slate-50 transition-all">
                <Image
                  src="/images/VNT rings.png"
                  alt="VNT Rings — Variable Nozzle Ring Assemblies"
                  fill
                  unoptimized
                  className="object-contain object-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-[18px] font-bold uppercase tracking-widest text-[#0f172a] mb-2">VNT RINGS</h3>
              <p className="text-[12px] text-[#64748b] font-tech">Nozzle Ring Assemblies</p>
            </div>
            <Link href="/services/turbo-parts" className="mt-6 inline-block w-fit text-[10px] font-tech uppercase tracking-[0.15em] text-[#0868a8] border border-[#bfdbfe] px-4 py-2 hover:bg-[#0868a8] hover:border-[#0868a8] hover:text-white transition-all">
              VNT GUIDE
            </Link>
          </article>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-[#0868a8] font-tech text-[11px] uppercase tracking-[0.24em] mb-2">Process</p>
            <h2 className="text-3xl md:text-[36px] font-black uppercase text-[#0f172a] tracking-widest">
              HOW IT WORKS
            </h2>
          </div>
          <Link href="/contact" className="font-tech text-xs uppercase tracking-[0.15em] text-[#64748b] hover:text-[#0868a8] transition-colors mt-6 md:mt-0 flex items-center gap-2">
            GET A FREE QUOTE <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="border border-slate-200 bg-white p-8 relative hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <span className="absolute top-6 right-6 font-tech text-[11px] text-[#0868a8] tracking-widest">01</span>
            <div className="w-10 h-10 border border-[#0868a8]/30 bg-[#eff6ff] flex items-center justify-center mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="2" strokeLinecap="square">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3-8.61A2 2 0 0 1 4 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3 className="font-tech text-[13px] uppercase tracking-widest text-[#0f172a] mb-3">CONTACT US</h3>
            <p className="text-[13px] text-[#64748b] leading-loose">
              Call <a href="tel:01279-817451" className="text-[#0868a8] hover:text-[#054b7f] transition-colors">01279-817451</a> or email us for a free, no-obligation quote. We arrange next-day UK-wide courier pickup from your home, garage, or workplace.
            </p>
          </div>

          <div className="border border-slate-200 bg-white p-8 relative hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <span className="absolute top-6 right-6 font-tech text-[11px] text-[#0868a8] tracking-widest">02</span>
            <div className="w-10 h-10 border border-[#0868a8]/30 bg-[#eff6ff] flex items-center justify-center mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="2" strokeLinecap="square">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <h3 className="font-tech text-[13px] uppercase tracking-widest text-[#0f172a] mb-3">STRIP &amp; ASSESS</h3>
            <p className="text-[13px] text-[#64748b] leading-loose">
              We fully strip, clean and inspect your unit. Any damage outside a standard rebuild is reported before we proceed. No unauthorised work &mdash; that&apos;s our price promise.
            </p>
          </div>

          <div className="border border-slate-200 bg-white p-8 relative hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <span className="absolute top-6 right-6 font-tech text-[11px] text-[#0868a8] tracking-widest">03</span>
            <div className="w-10 h-10 border border-[#0868a8]/30 bg-[#eff6ff] flex items-center justify-center mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="2" strokeLinecap="square">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </div>
            <h3 className="font-tech text-[13px] uppercase tracking-widest text-[#0f172a] mb-3">REMANUFACTURE &amp; RETURN</h3>
            <p className="text-[13px] text-[#64748b] leading-loose">
              Precision remanufactured using UK-sourced OEM parts, balanced on our state-of-the-art vibration rig, then dispatched back to you. Typical turnaround: <span className="text-[#0f172a] font-medium">4&ndash;5 working days</span>.
            </p>
          </div>
        </div>

        <div className="border border-dashed border-[#bfdbfe] bg-[#eff6ff] p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#0868a8] mb-2">SHIPPING YOUR UNIT</p>
          <p className="text-[13px] text-[#475569] leading-loose">
            Please drain the turbo of oil and pack it securely &mdash; housing with actuator only. Where manufacturer product bulletins apply for known design faults, we include full rectification instructions.
          </p>
        </div>
      </section>

      {/* 4. SUPPORTED VEHICLE MAKES */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 border-b border-slate-200">
        <div className="mb-10">
          <p className="text-[#0868a8] font-tech text-[11px] uppercase tracking-[0.24em] mb-2">Coverage</p>
          <h2 className="text-3xl md:text-[36px] font-black uppercase text-[#0f172a] tracking-widest">
            SUPPORTED VEHICLE MAKES
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "Alfa Romeo","Audi","Bentley","BMW","Buick","Chevrolet","Chrysler","Citroen",
            "Cupra","Dacia","Daewoo","Daihatsu","Dodge","Ferrari","Fiat","Ford","Honda",
            "Hyundai","Isuzu","Iveco","Jaguar","Jeep","Kia","Lancia","Land Rover","LDV",
            "Lotus","Maserati","Mazda","Mercedes-Benz","MG","Mini","Mitsubishi","Nissan",
            "Opel","Peugeot","Pontiac","Porsche","Renault","Rover","Roewe","Saab","Seat",
            "Skoda","Smart","SsangYong","Subaru","Suzuki","Toyota","Vauxhall","Volkswagen","Volvo"
          ].map((make) => (
            <span
              key={make}
              className="border border-slate-200 bg-white px-3 py-1.5 font-tech text-[11px] uppercase tracking-[0.15em] text-[#64748b] hover:border-[#0868a8]/40 hover:text-[#0868a8] transition-colors cursor-default"
            >
              {make}
            </span>
          ))}
        </div>
      </section>

      {/* 5. FEATURES & QUOTE SECTION */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Features Grid */}
          <div className="flex flex-col justify-between">
<div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12">
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" className="mb-4">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                <h4 className="text-[12px] font-tech uppercase tracking-widest text-[#0868a8] mb-3">QUALITY PRODUCTION</h4>
                <p className="text-[13px] text-[#64748b] leading-loose">
                  Every unit undergoes triple-axis balancing and flow-bench testing to exceed OEM specifications.
                </p>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" className="mb-4">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M7 15h0M2 9.5h20" />
                </svg>
                <h4 className="text-[12px] font-tech uppercase tracking-widest text-[#0868a8] mb-3">FREE QUOTE</h4>
                <p className="text-[13px] text-[#64748b] leading-loose">
                  Transparent pricing with detailed breakdowns. No hidden fees or unexpected surcharges.
                </p>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" className="mb-4">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                <h4 className="text-[12px] font-tech uppercase tracking-widest text-[#0868a8] mb-3">PROFESSIONAL GEAR</h4>
                <p className="text-[13px] text-[#64748b] leading-loose">
                  Utilizing industry-leading Schenck and CIMAT equipment for clinical accuracy.
                </p>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" className="mb-4">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                </svg>
                <h4 className="text-[12px] font-tech uppercase tracking-widest text-[#0868a8] mb-3">NO HIDDEN CHARGES</h4>
                <p className="text-[13px] text-[#64748b] leading-loose">
                  We believe in honest engineering. The price we quote is the price you pay for precision.
                </p>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" className="mb-4">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <h4 className="text-[12px] font-tech uppercase tracking-widest text-[#0868a8] mb-3">QUALITY PARTS</h4>
                <p className="text-[13px] text-[#64748b] leading-loose">
                  12 months parts &amp; labour warranty on all remanufactured units. Replacement components sourced exclusively from UK-based OEM suppliers.
                </p>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0868a8" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" className="mb-4">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <h4 className="text-[12px] font-tech uppercase tracking-widest text-[#0868a8] mb-3">FAST TURNAROUND</h4>
                <p className="text-[13px] text-[#64748b] leading-loose">
                  In-stock units dispatched same day. Remanufacturing collections arranged UK-wide with a typical 4&ndash;5 working day end-to-end turnaround.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <p className="text-[10px] font-tech uppercase tracking-[0.2em] text-[#94a3b8] mb-8">AUTHORIZED SERVICE &amp; COMPONENTS</p>
              <div className="flex flex-wrap items-center gap-10">
                <span className="font-bold text-xl tracking-wider text-[#cbd5e1] uppercase">GARRETT</span>
                <span className="font-bold text-xl tracking-wider text-[#cbd5e1] uppercase">BORGWARNER</span>
                <span className="font-black text-2xl tracking-widest text-[#cbd5e1] uppercase italic">IHI</span>
                <span className="font-bold text-xl tracking-wider text-[#cbd5e1] uppercase">MITSUBISHI</span>
                <span className="font-bold text-xl tracking-wider text-[#cbd5e1] uppercase">HOLSET</span>
              </div>
            </div>
          </div>

          {/* Quote Form */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-[#0868a8] p-10 md:p-12 shadow-lg relative overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 p-8 origin-top-right rotate-45 border-b-[40px] border-b-transparent border-r-[40px] border-r-slate-50" />
            <h3 className="text-2xl font-black uppercase text-[#0f172a] mb-2 tracking-wider">QUOTE REQUEST</h3>
            <p className="text-[12px] font-tech uppercase tracking-widest text-[#64748b] mb-8">24-Hour Response Guarantee</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-tech uppercase tracking-widest text-[#64748b] mb-2 block">FULL NAME</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 text-[#0f172a] outline-none focus:border-[#0868a8] transition-colors" />
                </div>
                <div>
                  <label className="text-[9px] font-tech uppercase tracking-widest text-[#64748b] mb-2 block">PHONE</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 text-[#0f172a] outline-none focus:border-[#0868a8] transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="text-[9px] font-tech uppercase tracking-widest text-[#64748b] mb-2 block">EMAIL ADDRESS</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-200 p-3 text-[#0f172a] outline-none focus:border-[#0868a8] transition-colors" />
              </div>
              
              <div>
                <label className="text-[9px] font-tech uppercase tracking-widest text-[#64748b] mb-2 block">VEHICLE/ENGINE MODEL</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 text-[#0f172a] outline-none focus:border-[#0868a8] transition-colors" />
              </div>

              <div>
                <label className="text-[9px] font-tech uppercase tracking-widest text-[#64748b] mb-2 block">REQUIREMENT DETAILS</label>
                <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 p-3 text-[#0f172a] outline-none focus:border-[#0868a8] transition-colors resize-none" />
              </div>

              <button className="w-full bg-[#0868a8] hover:bg-[#054b7f] text-white text-[12px] font-tech uppercase tracking-[0.2em] py-5 font-bold transition-all mt-4">
                SUBMIT TECHNICAL REQUEST
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* AD SLOT PLACEHOLDER IF NEEDED */}
      <section className="mx-auto max-w-[1180px] px-4 pb-8">
        <AdSlot slot="2480110011" />
      </section>

    </main>
  );
}
