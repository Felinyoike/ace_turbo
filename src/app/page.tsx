import { AdSlot } from "@/components/ads/AdSlot";
import { RegLookupForm } from "@/components/homepage/RegLookupForm";
import { HeroImageCarousel } from "@/components/homepage/HeroImageCarousel";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-[#0B0B0C] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[720px] w-full overflow-hidden flex flex-col justify-center border-b border-[#2C2C30]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#ff571a]/10 via-[#0B0B0C] to-[#0B0B0C] z-0" />
        
        <div className="relative z-10 mx-auto w-full max-w-[1180px] grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 py-20 pb-20">
          <div className="flex flex-col justify-center">
            {/* Headline */}
            <h1 className="mb-4 text-[42px] leading-none md:text-[56px] lg:text-[72px] font-black uppercase tracking-tight text-white">
              ENGINEERED <br />
              <span className="text-[#ff571a]">VELOCITY</span>
            </h1>
            <p className="mb-10 text-[15px] leading-relaxed max-w-md text-[#929090] font-medium">
              Precision-tuned forced induction systems for professional racers and performance enthusiasts.
            </p>

            {/* Form Component (Matches the dark grey box in design) */}
            <div className="max-w-[420px]">
              <RegLookupForm />
            </div>
          </div>
          <div className="hidden lg:block relative min-h-[500px] w-full">
            {/* 
              Image styling to match the dark technical theme: 
              - Fade from left to blend with text
              - Color tint overlay 
              - Grayscale and contrast modifications
            */}
            <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-[#ff571a]/10 mix-blend-color pointer-events-none" />
            
            <HeroImageCarousel />
          </div>
        </div>
      </section>

      {/* 2. COMPONENTS SECTION */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 pb-32 border-b border-[#1E1E22]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-[#ff571a] font-tech text-[11px] uppercase tracking-[0.24em] mb-2">Components</p>
            <h2 className="text-3xl md:text-[36px] font-black uppercase text-white tracking-widest">
              PRECISION CORE PARTS
            </h2>
          </div>
          <Link href="/turbos" className="font-tech text-xs uppercase tracking-[0.15em] text-[#929090] hover:text-[#ff571a] transition-colors mt-6 md:mt-0 flex items-center gap-2">
            VIEW FULL CATALOG <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <article className="border border-[#1E1E22] bg-[#121214] p-6 hover:border-[#38383F] transition-colors group flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="h-36 mb-6 w-full relative overflow-hidden bg-[#0d0d0f] group-hover:brightness-110 transition-all">
                <Image
                  src="/images/components/chra.svg"
                  alt="CHRA — Central Housing Rotating Assembly"
                  fill
                  className="object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-[18px] font-bold uppercase tracking-widest text-[#E5E1E4] mb-2">CHRA</h3>
              <p className="text-[12px] text-[#929090] font-tech">Precision Balanced<br />Assemblies</p>
            </div>
            <Link href="/services/turbo-parts" className="mt-6 inline-block w-fit text-[10px] font-tech uppercase tracking-[0.15em] text-white border border-[#3C3C42] px-4 py-2 hover:bg-[#ff571a] hover:border-[#ff571a] transition-all">
              SHOP UNITS
            </Link>
          </article>
          
          {/* Card 2 */}
          <article className="border border-[#1E1E22] bg-[#121214] p-6 hover:border-[#38383F] transition-colors group flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="h-36 mb-6 w-full relative overflow-hidden bg-[#0d0d0f] group-hover:brightness-110 transition-all">
                <Image
                  src="/images/components/actuator.svg"
                  alt="Actuators — Pneumatic and Electronic"
                  fill
                  className="object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-[18px] font-bold uppercase tracking-widest text-[#E5E1E4] mb-2">ACTUATORS</h3>
              <p className="text-[12px] text-[#929090] font-tech">Pneumatic &amp; Electronic</p>
            </div>
            <Link href="/services/turbo-parts" className="mt-6 inline-block w-fit text-[10px] font-tech uppercase tracking-[0.15em] text-white border border-[#3C3C42] px-4 py-2 hover:bg-[#ff571a] hover:border-[#ff571a] transition-all">
              BROWSE MODELS
            </Link>
          </article>

          {/* Card 3 */}
          <article className="border border-[#1E1E22] bg-[#121214] p-6 hover:border-[#38383F] transition-colors group flex flex-col justify-between min-h-[300px]">
             <div>
              <div className="h-36 mb-6 w-full relative overflow-hidden bg-[#0d0d0f] group-hover:brightness-110 transition-all">
                <Image
                  src="/images/components/wheel.svg"
                  alt="Wheels — Billet Aluminum Compressor and Turbine Wheels"
                  fill
                  className="object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-[18px] font-bold uppercase tracking-widest text-[#E5E1E4] mb-2">WHEELS</h3>
              <p className="text-[12px] text-[#929090] font-tech">Billet Aluminum Machined</p>
            </div>
            <Link href="/services/turbo-parts" className="mt-6 inline-block w-fit text-[10px] font-tech uppercase tracking-[0.15em] text-white border border-[#3C3C42] px-4 py-2 hover:bg-[#ff571a] hover:border-[#ff571a] transition-all">
              SPEC SHEETS
            </Link>
          </article>

          {/* Card 4 */}
          <article className="border border-[#1E1E22] bg-[#121214] p-6 hover:border-[#38383F] transition-colors group flex flex-col justify-between min-h-[300px]">
             <div>
              <div className="h-36 mb-6 w-full relative overflow-hidden bg-[#0d0d0f] group-hover:brightness-110 transition-all">
                <Image
                  src="/images/components/vnt-ring.svg"
                  alt="VNT Rings — Variable Nozzle Ring Assemblies"
                  fill
                  className="object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-[18px] font-bold uppercase tracking-widest text-[#E5E1E4] mb-2">VNT RINGS</h3>
              <p className="text-[12px] text-[#929090] font-tech">Nozzle Ring Assemblies</p>
            </div>
            <Link href="/services/turbo-parts" className="mt-6 inline-block w-fit text-[10px] font-tech uppercase tracking-[0.15em] text-white border border-[#3C3C42] px-4 py-2 hover:bg-[#ff571a] hover:border-[#ff571a] transition-all">
              VNT GUIDE
            </Link>
          </article>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 border-b border-[#1E1E22]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-[#ff571a] font-tech text-[11px] uppercase tracking-[0.24em] mb-2">Process</p>
            <h2 className="text-3xl md:text-[36px] font-black uppercase text-white tracking-widest">
              HOW IT WORKS
            </h2>
          </div>
          <Link href="/contact" className="font-tech text-xs uppercase tracking-[0.15em] text-[#929090] hover:text-[#ff571a] transition-colors mt-6 md:mt-0 flex items-center gap-2">
            GET A FREE QUOTE <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="border border-[#1E1E22] bg-[#121214] p-8 relative">
            <span className="absolute top-6 right-6 font-tech text-[11px] text-[#ff571a] tracking-widest">01</span>
            <div className="w-10 h-10 border border-[#ff571a]/30 flex items-center justify-center mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff571a" strokeWidth="2" strokeLinecap="square">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3-8.61A2 2 0 0 1 4 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3 className="font-tech text-[13px] uppercase tracking-widest text-[#E5E1E4] mb-3">CONTACT US</h3>
            <p className="text-[13px] text-[#929090] leading-loose">
              Call <a href="tel:01279-817451" className="text-[#ffb59e] hover:text-[#ff571a] transition-colors">01279-817451</a> or email us for a free, no-obligation quote. We arrange next-day UK-wide courier pickup from your home, garage, or workplace.
            </p>
          </div>

          <div className="border border-[#1E1E22] bg-[#121214] p-8 relative">
            <span className="absolute top-6 right-6 font-tech text-[11px] text-[#ff571a] tracking-widest">02</span>
            <div className="w-10 h-10 border border-[#ff571a]/30 flex items-center justify-center mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff571a" strokeWidth="2" strokeLinecap="square">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <h3 className="font-tech text-[13px] uppercase tracking-widest text-[#E5E1E4] mb-3">STRIP &amp; ASSESS</h3>
            <p className="text-[13px] text-[#929090] leading-loose">
              We fully strip, clean and inspect your unit. Any damage outside a standard rebuild is reported before we proceed. No unauthorised work &mdash; that&apos;s our price promise.
            </p>
          </div>

          <div className="border border-[#1E1E22] bg-[#121214] p-8 relative">
            <span className="absolute top-6 right-6 font-tech text-[11px] text-[#ff571a] tracking-widest">03</span>
            <div className="w-10 h-10 border border-[#ff571a]/30 flex items-center justify-center mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff571a" strokeWidth="2" strokeLinecap="square">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </div>
            <h3 className="font-tech text-[13px] uppercase tracking-widest text-[#E5E1E4] mb-3">REMANUFACTURE &amp; RETURN</h3>
            <p className="text-[13px] text-[#929090] leading-loose">
              Precision remanufactured using UK-sourced OEM parts, balanced on our state-of-the-art vibration rig, then dispatched back to you. Typical turnaround: <span className="text-[#e5e1e4]">4&ndash;5 working days</span>.
            </p>
          </div>
        </div>

        <div className="border border-dashed border-[#2C2C30] bg-[#121214]/50 p-6">
          <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#929090] mb-2">SHIPPING YOUR UNIT</p>
          <p className="text-[13px] text-[#929090] leading-loose">
            Please drain the turbo of oil and pack it securely &mdash; housing with actuator only. Where manufacturer product bulletins apply for known design faults, we include full rectification instructions.
          </p>
        </div>
      </section>

      {/* 4. SUPPORTED VEHICLE MAKES */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 border-b border-[#1E1E22]">
        <div className="mb-10">
          <p className="text-[#ff571a] font-tech text-[11px] uppercase tracking-[0.24em] mb-2">Coverage</p>
          <h2 className="text-3xl md:text-[36px] font-black uppercase text-white tracking-widest">
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
              className="border border-[#2C2C30] bg-[#121214] px-3 py-1.5 font-tech text-[11px] uppercase tracking-[0.15em] text-[#929090] hover:border-[#ff571a]/40 hover:text-[#e5e1e4] transition-colors cursor-default"
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffb59e" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" className="mb-4">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                <h4 className="text-[12px] font-tech uppercase tracking-widest text-[#ffb59e] mb-3">QUALITY PRODUCTION</h4>
                <p className="text-[13px] text-[#929090] leading-loose">
                  Every unit undergoes triple-axis balancing and flow-bench testing to exceed OEM specifications.
                </p>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffb59e" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" className="mb-4">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M7 15h0M2 9.5h20" />
                </svg>
                <h4 className="text-[12px] font-tech uppercase tracking-widest text-[#ffb59e] mb-3">FREE QUOTE</h4>
                <p className="text-[13px] text-[#929090] leading-loose">
                  Transparent pricing with detailed breakdowns. No hidden fees or unexpected surcharges.
                </p>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffb59e" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" className="mb-4">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                <h4 className="text-[12px] font-tech uppercase tracking-widest text-[#ffb59e] mb-3">PROFESSIONAL GEAR</h4>
                <p className="text-[13px] text-[#929090] leading-loose">
                  Utilizing industry-leading Schenck and CIMAT equipment for clinical accuracy.
                </p>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffb59e" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" className="mb-4">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                </svg>
                <h4 className="text-[12px] font-tech uppercase tracking-widest text-[#ffb59e] mb-3">NO HIDDEN CHARGES</h4>
                <p className="text-[13px] text-[#929090] leading-loose">
                  We believe in honest engineering. The price we quote is the price you pay for precision.
                </p>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffb59e" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" className="mb-4">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <h4 className="text-[12px] font-tech uppercase tracking-widest text-[#ffb59e] mb-3">QUALITY PARTS</h4>
                <p className="text-[13px] text-[#929090] leading-loose">
                  12 months parts &amp; labour warranty on all remanufactured units. Replacement components sourced exclusively from UK-based OEM suppliers.
                </p>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffb59e" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" className="mb-4">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <h4 className="text-[12px] font-tech uppercase tracking-widest text-[#ffb59e] mb-3">FAST TURNAROUND</h4>
                <p className="text-[13px] text-[#929090] leading-loose">
                  In-stock units dispatched same day. Remanufacturing collections arranged UK-wide with a typical 4&ndash;5 working day end-to-end turnaround.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <p className="text-[10px] font-tech uppercase tracking-[0.2em] text-[#696970] mb-8">AUTHORIZED SERVICE &amp; COMPONENTS</p>
              <div className="flex flex-wrap items-center gap-10">
                <span className="font-bold text-xl tracking-wider text-[#353540] uppercase">GARRETT</span>
                <span className="font-bold text-xl tracking-wider text-[#353540] uppercase">BORGWARNER</span>
                <span className="font-black text-2xl tracking-widest text-[#353540] uppercase italic">IHI</span>
                <span className="font-bold text-xl tracking-wider text-[#353540] uppercase">MITSUBISHI</span>
                <span className="font-bold text-xl tracking-wider text-[#353540] uppercase">HOLSET</span>
              </div>
            </div>
          </div>

          {/* Quote Form */}
          <div className="bg-[#18181A] border-l-4 border-l-[#ff571a] p-10 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 origin-top-right rotate-45 border-b-[40px] border-b-transparent border-r-[40px] border-r-[#101012]" />
            <h3 className="text-2xl font-black uppercase text-[#E5E1E4] mb-2 tracking-wider">QUOTE REQUEST</h3>
            <p className="text-[12px] font-tech uppercase tracking-widest text-[#929090] mb-8">24-Hour Response Guarantee</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-tech uppercase tracking-widest text-[#929090] mb-2 block">FULL NAME</label>
                  <input type="text" className="w-full bg-[#0B0B0C] border border-[#2C2C30] p-3 text-[#E5E1E4] outline-none focus:border-[#ff571a] transition-colors" />
                </div>
                <div>
                  <label className="text-[9px] font-tech uppercase tracking-widest text-[#929090] mb-2 block">PHONE</label>
                  <input type="text" className="w-full bg-[#0B0B0C] border border-[#2C2C30] p-3 text-[#E5E1E4] outline-none focus:border-[#ff571a] transition-colors" />
                </div>
              </div>
              
              <div>
                <label className="text-[9px] font-tech uppercase tracking-widest text-[#929090] mb-2 block">EMAIL ADDRESS</label>
                <input type="email" className="w-full bg-[#0B0B0C] border border-[#2C2C30] p-3 text-[#E5E1E4] outline-none focus:border-[#ff571a] transition-colors" />
              </div>
              
              <div>
                <label className="text-[9px] font-tech uppercase tracking-widest text-[#929090] mb-2 block">VEHICLE/ENGINE MODEL</label>
                <input type="text" className="w-full bg-[#0B0B0C] border border-[#2C2C30] p-3 text-[#E5E1E4] outline-none focus:border-[#ff571a] transition-colors" />
              </div>

              <div>
                <label className="text-[9px] font-tech uppercase tracking-widest text-[#929090] mb-2 block">REQUIREMENT DETAILS</label>
                <textarea rows={4} className="w-full bg-[#0B0B0C] border border-[#2C2C30] p-3 text-[#E5E1E4] outline-none focus:border-[#ff571a] transition-colors resize-none" />
              </div>

              <button className="w-full bg-[#ffb59e] hover:bg-[#ff8f6b] text-[#2C1910] text-[12px] font-tech uppercase tracking-[0.2em] py-5 font-bold transition-all mt-4">
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
