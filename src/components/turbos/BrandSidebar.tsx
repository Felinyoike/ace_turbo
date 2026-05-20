"use client";

import { useState } from "react";

interface BrandSidebarProps {
  className?: string;
}

/**
 * BrandSidebar Component
 * 
 * Reusable sidebar containing vehicle search forms and manufacturer information.
 * Used on brand detail pages to provide multiple search methods for finding turbos.
 * 
 * Features:
 * - Registration number search form
 * - Turbo number search form
 * - Vehicle selection form (make, model, year, engine size, BHP)
 * - Manufacturer logos grid
 * - BOOSTFORGE theme styling with dark backgrounds and orange accents
 * - Responsive design
 */
export function BrandSidebar({ className = "" }: BrandSidebarProps) {
  const [regNumber, setRegNumber] = useState("");
  const [turboNumber, setTurboNumber] = useState("");
  const [vehicleData, setVehicleData] = useState({
    make: "",
    model: "",
    year: "",
    engineSize: "",
    bhp: "",
  });

  const handleRegSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration number search
    console.log("Searching by registration:", regNumber);
  };

  const handleTurboSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement turbo number search
    console.log("Searching by turbo number:", turboNumber);
  };

  const handleVehicleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement vehicle search
    console.log("Searching by vehicle:", vehicleData);
  };

  return (
    <aside className={`space-y-6 ${className}`}>
      {/* Registration Number Search */}
      <div className="border border-[#27272A] bg-[#201f22] p-6">
        <h4 className="mb-4 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
          Search by Registration
        </h4>
        <form onSubmit={handleRegSearch} className="space-y-3">
          <input
            type="text"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
            placeholder="Enter reg number"
            className="w-full border border-[#27272A] bg-[#1c1b1d] px-4 py-3 text-[14px] text-[#e5e1e4] placeholder-[#5c4037] transition focus:border-[#ff571a] focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[#ff571a] py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#3a0b00] transition hover:brightness-110"
          >
            Search
          </button>
        </form>
      </div>

      {/* Turbo Number Search */}
      <div className="border border-[#27272A] bg-[#201f22] p-6">
        <h4 className="mb-4 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
          Search by Turbo Number
        </h4>
        <form onSubmit={handleTurboSearch} className="space-y-3">
          <input
            type="text"
            value={turboNumber}
            onChange={(e) => setTurboNumber(e.target.value)}
            placeholder="Enter turbo number"
            className="w-full border border-[#27272A] bg-[#1c1b1d] px-4 py-3 text-[14px] text-[#e5e1e4] placeholder-[#5c4037] transition focus:border-[#ff571a] focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-[#ff571a] py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#3a0b00] transition hover:brightness-110"
          >
            Search
          </button>
        </form>
      </div>

      {/* Vehicle Selection Form */}
      <div className="border border-[#27272A] bg-[#201f22] p-6">
        <h4 className="mb-4 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
          Search by Vehicle
        </h4>
        <form onSubmit={handleVehicleSearch} className="space-y-3">
          <select
            value={vehicleData.make}
            onChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value })}
            className="w-full border border-[#27272A] bg-[#1c1b1d] px-4 py-3 text-[14px] text-[#e5e1e4] transition focus:border-[#ff571a] focus:outline-none"
          >
            <option value="">Select Make</option>
            <option value="audi">Audi</option>
            <option value="bmw">BMW</option>
            <option value="ford">Ford</option>
            <option value="mercedes">Mercedes-Benz</option>
            <option value="volkswagen">Volkswagen</option>
            <option value="volvo">Volvo</option>
          </select>

          <select
            value={vehicleData.model}
            onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
            className="w-full border border-[#27272A] bg-[#1c1b1d] px-4 py-3 text-[14px] text-[#e5e1e4] transition focus:border-[#ff571a] focus:outline-none"
          >
            <option value="">Select Model</option>
            <option value="a3">A3</option>
            <option value="a4">A4</option>
            <option value="a6">A6</option>
          </select>

          <select
            value={vehicleData.year}
            onChange={(e) => setVehicleData({ ...vehicleData, year: e.target.value })}
            className="w-full border border-[#27272A] bg-[#1c1b1d] px-4 py-3 text-[14px] text-[#e5e1e4] transition focus:border-[#ff571a] focus:outline-none"
          >
            <option value="">Select Year</option>
            {Array.from({ length: 30 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>

          <select
            value={vehicleData.engineSize}
            onChange={(e) => setVehicleData({ ...vehicleData, engineSize: e.target.value })}
            className="w-full border border-[#27272A] bg-[#1c1b1d] px-4 py-3 text-[14px] text-[#e5e1e4] transition focus:border-[#ff571a] focus:outline-none"
          >
            <option value="">Select Engine Size</option>
            <option value="1.4">1.4L</option>
            <option value="1.6">1.6L</option>
            <option value="1.8">1.8L</option>
            <option value="2.0">2.0L</option>
            <option value="2.5">2.5L</option>
            <option value="3.0">3.0L</option>
          </select>

          <select
            value={vehicleData.bhp}
            onChange={(e) => setVehicleData({ ...vehicleData, bhp: e.target.value })}
            className="w-full border border-[#27272A] bg-[#1c1b1d] px-4 py-3 text-[14px] text-[#e5e1e4] transition focus:border-[#ff571a] focus:outline-none"
          >
            <option value="">Select BHP</option>
            <option value="100-150">100-150 BHP</option>
            <option value="150-200">150-200 BHP</option>
            <option value="200-250">200-250 BHP</option>
            <option value="250-300">250-300 BHP</option>
            <option value="300+">300+ BHP</option>
          </select>

          <button
            type="submit"
            className="w-full bg-[#ff571a] py-3 font-tech text-[12px] uppercase tracking-[0.22em] text-[#3a0b00] transition hover:brightness-110"
          >
            Search
          </button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="border border-[#27272A] bg-[#1c1b1d] p-6">
        <h4 className="mb-3 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
          Need Help?
        </h4>
        <p className="mb-4 text-[14px] leading-6 text-[#c6c6cf]">
          Can't find your turbo number? Our team can help identify the correct part.
        </p>
        <a
          href="tel:01279-817451"
          className="block w-full bg-[#ff571a] py-3 text-center font-tech text-[12px] uppercase tracking-[0.2em] text-[#3a0b00] transition hover:brightness-110"
        >
          01279-817451
        </a>
        <a
          href="mailto:contact@aceturbo.co.uk"
          className="mt-2 block w-full border border-[#5c4037] py-3 text-center font-tech text-[12px] uppercase tracking-[0.2em] text-[#e5e1e4] transition hover:bg-white/5"
        >
          contact@aceturbo.co.uk
        </a>
      </div>

      {/* Manufacturer Logos Grid */}
      <div className="border border-[#27272A] bg-[#201f22] p-6">
        <h4 className="mb-4 font-tech text-[11px] uppercase tracking-[0.24em] text-[#ffb59e]">
          Turbo Manufacturers
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {[
            "Garrett",
            "Holset",
            "IHI",
            "Mitsubishi",
            "Schwitzer",
            "Toyota",
            "KKK",
            "BorgWarner",
            "Honeywell",
          ].map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center border border-[#27272A] bg-[#1c1b1d] px-3 py-4 text-center text-[11px] text-[#929090] transition hover:border-[#ff571a]/40 hover:text-[#e5e1e4]"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
