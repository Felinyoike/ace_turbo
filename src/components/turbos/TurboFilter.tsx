export function TurboFilter({ defaults = {} }: { defaults?: Record<string, string> }) {
  const fields = ["Make", "Model", "Year", "Engine", "BHP"];

  return (
    <form
      className="grid gap-3 border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-6"
      action="/turbos"
    >
      {fields.map((label) => {
        const name = label.toLowerCase();
        return (
          <label className="grid gap-1 text-sm font-bold text-[#0f172a]" key={label}>
            {label}
            <input
              className="border border-slate-200 bg-white px-3 py-2 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0868a8] focus:outline-none"
              name={name}
              defaultValue={defaults[name] || ""}
            />
          </label>
        );
      })}
      <label className="grid gap-1 text-sm font-bold text-[#0f172a]">
        Part No.
        <input
          className="border border-slate-200 bg-white px-3 py-2 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0868a8] focus:outline-none"
          name="partNumber"
          defaultValue={defaults.partNumber || ""}
        />
      </label>
      <button
        className="bg-[#0868a8] px-4 py-3 font-bold uppercase tracking-wide text-white transition hover:bg-[#054b7f] md:col-span-6"
        type="submit"
      >
        Search Stock
      </button>
    </form>
  );
}