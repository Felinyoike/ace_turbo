"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const page = `${window.location.pathname}${window.location.search}`;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent
      }),
      keepalive: true
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
