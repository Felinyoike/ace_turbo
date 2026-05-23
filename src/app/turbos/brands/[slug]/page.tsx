import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandDetailLayout } from "@/components/turbos/BrandDetailLayout";
import { getAllBrandSlugs, getBrandBySlug } from "@/lib/turbo-brands";

type BrandPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllBrandSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BrandPageProps): Metadata {
  const brand = getBrandBySlug(params.slug);

  if (!brand) {
    return {
      title: "Turbo Brand Not Found | Ace Turbo",
      alternates: { canonical: "/turbos/brands" },
    };
  }

  return {
    title: brand.seoTitle,
    description: brand.seoDescription,
    alternates: { canonical: "/turbos/brands/" + brand.slug },
  };
}

export default function TurboBrandDetailPage({ params }: BrandPageProps) {
  const brand = getBrandBySlug(params.slug);

  if (!brand) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <Link
            href="/turbos/brands"
            className="text-[11px] uppercase tracking-[0.22em] text-[#0868a8] transition hover:underline"
          >
            &larr; Back to Turbo Finder
          </Link>
          <p className="mt-6 text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">
            Identification Guide
          </p>
          <h1 className="mt-3 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            {brand.name.replace(" Turbos", "")} <span className="text-[#0868a8]">Turbos</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-7 text-[#475569]">
            {brand.summary}
          </p>
        </div>
      </section>

      <BrandDetailLayout brand={brand}>
        {/* Part Number Details */}
        <section className="border border-slate-200 bg-white">
          <div className="border-b border-slate-200 bg-[#f8fafc] px-6 py-5">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#0868a8]">
              How to Find the Number
            </p>
            <h2 className="mt-2 text-[1.75rem] font-extrabold uppercase text-[#0f172a]">
              Part Number Details
            </h2>
          </div>

          <div className="grid gap-5 p-6">
            {brand.identificationGuide.map((paragraph, index) => (
              <article
                key={paragraph}
                className="grid gap-4 border border-slate-200 bg-[#f8fafc] p-5 md:grid-cols-[64px_1fr]"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-[#bfdbfe] bg-white text-[11px] font-bold uppercase tracking-[0.18em] text-[#0868a8]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-[15px] leading-7 text-[#475569]">{paragraph}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Data Plate Reference */}
        <section className="grid gap-6 border border-slate-200 bg-white p-6 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#0868a8]">
              Data Plate Reference
            </p>
            <h2 className="mt-2 text-[1.5rem] font-extrabold uppercase text-[#0f172a]">
              What to Check
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-[#64748b]">
              The legacy Ace Turbo guide used manufacturer data plate examples to show exactly
              where the identifying number normally appears. Use the image as a quick visual
              reference, then match the number format against the notes above.
            </p>
          </div>
          <div className="border border-slate-200 bg-[#f8fafc] p-4">
            <img
              src={brand.dataPlateImage}
              alt={brand.dataPlateAlt}
              className="h-auto max-h-[420px] w-full object-contain"
            />
          </div>
        </section>

        {/* Need a Hand CTA */}
        <section className="border border-[#bfdbfe] bg-[#eff6ff] p-6">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#0868a8]">
            Need a Hand?
          </p>
          <p className="mt-3 text-[15px] leading-7 text-[#475569]">
            If you have trouble finding the correct turbo number after checking this guide,
            call us. Ace Turbo can identify the unit from your registration number or by
            asking a few simple vehicle questions.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="tel:01279-817451"
              className="bg-[#0868a8] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#054b7f]"
            >
              Call 01279-817451
            </a>
            <Link
              href="/contact"
              className="border border-[#bfdbfe] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0f172a] transition hover:bg-white"
            >
              Send Details
            </Link>
          </div>
        </section>
      </BrandDetailLayout>
    </main>
  );
}