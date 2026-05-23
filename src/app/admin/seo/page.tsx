export const dynamic = "force-dynamic";
import { SeoLinkPanel } from "@/components/admin/SeoLinkPanel";
import { getTurbos } from "@/lib/data-access";

export default async function SeoPage() {
  const turbos = await getTurbos();
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-10">
      <h1 className="text-4xl font-extrabold text-[#0f172a]">SEO Link Generator</h1>
      <p className="mt-3 text-[#475569]">Create canonical product URLs and campaign-tagged links from live turbo records.</p>
      <div className="mt-6">
        <SeoLinkPanel turbos={turbos} />
      </div>
    </main>
  );
}