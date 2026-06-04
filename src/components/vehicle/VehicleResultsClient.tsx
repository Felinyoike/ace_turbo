"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TurboCard } from "@/components/turbos/TurboCard";
import type { StoredTurbo } from "@/lib/persistence";

type VehicleData = {
  make?: string;
  model?: string;
  year?: number;
  engineCapacity?: number;
  fuelType?: string;
  colour?: string;
  bhp?: number;
  engineCode?: string;
  registrationNumber?: string;
  transmissionType?: string;
  numberOfDoors?: number;
  bodyShape?: string;
  co2?: number;
  imageUrl?: string;
  imageUrls?: string[];
};

export function VehicleResultsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState<VehicleData | null>(null);
  const [turbos, setTurbos] = useState<StoredTurbo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTrade, setIsTrade] = useState(false);
  const [error, setError] = useState("");
  const [carImageUrl, setCarImageUrl] = useState("/images/car-placeholder.svg");

  const registration = searchParams.get("reg");

  useEffect(() => {
    async function loadData() {
      if (!registration) {
        router.push("/");
        return;
      }

      setLoading(true);
      setError("");

      try {
        // Fetch vehicle data
        const vehicleResponse = await fetch("/api/car-lookup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ registration })
        });

        if (!vehicleResponse.ok) {
          const errorData = await vehicleResponse.json();
          setError(errorData.error || "Failed to fetch vehicle data");
          setLoading(false);
          return;
        }

        const vehicleData = await vehicleResponse.json();
        const v: VehicleData = vehicleData.vehicle;
        setVehicle(v);
        setCarImageUrl(getCarImageUrl(v));

        // Fetch matching turbos
        const turboResults = await fetch(
          `/api/turbos?${new URLSearchParams({
            ...(v.make && { make: v.make }),
            ...(v.model && { model: v.model }),
            ...(v.year && { year: String(v.year) }),
            ...(v.engineCapacity && { engineCapacity: String(v.engineCapacity) }),
            ...(v.engineCode && { engineCode: v.engineCode }),
            ...(v.bhp && { bhp: String(v.bhp) })
          })}`
        ).then(res => res.json());

        setTurbos(turboResults.turbos || []);

        // Check user role
        const session = await fetch("/api/auth/me").then(res => res.json()).catch(() => null);
        const role = session?.user?.role;
        setIsTrade(role === "b2b" || role === "admin");

      } catch (err) {
        console.error("Error loading vehicle data:", err);
        setError("Failed to load vehicle information");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [registration, router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1080px] px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0868a8] border-t-transparent" />
          <span className="ml-3 font-tech text-[11px] uppercase tracking-[0.2em] text-[#64748b]">
            Loading vehicle data...
          </span>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="mx-auto max-w-[1080px] px-4 py-16">
        <div className="border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-red-600 mb-4">
            {error || "Vehicle not found"}
          </p>
          <Link
            href="/"
            className="inline-block border border-[#0868a8] bg-[#0868a8] px-6 py-3 font-tech text-[10px] uppercase tracking-[0.2em] text-white hover:bg-[#054b7f] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const vehicleLabel = [vehicle.make, vehicle.model, vehicle.year]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Vehicle Information Section */}
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="mx-auto max-w-[1080px] px-4 py-12">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.2em] text-[#64748b] hover:text-[#0868a8] transition-colors"
            >
              ← Back to search
            </Link>
          </div>

          <p className="font-tech text-[10px] uppercase tracking-[0.3em] text-[#0868a8]">
            Vehicle Found
          </p>
          <h1 className="mt-2 text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase leading-none tracking-tight text-[#0f172a]">
            {vehicle.registrationNumber || registration}
          </h1>
          <p className="mt-3 font-tech text-[14px] text-[#64748b]">
            {vehicleLabel}
            {vehicle.bhp && (
              <span className="ml-3 inline-block border border-[#0868a8] bg-[#eff6ff] px-3 py-1 font-tech text-[11px] font-bold uppercase tracking-[0.15em] text-[#0868a8]">
                {vehicle.bhp} BHP
              </span>
            )}
          </p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vehicle Image */}
            <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={carImageUrl}
                  alt={`${vehicleLabel} - Vehicle Image`}
                  className="h-full w-full object-contain object-center p-6 transition-transform duration-500 group-hover:scale-105"
                  onError={() => setCarImageUrl("/images/car-placeholder.svg")}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent p-4">
                <p className="font-tech text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                  {vehicleLabel}
                </p>
                {vehicle.bhp && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="bg-[#0868a8] px-2 py-1 font-tech text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                      {vehicle.bhp} BHP
                    </span>
                    {vehicle.engineCapacity && (
                      <span className="bg-white/20 px-2 py-1 font-tech text-[9px] uppercase tracking-[0.15em] text-white">
                        {vehicle.engineCapacity}cc
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-white border border-slate-200 p-6">
              <h2 className="font-tech text-[11px] uppercase tracking-[0.24em] text-[#0868a8] mb-4">
                Vehicle Specifications
              </h2>
              <dl className="space-y-3">
                {vehicle.make && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                      Make
                    </dt>
                    <dd className="font-tech text-[11px] font-bold uppercase text-[#0f172a]">
                      {vehicle.make}
                    </dd>
                  </div>
                )}
                {vehicle.model && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                      Model
                    </dt>
                    <dd className="font-tech text-[11px] font-bold uppercase text-[#0f172a]">
                      {vehicle.model}
                    </dd>
                  </div>
                )}
                {vehicle.year && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                      Year
                    </dt>
                    <dd className="font-tech text-[11px] font-bold text-[#0f172a]">
                      {vehicle.year}
                    </dd>
                  </div>
                )}
                {vehicle.engineCapacity && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                      Engine
                    </dt>
                    <dd className="font-tech text-[11px] font-bold text-[#0f172a]">
                      {vehicle.engineCapacity}cc
                    </dd>
                  </div>
                )}
                {vehicle.engineCode && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                      Engine Code
                    </dt>
                    <dd className="font-tech text-[11px] font-bold uppercase text-[#0f172a]">
                      {vehicle.engineCode}
                    </dd>
                  </div>
                )}
                {vehicle.bhp && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                      BHP
                    </dt>
                    <dd className="font-tech text-[11px] font-bold text-[#0f172a]">
                      {vehicle.bhp} BHP
                    </dd>
                  </div>
                )}
                {vehicle.fuelType && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                      Fuel Type
                    </dt>
                    <dd className="font-tech text-[11px] font-bold uppercase text-[#0f172a]">
                      {vehicle.fuelType}
                    </dd>
                  </div>
                )}
                {vehicle.colour && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                      Colour
                    </dt>
                    <dd className="font-tech text-[11px] font-bold uppercase text-[#0f172a]">
                      {vehicle.colour}
                    </dd>
                  </div>
                )}
                {vehicle.transmissionType && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                      Transmission
                    </dt>
                    <dd className="font-tech text-[11px] font-bold uppercase text-[#0f172a]">
                      {vehicle.transmissionType}
                    </dd>
                  </div>
                )}
                {vehicle.numberOfDoors && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                      Doors
                    </dt>
                    <dd className="font-tech text-[11px] font-bold text-[#0f172a]">
                      {vehicle.numberOfDoors}
                    </dd>
                  </div>
                )}
                {vehicle.bodyShape && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                      Body Style
                    </dt>
                    <dd className="font-tech text-[11px] font-bold uppercase text-[#0f172a]">
                      {vehicle.bodyShape}
                    </dd>
                  </div>
                )}
                {vehicle.co2 && (
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <dt className="font-tech text-[10px] uppercase tracking-[0.15em] text-[#64748b]">
                      CO₂ Emissions
                    </dt>
                    <dd className="font-tech text-[11px] font-bold text-[#0f172a]">
                      {vehicle.co2} g/km
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Matching Parts Section */}
      <section className="mx-auto max-w-[1080px] px-4 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 border border-[#0868a8]/25 bg-[#eff6ff] px-4 py-2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0868a8"
              strokeWidth="2.5"
              strokeLinecap="square"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-[#0868a8]">
              Showing results for:
            </span>
            <span className="font-tech text-[11px] font-bold uppercase tracking-[0.15em] text-[#0f172a]">
              {vehicleLabel}
            </span>
            {vehicle.bhp && (
              <span className="border border-[#0868a8]/30 bg-white px-2 py-0.5 font-tech text-[9px] uppercase tracking-[0.15em] text-[#0868a8]">
                {vehicle.bhp} BHP ±3
              </span>
            )}
          </div>
        </div>

        {/* Parts Availability Status - Matching Legacy Logic */}
        <div className="mb-8">
          {turbos.length > 0 ? (
            <div className="border-l-4 border-l-green-500 bg-green-50 p-6">
              <div className="flex items-start gap-4">
                <svg
                  className="mt-0.5 flex-shrink-0"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" className="text-green-600"/>
                  <polyline points="22 4 12 14.01 9 11.01" className="text-green-600"/>
                </svg>
                <div className="flex-1">
                  <h3 className="font-tech text-[12px] font-bold uppercase tracking-[0.2em] text-green-800 mb-2">
                    ✓ Parts Available
                  </h3>
                  <p className="text-[13px] text-green-700 leading-relaxed mb-3">
                    We found <strong className="font-bold">{turbos.length} matching part{turbos.length === 1 ? "" : "s"}</strong> for your <strong className="font-bold">{vehicleLabel}</strong>.
                    Browse the available options below and add the correct item to your cart to proceed to checkout.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Link
                      href="/cart"
                      className="inline-flex items-center gap-2 border border-green-600 bg-white px-4 py-2 font-tech text-[10px] uppercase tracking-[0.2em] text-green-700 hover:bg-green-600 hover:text-white transition-all"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                      View Cart
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-2 font-tech text-[10px] uppercase tracking-[0.2em] text-[#64748b] hover:border-[#0868a8] hover:text-[#0868a8] transition-all"
                    >
                      Need Help? Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-l-4 border-l-amber-500 bg-amber-50 p-6">
              <div className="flex items-start gap-4">
                <svg
                  className="mt-0.5 flex-shrink-0"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" className="text-amber-600"/>
                  <line x1="12" y1="8" x2="12" y2="12" className="text-amber-600"/>
                  <line x1="12" y1="16" x2="12.01" y2="16" className="text-amber-600"/>
                </svg>
                <div className="flex-1">
                  <h3 className="font-tech text-[12px] font-bold uppercase tracking-[0.2em] text-amber-800 mb-2">
                    No Parts Found in Database
                  </h3>
                  <p className="text-[13px] text-amber-700 leading-relaxed mb-3">
                    We couldn't find matching parts in our database for your <strong className="font-bold">{vehicleLabel}</strong>. 
                    However, we may still be able to help you source the correct part.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 border border-amber-600 bg-amber-600 px-5 py-2.5 font-tech text-[10px] uppercase tracking-[0.2em] text-white hover:bg-amber-700 hover:border-amber-700 transition-all"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      Request Manual Lookup
                    </Link>
                    <Link
                      href="/turbos"
                      className="inline-flex items-center gap-2 border border-slate-300 bg-white px-4 py-2 font-tech text-[10px] uppercase tracking-[0.2em] text-[#64748b] hover:border-[#0868a8] hover:text-[#0868a8] transition-all"
                    >
                      Browse All Turbos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-5 flex items-center justify-between">
          <p className="font-tech text-[10px] uppercase tracking-[0.24em] text-[#64748b]">
            {turbos.length === 0
              ? "0 results in catalog"
              : `${turbos.length} matching part${turbos.length === 1 ? "" : "s"}`}
          </p>
          {turbos.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="font-tech text-[9px] uppercase tracking-[0.2em] text-[#94a3b8]">
                Scroll to browse →
              </span>
            </div>
          )}
        </div>

        {turbos.length > 0 ? (
          <>
            <section className="grid gap-4 md:grid-cols-2" aria-label="Turbo results">
              {turbos.map((turbo) => (
                <TurboCard key={turbo.id} isTrade={isTrade} turbo={turbo} />
              ))}
            </section>

            {/* Checkout CTA - Matching Legacy Logic */}
            <div className="mt-12 border-t border-slate-200 pt-8">
              <div className="bg-gradient-to-r from-[#0868a8] to-[#054b7f] p-8 text-white">
                <div className="mx-auto max-w-3xl text-center">
                  <h3 className="mb-3 font-tech text-[14px] font-bold uppercase tracking-[0.2em]">
                    Ready to Order?
                  </h3>
                  <p className="mb-6 text-[13px] leading-relaxed text-blue-100">
                    Add your selected part to the cart and proceed to checkout. 
                    We offer secure payment options and fast UK-wide delivery.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                      href="/cart"
                      className="inline-flex items-center gap-2 border-2 border-white bg-white px-6 py-3 font-tech text-[11px] uppercase tracking-[0.2em] text-[#0868a8] hover:bg-transparent hover:text-white transition-all"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                      View Cart & Checkout
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 border-2 border-white/40 bg-transparent px-6 py-3 font-tech text-[11px] uppercase tracking-[0.2em] text-white hover:border-white hover:bg-white/10 transition-all"
                    >
                      Need Advice? Call Us
                    </Link>
                  </div>
                  <p className="mt-6 text-[11px] text-blue-200">
                    <strong>Phone:</strong>{" "}
                    <a href="tel:01279-817451" className="hover:text-white transition-colors">
                      01279-817451
                    </a>
                    {" "}|{" "}
                    <strong>Email:</strong>{" "}
                    <a href="mailto:contact@aceturbo.co.uk" className="hover:text-white transition-colors">
                      contact@aceturbo.co.uk
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="border border-dashed border-amber-300 bg-amber-50/50 p-12 text-center">
            <svg
              className="mx-auto mb-4 opacity-40"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d97706"
              strokeWidth="1.5"
              strokeLinecap="square"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <p className="font-tech text-[12px] font-bold uppercase tracking-[0.24em] text-amber-800 mb-3">
              Alternative Options Available
            </p>
            <p className="text-[14px] text-amber-700 leading-relaxed max-w-xl mx-auto mb-6">
              While we don't have this specific vehicle in our database, our expert team can help source the correct part for your <strong>{vehicleLabel}</strong>.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-amber-600 bg-amber-600 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.2em] text-white hover:bg-amber-700 hover:border-amber-700 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Contact Our Team
              </Link>
              <Link
                href="/turbos"
                className="inline-flex items-center gap-2 border border-slate-300 bg-white px-6 py-3 font-tech text-[11px] uppercase tracking-[0.2em] text-[#64748b] hover:border-[#0868a8] hover:text-[#0868a8] transition-all"
              >
                Browse Full Catalogue
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

// Helper function to generate car image URL
function getCarImageUrl(vehicle: VehicleData): string {
  const apiImage = vehicle.imageUrl || vehicle.imageUrls?.[0];
  if (apiImage) return apiImage;

  const makeLower = vehicle.make?.toLowerCase().replace(/[^a-z0-9]/g, "") || "generic";

  if (!vehicle.make || makeLower === "generic") return "/images/car-placeholder.svg";

  return `/images/cars/${makeLower}.png`;
}
