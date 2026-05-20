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
    alternates: { canonical: `/turbos/brands/${brand.slug}` },
  };
}

export default function TurboBrandDetailPage({ params }: BrandPageProps) {
  const brand = getBrandBySlug(params.slug);

  if (!brand) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#131315]">
      <section className="relative overflow-hidden border-b border-[#27272A] bg-[#1c1b1d]">
        <div className="machine-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:px-12">
          <Link
            href="/turbos/brands"
            className="font-tech text-[11px] uppercase tracking-[0.22em] text-[#ffb59e] transition hover:text-[#ff571a]"
          >
            Back to Turbo Finder
          </Link>
          <p className="mt-6 font-tech text-[13px] uppercase tracking-[0.3em] text-[#ffb59e]">
            Identification Guide
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[#e5e1e4]">
            {brand.name.replace(" Turbos", "")} <span className="text-[#ff571a]">Turbos</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-7 text-[#c6c6cf]">
            {brand.summary}
          </p>
        </div>
      </section>

      <BrandDetailLayout brand={brand}>
        <section className="border border-[#27272A] bg-[#1c1b1d]">
          <div className="border-b border-[#27272A] bg-[#201f22] px-6 py-5">
            <p className="font-tech text-[10px] uppercase tracking-[0.24em] text-[#ffb59e]">
              How to Find the Number
            </p>
            <h2 className="mt-2 font-display text-[2rem] uppercase text-[#e5e1e4]">
              Part Number Details
            </h2>
          </div>

          <div className="grid gap-5 p-6">
            {brand.identificationGuide.map((paragraph, index) => (
              <article
                key={paragraph}
                className="grid gap-4 border border-[#27272A] bg-[#201f22] p-5 md:grid-cols-[64px_1fr]"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-[#5c4037] bg-[#1c1b1d] font-tech text-[11px] uppercase tracking-[0.18em] text-[#ff571a]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-[15px] leading-7 text-[#c6c6cf]">{paragraph}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 border border-[#27272A] bg-[#1c1b1d] p-6 md:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="font-tech text-[10px] uppercase tracking-[0.24em] text-[#ffb59e]">
              Data Plate Reference
            </p>
            <h2 className="mt-2 font-display text-[1.8rem] uppercase text-[#e5e1e4]">
              What to Check
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-[#929090]">
              The legacy Ace Turbo guide used manufacturer data plate examples to show exactly
              where the identifying number normally appears. Use the image as a quick visual
              reference, then match the number format against the notes above.
            </p>
          </div>
          <div className="border border-[#27272A] bg-[#201f22] p-4">
            <img
              src={brand.dataPlateImage}
              alt={brand.dataPlateAlt}
              className="h-auto max-h-[420px] w-full object-contain"
            />
          </div>
        </section>

        <section className="border border-[#5c4037] bg-[#201f22] p-6">
          <p className="font-tech text-[10px] uppercase tracking-[0.24em] text-[#ffb59e]">
            Need a Hand?
          </p>
          <p className="mt-3 text-[15px] leading-7 text-[#c6c6cf]">
            If you have trouble finding the correct turbo number after checking this guide,
            call us. Ace Turbo can identify the unit from your registration number or by
            asking a few simple vehicle questions.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="tel:01279-817451"
              className="bg-[#ff571a] px-5 py-3 font-tech text-[11px] uppercase tracking-[0.2em] text-[#3a0b00] transition hover:brightness-110"
            >
              Call 01279-817451
            </a>
            <Link
              href="/contact"
              className="border border-[#5c4037] px-5 py-3 font-tech text-[11px] uppercase tracking-[0.2em] text-[#e5e1e4] transition hover:bg-white/5"
            >
              Send Details
            </Link>
          </div>
        </section>
      </BrandDetailLayout>
    </main>
  );
}
