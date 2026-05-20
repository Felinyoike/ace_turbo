"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
  {
    src: "/images/hero-turbo.png",
    alt: "Precision-engineered turbocharger on workshop bench",
    filter: "grayscale(65%) contrast(1.1) brightness(0.6) saturate(1.2)"
  },
  {
    src: "/images/turbo1.png",
    alt: "High-performance turbocharger assembly in engine bay",
    filter: "grayscale(40%) contrast(1.2) brightness(0.8) saturate(1.4)"
  }
];

export function HeroImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className={`object-cover object-center transition-transform duration-[6000ms] ease-out ${
              idx === current ? "scale-105" : "scale-100"
            }`}
            style={{ filter: slide.filter }}
            priority={idx === 0}
            sizes="(max-width: 1024px) 0vw, 50vw"
          />
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 ${
              idx === current
                ? "h-0.5 w-6 bg-[#ff571a]"
                : "h-0.5 w-2 bg-[#929090]/50"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
