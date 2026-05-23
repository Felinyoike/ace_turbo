"use client";

import { useState } from "react";

export function AddToCartButton({ turboId }: { turboId: number }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function add() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ turboId, quantity: 1 })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Added to cart.");
        window.dispatchEvent(new CustomEvent("cart-updated"));
      } else {
        setMessage(data.error || "Failed to add.");
      }
    } catch {
      setMessage("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <button
        className="w-full bg-[#0868a8] px-4 py-3 font-bold text-white transition hover:bg-[#054b7f] disabled:opacity-50"
        onClick={add}
        type="button"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      {message ? <p className="text-sm text-[#475569]">{message}</p> : null}
    </div>
  );
}