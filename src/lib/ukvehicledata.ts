/**
 * UK Vehicle Data API integration
 * Mirrors the legacy regnum2.php approach:
 *   GET https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData
 *       ?v=2&api_nullitems=1&key_vrm={VRM}&auth_apikey={KEY}
 */

export type UkVehicleData = {
  make?: string;
  model?: string;
  year?: number;
  engineCapacity?: number; // cc
  fuelType?: string;
  colour?: string;
  bhp?: number;
  engineCode?: string;
  transmissionType?: string;
  numberOfDoors?: number;
  bodyShape?: string;
  co2?: number;
  registrationNumber?: string;
};

interface UkvdResponse {
  Response: {
    StatusCode: string;
    StatusMessage?: string;
    DataItems?: {
      VehicleRegistration?: {
        Make?: string;
        Model?: string;
        YearOfManufacture?: number | string;
        EngineCapacity?: number | string;
        FuelType?: string;
        Colour?: string;
        Transmission?: string;
        DoorPlanLiteral?: string;
        Vrm?: string;
      };
      TechnicalDetails?: {
        Dimensions?: {
          BodyShape?: string;
          NumberOfDoors?: number | string;
        };
        Performance?: {
          Power?: {
            Bhp?: number | string;
          };
          Co2?: number | string;
        };
        General?: {
          Engine?: {
            Description?: string;
          };
        };
      };
      SmmtDetails?: {
        ModelVariant?: string;
        Range?: string;
        FuelType?: string;
        EngineCapacity?: number | string;
      };
    };
  };
}

function toNum(v: unknown): number | undefined {
  const n = Number(v);
  return isNaN(n) || n === 0 ? undefined : n;
}

export async function fetchVehicleFromUkVehicleData(vrm: string): Promise<UkVehicleData> {
  const apiKey = process.env.UKVD_API_KEY;

  if (!apiKey) {
    // Fallback demo data when no key is configured
    return {
      registrationNumber: vrm,
      make: "Demo",
      model: "Vehicle",
      year: 2020,
      engineCapacity: 1968,
      fuelType: "DIESEL",
      colour: "GREY",
      bhp: 150
    };
  }

  const url = `https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData?v=2&api_nullitems=1&key_vrm=${encodeURIComponent(vrm)}&auth_apikey=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    // 30-second timeout matching the legacy PHP cURL timeout
    signal: AbortSignal.timeout(30_000)
  });

  if (!response.ok) {
    throw new Error(`UK Vehicle Data API error: ${response.status}`);
  }

  const json: UkvdResponse = await response.json();

  if (json.Response?.StatusCode !== "Success") {
    const msg = json.Response?.StatusMessage || "Invalid or unrecognised registration";
    throw new Error(msg);
  }

  const items = json.Response.DataItems;
  const vr = items?.VehicleRegistration;
  const tech = items?.TechnicalDetails;

  return {
    registrationNumber: vr?.Vrm || vrm,
    make: vr?.Make || undefined,
    model: vr?.Model || undefined,
    year: toNum(vr?.YearOfManufacture),
    engineCapacity: toNum(vr?.EngineCapacity || items?.SmmtDetails?.EngineCapacity),
    fuelType: vr?.FuelType || items?.SmmtDetails?.FuelType || undefined,
    colour: vr?.Colour || undefined,
    bhp: toNum(tech?.Performance?.Power?.Bhp),
    engineCode: tech?.General?.Engine?.Description || undefined,
    transmissionType: vr?.Transmission || undefined,
    numberOfDoors: toNum(tech?.Dimensions?.NumberOfDoors),
    bodyShape: tech?.Dimensions?.BodyShape || undefined,
    co2: toNum(tech?.Performance?.Co2)
  };
}
