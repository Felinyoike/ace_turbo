"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function CartNavButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/cart")
      .then((r) => r.json())
      .then((data: { items?: unknown[] }) => {
        setCount(Array.isArray(data?.items) ? data.items.length : 0);
      })
      .catch(() => {});
  }, []);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center text-[#c6c6cf] transition-colors hover:text-[#ffb59e]"
      aria-label={`Cart${count > 0 ? ` — ${count} item${count !== 1 ? "s" : ""}` : ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      {count > 0 && (
        <span
          className="absolute -right-2 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#ff571a] text-[9px] font-bold leading-none text-white"
          aria-hidden="true"
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
