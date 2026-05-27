export const dynamic = "force-dynamic";
import { EbayListingForm } from "@/components/admin/EbayListingForm";
import { getTurbos } from "@/lib/data-access";
import { readAppData } from "@/lib/persistence";
import { isEbayConnected } from "@/lib/ebayAuth";

export default async function EbayPage() {
  const [listings, turbos, connected] = await Promise.all([
    readAppData().then((data) => data.ebayListings),
    getTurbos(),
    isEbayConnected()
  ]);
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10">
      <h1 className="text-4xl font-extrabold text-[#0f172a]">eBay Listing Manager</h1>
      <p className="mt-3 text-[#475569]">Select product records, generate Turbo or CHRA drafts, and submit live when connected to eBay.</p>
      <div className="mt-6">
        <EbayListingForm initialListings={listings} turbos={turbos} ebayConnected={connected} />
      </div>
    </main>
  );
}