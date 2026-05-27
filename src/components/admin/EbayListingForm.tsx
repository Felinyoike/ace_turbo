"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { StoredEbayListing, StoredTurbo } from "@/lib/persistence";

function generateDescription(turbo: StoredTurbo, type: "Turbo" | "CHRA") {
  const label = type === "CHRA" ? "CHRA Cartridge" : "Turbocharger";
  const lines = [
    `<h2>${turbo.make} ${turbo.model} ${turbo.engine} ${label}</h2>`,
    `<p><strong>Part Number:</strong> ${turbo.sku}</p>`,
    turbo.description ? `<p>${turbo.description}</p>` : "",
    `<ul>`,
    `<li><strong>Make:</strong> ${turbo.make}</li>`,
    `<li><strong>Model:</strong> ${turbo.model}</li>`,
    turbo.engine ? `<li><strong>Engine:</strong> ${turbo.engine}</li>` : "",
    turbo.year ? `<li><strong>Year:</strong> ${turbo.year}</li>` : "",
    turbo.bhp ? `<li><strong>BHP:</strong> ${turbo.bhp}</li>` : "",
    `</ul>`,
    `<p><strong>Condition:</strong> Remanufactured to OEM specification.</p>`,
    `<p>Free UK shipping. 30-day returns accepted.</p>`,
    `<p>Ace Turbo — Quality turbochargers and parts.</p>`
  ];
  return lines.filter(Boolean).join("\n");
}

