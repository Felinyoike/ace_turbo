export const dynamic = "force-dynamic";
import { readAppData } from "@/lib/persistence";

export default async function AuditPage() {
  const audits = (await readAppData()).auditRuns;
  return (
    <main className="mx-auto max-w-[900px] px-4 py-10">
      <h1 className="text-4xl font-extrabold text-[#0f172a]">Security Audit</h1>
      <p className="mt-3 text-[#475569]">Track external audit scheduling before launch.</p>
      <div className="mt-6 grid gap-4">
        {audits.map((audit) => (
          <article className="border border-slate-200 bg-white p-5" key={audit.id}>
            <h2 className="font-bold text-[#0f172a]">{audit.provider}</h2>
            <p className="text-[#475569]">{audit.status}</p>
            <p className="text-sm text-[#64748b]">{audit.notes}</p>
          </article>
        ))}
      </div>
    </main>
  );
}