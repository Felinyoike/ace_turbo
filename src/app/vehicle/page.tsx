import { Suspense } from "react";
import { VehicleResultsClient } from "@/components/vehicle/VehicleResultsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vehicle Lookup Results | Ace Turbo",
  description: "View your vehicle details and find matching turbochargers"
};

export default function VehiclePage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<LoadingState />}>
        <VehicleResultsClient />
      </Suspense>
    </main>
  );
}

function LoadingState() {
  return (
    <div className="mx-auto max-w-[1080px] px-4 py-16">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-slate-200 mb-4" />
        <div className="h-64 bg-slate-100 mb-6" />
        <div className="h-32 bg-slate-100" />
      </div>
    </div>
  );
}