export function EbayListingForm({
  initialListings,
  turbos,
  ebayConnected
}: {
  initialListings: StoredEbayListing[];
  turbos: StoredTurbo[];
  ebayConnected: boolean;
}) {
  const [listings, setListings] = useState(initialListings);
  const [connected, setConnected] = useState(ebayConnected);
  const [selectedTurboId, setSelectedTurboId] = useState<string>(turbos[0] ? String(turbos[0].id) : "");
  const [listingType, setListingType] = useState<"Turbo" | "CHRA">("Turbo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState<"New" | "Remanufactured" | "Used">("Remanufactured");
  const [quantity, setQuantity] = useState("1");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const selectedTurbo = useMemo(
    () => turbos.find((turbo) => turbo.id === Number(selectedTurboId)) || null,
    [selectedTurboId, turbos]
  );

  const hydrateFromTurbo = useCallback(
    (turbo: StoredTurbo | null, type: "Turbo" | "CHRA") => {
      if (!turbo) return;
      setTitle(`${turbo.make} ${turbo.model} ${turbo.engine} ${type === "CHRA" ? "CHRA cartridge" : "turbocharger"} ${turbo.sku}`);
      setDescription(generateDescription(turbo, type));
      setPrice(turbo.price.toFixed(2));
      if (turbo.stock) setQuantity(String(turbo.stock));
    },
    []
  );

  useEffect(() => {
    if (selectedTurbo) hydrateFromTurbo(selectedTurbo, listingType);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("connected") === "1") {
      setConnected(true);
      setMessage("Successfully connected to eBay.");
    }
    if (params.get("error")) {
      setMessage(`eBay connection error: ${params.get("error")}`);
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedTurbo) {
      setMessage("Select a turbo record first.");
      return;
    }

    setPending(true);
    setMessage("");

    const response = await fetch("/api/ebay", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        turboId: selectedTurbo.id,
        listingType,
        turboNumber: selectedTurbo.sku,
        title,
        description,
        price: parseFloat(price),
        condition,
        quantity: parseInt(quantity, 10) || 1
      })
    });

    const data = await response.json();
    setPending(false);

    if (!response.ok) {
      setMessage(data.error || "Could not create eBay listing.");
      return;
    }

    setListings((current) => [data.listing, ...current]);
    setMessage(
      data.listing.status === "submitted"
        ? `Listing submitted to eBay. Item ID: ${data.listing.ebayItemId}`
        : data.listing.status === "failed"
          ? `Listing failed: ${data.listing.error || "Unknown error"}`
          : "Draft created. Connect to eBay to submit live."
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="grid gap-6">
        <div className="rounded-[28px] border border-slate-800 bg-[#141b22] p-6 shadow-ace">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-100">eBay Connection</h2>
              <p className="text-sm text-slate-400">
                {connected
                  ? "✓ Connected — listings will be submitted live."
                  : "Not connected — listings will be saved as drafts."}
              </p>
            </div>
            {!connected && (
              <a
                className="rounded-2xl bg-[#0064d2] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#004fb4]"
                href="/api/ebay/auth"
              >
                Log in to eBay
              </a>
            )}
            {connected && (
              <span className="rounded-full bg-green-900/40 px-3 py-1 text-xs font-bold text-green-400">Connected</span>
            )}
          </div>
        </div>

        <form className="grid gap-4 rounded-[28px] border border-slate-800 bg-[#141b22] p-6 shadow-ace" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-black text-slate-100">Create listing</h2>

          <label className="grid gap-1 text-sm font-bold text-slate-200">
            Turbo record
            <select
              className="rounded-2xl border border-slate-700 bg-[#0e1419] px-3 py-2 text-slate-100"
              onChange={(event) => {
                const nextId = event.target.value;
                setSelectedTurboId(nextId);
                hydrateFromTurbo(turbos.find((turbo) => turbo.id === Number(nextId)) || null, listingType);
              }}
              value={selectedTurboId}
            >
              {turbos.map((turbo) => (
                <option key={turbo.id} value={turbo.id}>
                  {turbo.sku} · {turbo.make} {turbo.model} {turbo.engine}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 text-sm font-bold text-slate-200">
            Listing type
            <select
              className="rounded-2xl border border-slate-700 bg-[#0e1419] px-3 py-2 text-slate-100"
              onChange={(event) => {
                const nextType = event.target.value as "Turbo" | "CHRA";
                setListingType(nextType);
                hydrateFromTurbo(selectedTurbo, nextType);
              }}
              value={listingType}
            >
              <option value="Turbo">Turbo</option>
              <option value="CHRA">CHRA</option>
            </select>
          </label>

          <label className="grid gap-1 text-sm font-bold text-slate-200">
            Listing title
            <input
              className="rounded-2xl border border-slate-700 bg-[#0e1419] px-3 py-2 text-slate-100"
              maxLength={80}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Listing title (max 80 chars)"
              required
              value={title}
            />
            <span className="text-xs text-slate-500">{title.length}/80</span>
          </label>

          <label className="grid gap-1 text-sm font-bold text-slate-200">
            Description
            <textarea
              className="min-h-[120px] rounded-2xl border border-slate-700 bg-[#0e1419] px-3 py-2 text-sm text-slate-100"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="HTML description for eBay listing"
              required
              value={description}
            />
          </label>

          <div className="grid grid-cols-3 gap-3">
            <label className="grid gap-1 text-sm font-bold text-slate-200">
              Price (GBP)
              <input
                className="rounded-2xl border border-slate-700 bg-[#0e1419] px-3 py-2 text-slate-100"
                min="0.01"
                onChange={(event) => setPrice(event.target.value)}
                placeholder="0.00"
                required
                step="0.01"
                type="number"
                value={price}
              />
            </label>

            <label className="grid gap-1 text-sm font-bold text-slate-200">
              Condition
              <select
                className="rounded-2xl border border-slate-700 bg-[#0e1419] px-3 py-2 text-slate-100"
                onChange={(event) => setCondition(event.target.value as "New" | "Remanufactured" | "Used")}
                value={condition}
              >
                <option value="New">New</option>
                <option value="Remanufactured">Remanufactured</option>
                <option value="Used">Used</option>
              </select>
            </label>

            <label className="grid gap-1 text-sm font-bold text-slate-200">
              Quantity
              <input
                className="rounded-2xl border border-slate-700 bg-[#0e1419] px-3 py-2 text-slate-100"
                max="100"
                min="1"
                onChange={(event) => setQuantity(event.target.value)}
                required
                type="number"
                value={quantity}
              />
            </label>
          </div>

          <div className="rounded-[24px] border border-slate-800 bg-[#0f151b] p-4 text-sm text-slate-400">
            <p className="font-bold text-slate-200">Selected turbo</p>
            {selectedTurbo ? (
              <div className="mt-2 grid gap-1">
                <p>{selectedTurbo.sku} · {selectedTurbo.make} {selectedTurbo.model}</p>
                <p>Retail: £{selectedTurbo.price.toFixed(2)} {selectedTurbo.tradePrice ? ` · Trade: £${selectedTurbo.tradePrice.toFixed(2)}` : ""}</p>
                <p>Stock: {selectedTurbo.stock ?? "N/A"}</p>
              </div>
            ) : (
              <p className="mt-2">No turbo selected.</p>
            )}
          </div>

          <button
            className="rounded-2xl bg-aceBlue px-5 py-3 font-black text-[#081018] disabled:opacity-50"
            disabled={pending}
            type="submit"
          >
            {pending ? "Submitting..." : connected ? "Submit to eBay" : "Save as draft"}
          </button>
          {message ? <p className="mt-1 text-sm text-slate-400">{message}</p> : null}
        </form>
      </div>

      <div className="grid gap-4 content-start">
        <h2 className="text-2xl font-black text-slate-100">Listing history</h2>
        {listings.length === 0 && <p className="text-sm text-slate-500">No listings yet.</p>}
        {listings.map((listing) => (
          <article className="rounded-[24px] border border-slate-800 bg-[#141b22] p-5" key={listing.id}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-black text-slate-100">{listing.title}</h3>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  listing.status === "submitted"
                    ? "bg-green-900/40 text-green-400"
                    : listing.status === "failed"
                      ? "bg-red-900/40 text-red-400"
                      : "bg-yellow-900/40 text-yellow-400"
                }`}
              >
                {listing.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              {listing.listingType} · {listing.turboNumber}
            </p>
            {listing.ebayItemId ? (
              <a
                className="mt-1 block text-sm text-blue-400 hover:underline"
                href={`https://www.ebay.co.uk/itm/${listing.ebayItemId}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                View on eBay →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
