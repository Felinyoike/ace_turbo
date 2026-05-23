"use client";

import { useEffect, useState } from "react";

const slides = [
  { src: "/images/blueturbo.png", alt: "Precision-engineered turbocharger" },
  { src: "/images/blueturbo2.png", alt: "High-performance turbocharger assembly" },
];

export function HeroImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a1628]">
      {slides.map((slide, idx) => (
        <div
          key={slide.src}
          style={{
            position: "absolute",
            inset: 0,
            opacity: idx === current ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: idx === current ? 1 : 0,
          }}
          aria-hidden={idx !== current}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              filter: "brightness(0.72) saturate(1.15)",
              transform: idx === current ? "scale(1.05)" : "scale(1)",
              transition: "transform 6s ease-out",
            }}
          />
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              height: 2,
              width: idx === current ? 24 : 8,
              backgroundColor: idx === current ? "#60a5fa" : "rgba(255,255,255,0.4)",
              transition: "all 300ms",
              border: "none",
              cursor: "pointer",
            }}
            aria-label={"Slide " + (idx + 1)}
          />
        ))}
      </div>
    </div>
  );
}