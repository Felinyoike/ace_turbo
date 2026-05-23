import Script from "next/script";
import { AdSlot } from "@/components/ads/AdSlot";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { getTurboContent } from "@/lib/turboContent";
import type { StoredTurbo } from "@/lib/persistence";

export function TurboDetail({
  turbo,
  price,
  isTrade
}: {
  turbo: StoredTurbo;
  price: number;
  isTrade: boolean;
}) {
  const content = getTurboContent(turbo);
  const turboName = turbo.make + " " + turbo.model + " " + turbo.engine + " Turbocharger";
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: turboName,
    sku: turbo.sku,
    image: content.gallery.map((item) => item.src),
    description: turbo.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price,
      availability: turbo.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Script id="product-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* Page header */}
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 md:px-6">
          <p className="text-[13px] uppercase tracking-[0.3em] text-[#0868a8]">{turbo.type}</p>
          <h1 className="mt-2 text-[clamp(1.8rem,4vw,3rem)] font-extrabold uppercase leading-tight text-[#0f172a]">
            {turbo.make} {turbo.model} {turbo.engine}
          </h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#475569]">{turbo.description}</p>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-[1180px] px-4 py-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_360px]">

          {/* Left: gallery + specs */}
          <section className="grid gap-8">
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_180px]">
              {/* Main image */}
              <article className="border border-slate-200 bg-white p-4">
                <div className="overflow-hidden border border-slate-100 bg-slate-50">
                  <img
                    alt={content.gallery[0].alt}
                    className="block aspect-[4/3] w-full object-cover"
                    src={content.gallery[0].src}
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {content.highlights.map((highlight) => (
                    <span
                      className="border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#054b7f]"
                      key={highlight}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </article>

              {/* Thumbnail gallery */}
              <div className="grid gap-4">
                {content.gallery.slice(1).map((image) => (
                  <article className="border border-slate-200 bg-white p-3" key={image.src}>
                    <div className="overflow-hidden border border-slate-100 bg-slate-50">
                      <img
                        alt={image.alt}
                        className="block aspect-[4/3] w-full object-cover"
                        src={image.src}
                      />
                    </div>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-[#64748b]">
                      {image.label}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Specs + warranty */}
            <article className="border border-slate-200 bg-white p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="mb-3 text-[17px] font-bold uppercase tracking-wide text-[#0f172a]">
                    Technical Specification
                  </h2>
                  <dl className="grid gap-3">
                    {content.technicalSpecs.map((item) => (
                      <div
                        className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 text-sm"
                        key={item.label}
                      >
                        <dt className="font-bold text-[#64748b]">{item.label}</dt>
                        <dd className="text-right text-[#0f172a]">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <h2 className="mb-3 text-[17px] font-bold uppercase tracking-wide text-[#0f172a]">
                    Warranty &amp; Service
                  </h2>
                  <p className="text-sm leading-7 text-[#475569]">{content.warrantySummary}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-[#475569]">
                    {content.serviceNotes.map((note) => (
                      <li key={note} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            {/* Info cards */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { title: "OEM References", items: content.oemNumbers },
                { title: "Included in Box", items: content.included },
                { title: "Fitment Notes", items: content.fitmentNotes },
                { title: "Inspection Checklist", items: content.inspectionChecklist }
              ].map((section) => (
                <article className="border border-slate-200 bg-white p-5" key={section.title}>
                  <h2 className="mb-3 text-[15px] font-bold uppercase tracking-wide text-[#0f172a]">
                    {section.title}
                  </h2>
                  <ul className="grid gap-2 text-sm leading-6 text-[#475569]">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Right: purchase sidebar */}
          <aside className="grid h-fit gap-4">
            <article className="border border-[#0868a8] bg-[#0f172a] p-7 text-white">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                {isTrade ? "Protected trade price" : "Retail price"}
              </p>
              <p className="mt-2 text-3xl font-black">GBP {price.toFixed(2)}</p>
              <p className="mb-6 text-[#bfdbfe]">
                {turbo.stock > 0 ? turbo.stock + " units in stock" : "Out of stock"}
              </p>
              <AddToCartButton turboId={turbo.id} />
            </article>
            <article className="border border-slate-200 bg-white p-5">
              <h2 className="mb-3 text-[15px] font-bold uppercase tracking-wide text-[#0f172a]">
                Workshop Guidance
              </h2>
              <ul className="grid gap-2 text-sm leading-6 text-[#475569]">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                  Confirm OE reference before dispatch.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                  Replace oil feed consumables where contamination is present.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0868a8]" />
                  Retain diagnostic notes for warranty-backed claims.
                </li>
              </ul>
            </article>
            <AdSlot slot="2480110013" />
          </aside>
        </div>
      </div>
    </main>
  );
}