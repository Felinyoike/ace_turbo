export const dynamic = "force-dynamic";
import type { StoredLookup } from "@/lib/persistence";
import { getLookupRecords } from "@/lib/data-access";

export default async function CarLookupViewerPage() {
  const lookups = await getLookupRecords();
  return (
    <main className="mx-auto max-w-[900px] px-4 py-10">
      <h1 className="mb-4 text-4xl font-extrabold text-[#0f172a]">Car Reg Lookup Viewer</h1>
      <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#0f172a] text-white">
            <tr>
              <th className="p-3">Reg</th>
              <th className="p-3">Source</th>
              <th className="p-3">IP</th>
              <th className="p-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {lookups.map((lookup: StoredLookup) => (
              <tr className="border-t border-slate-200 text-[#475569]" key={lookup.id}>
                <td className="p-3 font-medium text-[#0f172a]">{lookup.registration}</td>
                <td className="p-3">{lookup.source}</td>
                <td className="p-3">{lookup.userIp || "N/A"}</td>
                <td className="p-3">{new Date(lookup.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}