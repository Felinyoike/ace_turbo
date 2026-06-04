import { pool, carPool } from "@/lib/db";
import {
  nextId,
  readAppData,
  updateAppData,
  type StoredIpBlock,
  type StoredLookup,
  type StoredOrder,
  type StoredSession,
  type StoredTurbo,
  type StoredUser
} from "@/lib/persistence";

type TurboSearch = {
  partNumber?: string;
  make?: string;
  model?: string;
  engine?: string;
  engineCapacity?: number;
  engineCode?: string;
  year?: number;
  /** Exact BHP match or centre of ±3 range when coming from a reg lookup */
  bhp?: number;
  /** Whether to apply ±3 BHP tolerance (set automatically by reg lookup) */
  bhpFuzzy?: boolean;
  /** Maximum rows to return when browsing large legacy catalog tables */
  limit?: number;
  /** Number of rows to skip when browsing large legacy catalog tables */
  offset?: number;
};

const LEGACY_TURBO_ID_OFFSET = 1_000_000;

function useMysql() {
  const url = process.env.DATABASE_URL;
  return Boolean(url && !url.includes("user:pass@host"));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function cleanLegacyText(value: unknown) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function firstLegacyPartNumber(...values: unknown[]) {
  for (const value of values) {
    const firstPart = cleanLegacyText(value).split(/\s+/).find(Boolean);
    if (firstPart) return firstPart;
  }
  return "";
}

function legacyPrice(row: any) {
  const reconPrice = Number(row.recon_price || 0);
  if (reconPrice > 0) return reconPrice;

  const repairPrice = Number(row.repair_price || 0);
  if (repairPrice > 0) return repairPrice;

  const relatedReconPrice = Number(row.related_recon_price || 0);
  return relatedReconPrice > 0 ? relatedReconPrice : 0;
}

function legacyTurboId(id: number) {
  return id + LEGACY_TURBO_ID_OFFSET;
}

function legacyProductId(id: number) {
  return id - LEGACY_TURBO_ID_OFFSET;
}

export function isLegacyTurboId(id: number) {
  return id >= LEGACY_TURBO_ID_OFFSET;
}

function hasVehicleFitmentFilters(filters?: TurboSearch) {
  return Boolean(filters?.make || filters?.model || filters?.year || filters?.engine || filters?.engineCapacity || filters?.engineCode || filters?.bhp);
}

function hasActiveTurboFilters(filters?: TurboSearch) {
  return Boolean(filters?.partNumber || hasVehicleFitmentFilters(filters));
}

function relaxedVehicleFitmentFilters(filters?: TurboSearch): TurboSearch[] {
  if (!filters || !hasVehicleFitmentFilters(filters)) return [];

  return [
    { ...filters, bhp: undefined, bhpFuzzy: undefined },
    {
      ...filters,
      engine: undefined,
      engineCapacity: undefined,
      engineCode: undefined,
      bhp: undefined,
      bhpFuzzy: undefined
    },
    {
      ...filters,
      model: undefined,
      engine: undefined,
      engineCapacity: undefined,
      engineCode: undefined,
      bhp: undefined,
      bhpFuzzy: undefined
    }
  ];
}

function engineCapacitySearchTerms(engineCapacity?: number) {
  if (!engineCapacity) return [];

  const litres = engineCapacity / 1000;
  const roundedLitres = (Math.round(litres * 10) / 10).toFixed(1);

  return [
    String(engineCapacity),
    `${engineCapacity}cc`,
    `${engineCapacity} cc`,
    roundedLitres,
    `${roundedLitres}L`,
    `${roundedLitres} L`
  ];
}

function engineCapacityLitres(engineCapacity?: number) {
  if (!engineCapacity) return undefined;
  return Math.round((engineCapacity / 1000) * 10) / 10;
}

function turboMatchesModel(turboModel: string, searchModel: string) {
  const catalogModel = turboModel.trim().toUpperCase();
  const vehicleModel = searchModel.trim().toUpperCase();

  return catalogModel.includes(vehicleModel) || vehicleModel.includes(catalogModel);
}

function turboMatchesEngine(turboEngine: string, filters: TurboSearch) {
  const catalogEngine = String(turboEngine || "").toUpperCase();
  const terms = [
    filters.engine,
    filters.engineCode,
    ...engineCapacitySearchTerms(filters.engineCapacity)
  ]
    .filter(Boolean)
    .map((term) => String(term).toUpperCase());

  return terms.length === 0 || terms.some((term) => catalogEngine.includes(term));
}

function mapTurbo(row: any): StoredTurbo {
  return {
    id: row.id,
    sku: row.sku,
    make: row.make,
    model: row.model,
    year: row.year ?? undefined,
    engine: row.engine,
    bhp: row.bhp ?? undefined,
    type: row.type,
    price: Number(row.price),
    tradePrice: row.trade_price != null || row.tradePrice != null ? Number(row.trade_price ?? row.tradePrice) : undefined,
    stock: row.stock,
    seoSlug: row.seo_slug ?? row.seoSlug,
    description: row.description || "",
    images: parseJsonArray(row.images),
    createdAt: new Date(row.created_at ?? row.createdAt).toISOString(),
    updatedAt: new Date(row.updated_at ?? row.updatedAt).toISOString()
  };
}

function mapLegacyTurbo(row: any): StoredTurbo {
  const id = legacyTurboId(Number(row.turbo_id));
  const make = row.make_name || row.turbo_make || "Vehicle";
  const model = row.model_name || row.turbo_model || "Application";
  const turboModel = [row.turbo_make, row.turbo_model].filter(Boolean).join(" ").trim();
  const primaryPart = firstLegacyPartNumber(row.turbo_oe_no, row.vehicle_oe_no, row.oem_chra_no, row.turbo_data) || `LEGACY-${row.turbo_id}`;
  const sku = `${primaryPart}-${row.turbo_id}`;
  const engine = [row.engine ? `${Number(row.engine).toFixed(1).replace(/\.0$/, "")}L` : undefined, row.engine_code]
    .filter(Boolean)
    .join(" ");
  const yearText = row.start_year && row.end_year ? `${row.start_year}-${row.end_year}` : row.start_year || row.end_year || "year range";
  const vehicleName = [make, model, engine].filter(Boolean).join(" ");
  const descriptionParts = [
    `${vehicleName} turbocharger`,
    turboModel || undefined,
    yearText ? `(${yearText})` : undefined,
    row.vehicle_oe_no ? `Vehicle OE: ${cleanLegacyText(row.vehicle_oe_no)}` : undefined,
    row.turbo_oe_no ? `Turbo OE: ${cleanLegacyText(row.turbo_oe_no)}` : undefined,
    row.oem_chra_no ? `CHRA: ${cleanLegacyText(row.oem_chra_no)}` : undefined
  ].filter(Boolean);
  const price = legacyPrice(row);
  const now = new Date().toISOString();

  return {
    id,
    sku: String(sku),
    make: String(make),
    model: String(model),
    year: row.start_year || undefined,
    engine: engine || "Engine dependent",
    bhp: row.power1 || undefined,
    type: turboModel || "Turbocharger",
    price,
    tradePrice: undefined,
    stock: Math.max(Number(row.in_stock || 0), 1),
    seoSlug: `legacy-${row.turbo_id}-${slugify(`${make} ${model} ${primaryPart}`)}`,
    description: descriptionParts.join(" "),
    images: row.turbo_image ? [`/images/${row.turbo_image}`] : ["/images/ace-turbo-preview.svg"],
    createdAt: now,
    updatedAt: now
  };
}

function mapUser(row: any): StoredUser {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash ?? row.passwordHash,
    role: row.role,
    firstName: row.first_name ?? row.firstName ?? "",
    lastName: row.last_name ?? row.lastName ?? "",
    company: row.company || undefined,
    phone: row.phone || undefined,
    createdAt: new Date(row.created_at ?? row.createdAt).toISOString()
  };
}

function mapSession(row: any): StoredSession {
  return {
    id: row.id,
    userId: row.user_id ?? row.userId,
    email: row.email,
    role: row.role,
    userAgent: row.user_agent ?? row.userAgent ?? undefined,
    ipAddress: row.ip_address ?? row.ipAddress ?? undefined,
    createdAt: new Date(row.created_at ?? row.createdAt).toISOString(),
    lastSeenAt: new Date(row.last_seen_at ?? row.lastSeenAt).toISOString(),
    expiresAt: new Date(row.expires_at ?? row.expiresAt).toISOString(),
    revokedAt: (row.revoked_at ?? row.revokedAt) ? new Date(row.revoked_at ?? row.revokedAt).toISOString() : undefined
  };
}

function mapOrder(row: any): StoredOrder {
  return {
    id: row.id,
    userId: row.user_id ?? row.userId ?? undefined,
    email: row.email || "",
    status: row.status,
    total: Number(row.total),
    stripePaymentId: row.stripe_payment_id ?? row.stripePaymentId ?? undefined,
    stripeSessionId: row.stripe_session_id ?? row.stripeSessionId ?? undefined,
    invoiceNumber: row.invoice_number ?? row.invoiceNumber ?? "",
    invoicePath: row.invoice_path ?? row.invoicePath ?? undefined,
    shippingAddress: row.shipping_address ?? row.shippingAddress ?? "",
    createdAt: new Date(row.created_at ?? row.createdAt).toISOString(),
    items: Array.isArray(row.items)
      ? row.items.map((item: any) => ({
          turboId: item.turbo_id ?? item.turboId,
          sku: item.sku || item.turbo?.sku || "",
          name: item.name || `${item.turbo?.make || ""} ${item.turbo?.model || ""} ${item.turbo?.engine || ""}`.trim(),
          quantity: item.quantity,
          unitPrice: Number(item.unit_price ?? item.unitPrice)
        }))
      : []
  };
}

function mapLookup(row: any): StoredLookup {
  return {
    id: row.id,
    registration: row.registration,
    source: row.source,
    userIp: row.user_ip ?? row.userIp ?? undefined,
    vehicle: row.vehicle
      ? {
          registration: row.vehicle.registration,
          make: row.vehicle.make,
          model: row.vehicle.model,
          year: row.vehicle.year,
          engine: row.vehicle.engine,
          fuel: row.vehicle.fuel,
          colour: row.vehicle.colour
        }
      : undefined,
    createdAt: new Date(row.timestamp).toISOString()
  };
}

export async function getUsers() {
  if (useMysql()) {
    const [rows] = await pool.query("SELECT * FROM users ORDER BY created_at ASC");
    return (rows as any[]).map(mapUser);
  }
  return (await readAppData()).users;
}

export async function findUserByEmail(email: string) {
  if (useMysql()) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    return (rows as any[])[0] ? mapUser((rows as any[])[0]) : null;
  }
  return (await readAppData()).users.find((user) => user.email === email) || null;
}

export async function createUserRecord(user: Omit<StoredUser, "id" | "createdAt">) {
  if (useMysql()) {
    const [result] = await pool.query(
      "INSERT INTO users (email, password_hash, role, first_name, last_name, company, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user.email, user.passwordHash, user.role, user.firstName, user.lastName, user.company, user.phone]
    );
    const id = (result as any).insertId;
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return mapUser((rows as any[])[0]);
  }
  return updateAppData((data) => {
    const created: StoredUser = { id: nextId(data.users), createdAt: new Date().toISOString(), ...user };
    data.users.push(created);
    return created;
  });
}

export async function createSessionRecord(session: StoredSession) {
  if (useMysql()) {
    await pool.query(
      "INSERT INTO sessions (id, user_id, email, role, user_agent, ip_address, created_at, last_seen_at, expires_at, revoked_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [session.id, session.userId, session.email, session.role, session.userAgent, session.ipAddress, new Date(session.createdAt), new Date(session.lastSeenAt), new Date(session.expiresAt), session.revokedAt ? new Date(session.revokedAt) : null]
    );
    const [rows] = await pool.query("SELECT * FROM sessions WHERE id = ?", [session.id]);
    return mapSession((rows as any[])[0]);
  }
  return updateAppData((data) => {
    data.sessions.push(session);
    return session;
  });
}

export async function getSessionRecord(id: string) {
  if (useMysql()) {
    const [rows] = await pool.query("SELECT * FROM sessions WHERE id = ? LIMIT 1", [id]);
    return (rows as any[])[0] ? mapSession((rows as any[])[0]) : null;
  }
  return (await readAppData()).sessions.find((session) => session.id === id) || null;
}

export async function getSessions(filters?: { userId?: number; activeOnly?: boolean }) {
  if (useMysql()) {
    let query = "SELECT * FROM sessions";
    const params: any[] = [];
    const conditions: string[] = [];
    
    if (filters?.userId) {
      conditions.push("user_id = ?");
      params.push(filters.userId);
    }
    if (filters?.activeOnly) {
      conditions.push("revoked_at IS NULL");
      conditions.push("expires_at > NOW()");
    }
    
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }
    query += " ORDER BY created_at DESC";
    
    const [rows] = await pool.query(query, params);
    return (rows as any[]).map(mapSession);
  }
  return (await readAppData()).sessions
    .filter((session) => {
      if (filters?.userId && session.userId !== filters.userId) return false;
      if (filters?.activeOnly && (session.revokedAt || new Date(session.expiresAt).getTime() <= Date.now())) return false;
      return true;
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function touchSessionRecord(id: string) {
  if (useMysql()) {
    await pool.query("UPDATE sessions SET last_seen_at = NOW() WHERE id = ?", [id]);
    const [rows] = await pool.query("SELECT * FROM sessions WHERE id = ?", [id]);
    return mapSession((rows as any[])[0]);
  }
  return updateAppData((data) => {
    const session = data.sessions.find((entry) => entry.id === id);
    if (!session) return null;
    session.lastSeenAt = new Date().toISOString();
    return session;
  });
}

export async function revokeSessionRecord(id: string) {
  if (useMysql()) {
    await pool.query("UPDATE sessions SET revoked_at = NOW() WHERE id = ?", [id]);
    const [rows] = await pool.query("SELECT * FROM sessions WHERE id = ?", [id]);
    return mapSession((rows as any[])[0]);
  }
  return updateAppData((data) => {
    const session = data.sessions.find((entry) => entry.id === id);
    if (!session) return null;
    session.revokedAt = new Date().toISOString();
    return session;
  });
}

export async function revokeSessionsForUser(userId: number, exceptId?: string) {
  if (useMysql()) {
    let query = "UPDATE sessions SET revoked_at = NOW() WHERE user_id = ? AND revoked_at IS NULL";
    const params: any[] = [userId];
    if (exceptId) {
      query += " AND id != ?";
      params.push(exceptId);
    }
    await pool.query(query, params);
    return getSessions({ userId });
  }
  return updateAppData((data) => {
    for (const session of data.sessions) {
      if (session.userId === userId && !session.revokedAt && session.id !== exceptId) {
        session.revokedAt = new Date().toISOString();
      }
    }
    return data.sessions.filter((session) => session.userId === userId);
  });
}

export async function updateUserRoleRecord(userId: number, role: StoredUser["role"]) {
  if (useMysql()) {
    await pool.query("UPDATE users SET role = ? WHERE id = ?", [role, userId]);
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
    return mapUser((rows as any[])[0]);
  }
  return updateAppData((data) => {
    const existing = data.users.find((user) => user.id === userId);
    if (!existing) return null;
    existing.role = role;
    return existing;
  });
}

export async function getTurbos(filters?: TurboSearch) {
  if (useMysql()) {
    if (!hasActiveTurboFilters(filters)) {
      try {
        const legacy = await getLegacyTurbos(filters);
        if (legacy.length > 0) return legacy;
      } catch (err) {
        console.warn("[getTurbos] Legacy catalog browse unavailable, trying normalized turbos:", (err as Error).message);
      }
    }

    if (hasVehicleFitmentFilters(filters)) {
      try {
        const legacy = await getLegacyTurbos(filters);
        if (legacy.length > 0) return legacy;

        for (const relaxedFilters of relaxedVehicleFitmentFilters(filters)) {
          const relaxedLegacy = await getLegacyTurbos(relaxedFilters);
          if (relaxedLegacy.length > 0) return relaxedLegacy;
        }
      } catch (err) {
        console.warn("[getTurbos] Legacy product lookup unavailable, trying normalized turbos:", (err as Error).message);
      }
    }

    let query = "SELECT * FROM turbos";
    const params: any[] = [];
    const conditions: string[] = [];

    if (filters?.partNumber) {
      conditions.push("sku LIKE ?");
      params.push(`%${filters.partNumber}%`);
    }
    if (filters?.make) {
      // Case-insensitive make match
      conditions.push("make LIKE ?");
      params.push(filters.make);
    }
    if (filters?.model) {
      // Match both full decoded VRM models and shorter catalog models.
      conditions.push("(model LIKE ? OR ? LIKE CONCAT('%', model, '%'))");
      params.push(`%${filters.model}%`, filters.model);
    }
    const engineTerms = [
      filters?.engine,
      filters?.engineCode,
      ...engineCapacitySearchTerms(filters?.engineCapacity)
    ].filter(Boolean);
    if (engineTerms.length > 0) {
      conditions.push(`(${engineTerms.map(() => "engine LIKE ?").join(" OR ")})`);
      params.push(...engineTerms.map((term) => `%${term}%`));
    }
    if (filters?.year) {
      // Prefer legacy-style production ranges when present; keep single-year rows working.
      conditions.push("((start_year IS NULL OR start_year <= ?) AND (end_year IS NULL OR end_year >= ?) OR (year IS NULL OR year = ?))");
      params.push(filters.year, filters.year, filters.year);
    }
    if (filters?.bhp) {
      if (filters.bhpFuzzy) {
        // ±3 BHP tolerance — mirrors legacy PHP: power1 BETWEEN pwr2 AND pwr3
        conditions.push("bhp BETWEEN ? AND ?");
        params.push(filters.bhp - 3, filters.bhp + 3);
      } else {
        conditions.push("bhp = ?");
        params.push(filters.bhp);
      }
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }
    query += " ORDER BY created_at DESC";

    try {
      const [rows] = await pool.query(query, params);
      const turbos = (rows as any[]).map(mapTurbo);
      if (turbos.length > 0 || !filters || Object.keys(filters).length === 0) return turbos;
    } catch (err) {
      console.warn("[getTurbos] Normalized turbos unavailable:", (err as Error).message);
    }

    try {
      const legacy = await getLegacyTurbos(filters);
      if (legacy.length > 0) return legacy;
    } catch (err) {
      console.warn("[getTurbos] Legacy product lookup unavailable, using local JSON fallback:", (err as Error).message);
    }
  }
  return (await readAppData()).turbos.filter((turbo) => {
    if (filters?.partNumber && !turbo.sku.includes(filters.partNumber)) return false;
    if (filters?.make && turbo.make.toUpperCase() !== filters.make.toUpperCase()) return false;
    if (filters?.model && !turboMatchesModel(turbo.model, filters.model)) return false;
    if (!turboMatchesEngine(turbo.engine, filters || {})) return false;
    if (filters?.year && turbo.year !== undefined && turbo.year !== filters.year) return false;
    if (filters?.bhp && turbo.bhp !== undefined) {
      const tolerance = filters.bhpFuzzy ? 3 : 0;
      if (turbo.bhp < filters.bhp - tolerance || turbo.bhp > filters.bhp + tolerance) return false;
    }
    return true;
  });
}

async function getLegacyTurbos(filters?: TurboSearch) {
  let query = `
    SELECT
      p.turbo_id,
      p.start_year,
      p.end_year,
      p.engine,
      p.power1,
      p.engine_code,
      p.vehicle_oe_no,
      p.turbo_oe_no,
      p.oem_chra_no,
      p.recon_price,
      p.repair_price,
      related_price.recon_price AS related_recon_price,
      p.in_stock,
      mk.make_name,
      mm.model_name,
      tm.turbo_make,
      tm.turbo_model,
      tm.turbo_image
    FROM tbl_product p
    LEFT JOIN manage_make mk ON mk.make_id = p.make_id
    LEFT JOIN manage_model mm ON mm.model_id = p.model_id
    LEFT JOIN tbl_turbo_model tm ON tm.turbo_model_id = p.turbo_model_id
    LEFT JOIN (
      SELECT make_id, model_id, engine, MIN(NULLIF(recon_price, 0)) AS recon_price
      FROM tbl_product
      WHERE status = 1 AND recon_price > 0
      GROUP BY make_id, model_id, engine
    ) related_price
      ON related_price.make_id = p.make_id
      AND related_price.model_id = p.model_id
      AND related_price.engine = p.engine
  `;
  const params: any[] = [];
  const conditions = ["p.status = 1"];

  if (filters?.partNumber) {
    conditions.push("(p.turbo_oe_no LIKE ? OR p.vehicle_oe_no LIKE ? OR p.oem_chra_no LIKE ? OR tm.turbo_oe_no LIKE ?)");
    const part = `%${filters.partNumber}%`;
    params.push(part, part, part, part);
  }
  if (filters?.make) {
    conditions.push("mk.make_name LIKE ?");
    params.push(`%${filters.make}%`);
  }
  if (filters?.model) {
    conditions.push("(mm.model_name LIKE ? OR ? LIKE CONCAT('%', mm.model_name, '%'))");
    params.push(`%${filters.model}%`, filters.model);
  }
  if (filters?.year) {
    conditions.push("(p.start_year IS NULL OR p.start_year <= ?) AND (p.end_year IS NULL OR p.end_year >= ?)");
    params.push(filters.year, filters.year);
  }
  if (filters?.bhp) {
    if (filters.bhpFuzzy) {
      conditions.push("p.power1 BETWEEN ? AND ?");
      params.push(filters.bhp - 3, filters.bhp + 3);
    } else {
      conditions.push("p.power1 = ?");
      params.push(filters.bhp);
    }
  }

  const litres = engineCapacityLitres(filters?.engineCapacity);
  if (litres && !filters?.bhp) {
    conditions.push("p.engine = ?");
    params.push(litres);
  }
  const limit = Math.min(Math.max(Number(filters?.limit || 100), 1), 200);
  const offset = Math.max(Number(filters?.offset || 0), 0);

  query += ` WHERE ${conditions.join(" AND ")} ORDER BY p.in_stock DESC, p.turbo_id ASC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const [rows] = await pool.query(query, params);
  return (rows as any[]).map(mapLegacyTurbo);
}

export async function getTurboById(id: number) {
  if (useMysql()) {
    if (isLegacyTurboId(id)) {
      try {
        return await getLegacyTurboByProductId(legacyProductId(id));
      } catch {
        console.warn("[getTurboById] Legacy product lookup unavailable");
      }
    }

    try {
      const [rows] = await pool.query("SELECT * FROM turbos WHERE id = ? LIMIT 1", [id]);
      return (rows as any[])[0] ? mapTurbo((rows as any[])[0]) : null;
    } catch {
      console.warn("[getTurboById] MySQL unavailable, using local JSON fallback");
    }
  }
  return (await readAppData()).turbos.find((turbo) => turbo.id === id) || null;
}

export async function getTurboBySlug(slug: string) {
  if (useMysql()) {
    const legacyMatch = slug.match(/^legacy-(\d+)-/);
    if (legacyMatch) {
      try {
        return await getLegacyTurboByProductId(Number(legacyMatch[1]));
      } catch {
        console.warn("[getTurboBySlug] Legacy product lookup unavailable");
      }
    }

    try {
      const [rows] = await pool.query("SELECT * FROM turbos WHERE seo_slug = ? LIMIT 1", [slug]);
      return (rows as any[])[0] ? mapTurbo((rows as any[])[0]) : null;
    } catch {
      console.warn("[getTurboBySlug] MySQL unavailable, using local JSON fallback");
    }
  }
  return (await readAppData()).turbos.find((turbo) => turbo.seoSlug === slug) || null;
}

async function getLegacyTurboByProductId(productId: number) {
  const [rows] = await pool.query(
    `
      SELECT
        p.turbo_id,
        p.start_year,
        p.end_year,
        p.engine,
        p.power1,
        p.engine_code,
        p.vehicle_oe_no,
        p.turbo_oe_no,
        p.oem_chra_no,
        p.recon_price,
        p.repair_price,
        related_price.recon_price AS related_recon_price,
        p.in_stock,
        mk.make_name,
        mm.model_name,
        tm.turbo_make,
        tm.turbo_model,
        tm.turbo_image
      FROM tbl_product p
      LEFT JOIN manage_make mk ON mk.make_id = p.make_id
      LEFT JOIN manage_model mm ON mm.model_id = p.model_id
      LEFT JOIN tbl_turbo_model tm ON tm.turbo_model_id = p.turbo_model_id
      LEFT JOIN (
        SELECT make_id, model_id, engine, MIN(NULLIF(recon_price, 0)) AS recon_price
        FROM tbl_product
        WHERE status = 1 AND recon_price > 0
        GROUP BY make_id, model_id, engine
      ) related_price
        ON related_price.make_id = p.make_id
        AND related_price.model_id = p.model_id
        AND related_price.engine = p.engine
      WHERE p.turbo_id = ? AND p.status = 1
      LIMIT 1
    `,
    [productId]
  );
  return (rows as any[])[0] ? mapLegacyTurbo((rows as any[])[0]) : null;
}

export async function createTurboRecord(turbo: Omit<StoredTurbo, "id" | "createdAt" | "updatedAt">) {
  if (useMysql()) {
    const [result] = await pool.query(
      "INSERT INTO turbos (sku, make, model, year, engine, bhp, type, price, trade_price, stock, images, description, seo_slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [turbo.sku, turbo.make, turbo.model, turbo.year, turbo.engine, turbo.bhp, turbo.type, turbo.price, turbo.tradePrice, turbo.stock, JSON.stringify(turbo.images), turbo.description, turbo.seoSlug]
    );
    const id = (result as any).insertId;
    const [rows] = await pool.query("SELECT * FROM turbos WHERE id = ?", [id]);
    return mapTurbo((rows as any[])[0]);
  }
  return updateAppData((data) => {
    const created: StoredTurbo = {
      id: nextId(data.turbos),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...turbo
    };
    data.turbos.push(created);
    return created;
  });
}

export async function updateTurboRecord(id: number, patch: Partial<StoredTurbo>) {
  if (useMysql()) {
    const updates: string[] = [];
    const params: any[] = [];
    
    if (patch.sku !== undefined) { updates.push("sku = ?"); params.push(patch.sku); }
    if (patch.make !== undefined) { updates.push("make = ?"); params.push(patch.make); }
    if (patch.model !== undefined) { updates.push("model = ?"); params.push(patch.model); }
    if (patch.year !== undefined) { updates.push("year = ?"); params.push(patch.year); }
    if (patch.engine !== undefined) { updates.push("engine = ?"); params.push(patch.engine); }
    if (patch.bhp !== undefined) { updates.push("bhp = ?"); params.push(patch.bhp); }
    if (patch.type !== undefined) { updates.push("type = ?"); params.push(patch.type); }
    if (patch.price !== undefined) { updates.push("price = ?"); params.push(patch.price); }
    if (patch.tradePrice !== undefined) { updates.push("trade_price = ?"); params.push(patch.tradePrice); }
    if (patch.stock !== undefined) { updates.push("stock = ?"); params.push(patch.stock); }
    if (patch.images !== undefined) { updates.push("images = ?"); params.push(JSON.stringify(patch.images)); }
    if (patch.description !== undefined) { updates.push("description = ?"); params.push(patch.description); }
    if (patch.seoSlug !== undefined) { updates.push("seo_slug = ?"); params.push(patch.seoSlug); }
    
    if (updates.length > 0) {
      params.push(id);
      await pool.query(`UPDATE turbos SET ${updates.join(", ")} WHERE id = ?`, params);
    }
    const [rows] = await pool.query("SELECT * FROM turbos WHERE id = ?", [id]);
    return mapTurbo((rows as any[])[0]);
  }
  return updateAppData((data) => {
    const existing = data.turbos.find((turbo) => turbo.id === id);
    if (!existing) return null;
    Object.assign(existing, patch, { updatedAt: new Date().toISOString() });
    return existing;
  });
}

export async function deleteTurboRecord(id: number) {
  if (useMysql()) {
    const [rows] = await pool.query("SELECT * FROM turbos WHERE id = ?", [id]);
    if ((rows as any[]).length === 0) return null;
    await pool.query("DELETE FROM turbos WHERE id = ?", [id]);
    return mapTurbo((rows as any[])[0]);
  }
  return updateAppData((data) => {
    const index = data.turbos.findIndex((turbo) => turbo.id === id);
    if (index < 0) return null;
    return data.turbos.splice(index, 1)[0];
  });
}

export async function findVehicleByRegistration(registration: string) {
  if (useMysql()) {
    const normalizedRegistration = registration.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    const [rows] = await carPool.query("SELECT * FROM vehicles WHERE registration = ? LIMIT 1", [normalizedRegistration]);
    const row = (rows as any[])[0];
    if (row) {
      const engineCapacity = row.engine ? Number(String(row.engine).replace(/[^0-9.]/g, "")) : undefined;
      return {
        registration: row.registration,
        registrationNumber: row.registration,
        make: row.make || undefined,
        model: row.model || undefined,
        year: row.year || undefined,
        engine: row.engine || undefined,
        engineCapacity: engineCapacity && engineCapacity < 100 ? Math.round(engineCapacity * 1000) : engineCapacity,
        fuel: row.fuel || undefined,
        fuelType: row.fuel || undefined,
        colour: row.colour || undefined,
        source: row.source
      };
    }

    const [legacyNameRows] = await carPool.query(
      "SELECT * FROM tbl_car_name WHERE reg_no = ? AND status = 1 LIMIT 1",
      [normalizedRegistration]
    );
    const legacyName = (legacyNameRows as any[])[0];
    if (legacyName) {
      return {
        registration: legacyName.reg_no,
        registrationNumber: legacyName.reg_no,
        make: legacyName.make_name || undefined,
        model: legacyName.model_name || undefined,
        year: legacyName.year || undefined,
        engine: legacyName.engine ? `${legacyName.engine}L` : undefined,
        engineCapacity: legacyName.engine ? Math.round(Number(legacyName.engine) * 1000) : undefined,
        fuel: legacyName.fuel || undefined,
        fuelType: legacyName.fuel || undefined,
        colour: undefined,
        bhp: legacyName.power1 || undefined,
        source: "db"
      };
    }

    const [legacyRows] = await carPool.query("SELECT * FROM tbl_car_data WHERE reg_no = ? AND status = 1 LIMIT 1", [
      normalizedRegistration
    ]);
    const legacy = (legacyRows as any[])[0];
    return legacy
      ? {
          registration: legacy.reg_no,
          registrationNumber: legacy.reg_no,
          make: undefined,
          model: undefined,
          year: legacy.year || undefined,
          engine: legacy.engine ? `${legacy.engine}L` : undefined,
          engineCapacity: legacy.engine ? Math.round(Number(legacy.engine) * 1000) : undefined,
          fuel: undefined,
          colour: undefined,
          bhp: legacy.power1 || undefined,
          source: "db"
        }
      : null;
  }
  return null;
}

export async function upsertVehicleRecord(input: {
  registration: string;
  make?: string;
  model?: string;
  year?: number;
  engine?: string;
  fuel?: string;
  colour?: string;
  source: "api" | "db" | "cache";
}) {
  if (useMysql()) {
    await carPool.query(
      `INSERT INTO vehicles (registration, make, model, year, engine, fuel, colour, source) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE make=VALUES(make), model=VALUES(model), year=VALUES(year), engine=VALUES(engine), fuel=VALUES(fuel), colour=VALUES(colour), source=VALUES(source)`,
      [input.registration, input.make, input.model, input.year, input.engine, input.fuel, input.colour, input.source]
    );
    const [rows] = await carPool.query("SELECT * FROM vehicles WHERE registration = ?", [input.registration]);
    return (rows as any[])[0];
  }
  return input;
}

export async function createLookupRecord(input: {
  registration: string;
  source: "api" | "db" | "cache";
  userIp?: string;
  vehicle?: Record<string, unknown>;
}) {
  if (useMysql()) {
    let vehicleId: number | undefined;
    if (input.vehicle) {
      const vehicle = await upsertVehicleRecord({
        registration: input.registration,
        make: (input.vehicle.make as string) || undefined,
        model: (input.vehicle.model as string) || undefined,
        year: (input.vehicle.year as number) || undefined,
        engine: (input.vehicle.engine as string) || undefined,
        fuel: (input.vehicle.fuel as string) || undefined,
        colour: (input.vehicle.colour as string) || undefined,
        source: input.source
      });
      vehicleId = vehicle.id;
    }
    
    const [result] = await carPool.query(
      "INSERT INTO lookup_log (registration, source, user_ip, vehicleId) VALUES (?, ?, ?, ?)",
      [input.registration, input.source, input.userIp, vehicleId]
    );
    
    const id = (result as any).insertId;
    const [rows] = await carPool.query(
      "SELECT l.*, v.make as v_make, v.model as v_model, v.year as v_year, v.engine as v_engine, v.fuel as v_fuel, v.colour as v_colour FROM lookup_log l LEFT JOIN vehicles v ON l.vehicleId = v.id WHERE l.id = ?",
      [id]
    );
    const row = (rows as any[])[0];
    if (row.vehicleId) {
       row.vehicle = { registration: row.registration, make: row.v_make, model: row.v_model, year: row.v_year, engine: row.v_engine, fuel: row.v_fuel, colour: row.v_colour };
    }
    return mapLookup(row);
  }
  return updateAppData((data) => {
    const lookup: StoredLookup = {
      id: nextId(data.lookups),
      registration: input.registration,
      source: input.source,
      userIp: input.userIp,
      vehicle: input.vehicle,
      createdAt: new Date().toISOString()
    };
    data.lookups.push(lookup);
    return lookup;
  });
}

export async function getLookupRecords() {
  if (useMysql()) {
    const [rows] = await carPool.query(
      "SELECT l.*, v.make as v_make, v.model as v_model, v.year as v_year, v.engine as v_engine, v.fuel as v_fuel, v.colour as v_colour FROM lookup_log l LEFT JOIN vehicles v ON l.vehicleId = v.id ORDER BY l.timestamp DESC"
    );
    return (rows as any[]).map((row) => {
      if (row.vehicleId) {
        row.vehicle = { registration: row.registration, make: row.v_make, model: row.v_model, year: row.v_year, engine: row.v_engine, fuel: row.v_fuel, colour: row.v_colour };
      }
      return mapLookup(row);
    });
  }
  return (await readAppData()).lookups;
}

export async function getLookupStats() {
  const lookups = await getLookupRecords();
  return {
    totalLookups: lookups.length,
    apiCalls: lookups.filter((entry: StoredLookup) => entry.source === "api").length,
    dbHits: lookups.filter((entry: StoredLookup) => entry.source === "db").length,
    cacheHits: lookups.filter((entry: StoredLookup) => entry.source === "cache").length
  };
}

export async function createOrderRecord(order: Omit<StoredOrder, "id" | "createdAt">) {
  if (useMysql()) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const [orderResult] = await connection.query(
        "INSERT INTO orders (user_id, email, status, total, stripe_payment_id, stripe_session_id, invoice_number, invoice_path, shipping_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [order.userId, order.email, order.status, order.total, order.stripePaymentId, order.stripeSessionId, order.invoiceNumber, order.invoicePath, order.shippingAddress]
      );
      const orderId = (orderResult as any).insertId;
      
      for (const item of order.items) {
        if (isLegacyTurboId(item.turboId)) {
          const turbo = await getTurboById(item.turboId);
          if (turbo) await upsertTurboSnapshot(connection, turbo);
        }
        await connection.query(
          "INSERT INTO order_items (order_id, turbo_id, sku, name, quantity, unit_price) VALUES (?, ?, ?, ?, ?, ?)",
          [orderId, item.turboId, item.sku, item.name, item.quantity, item.unitPrice]
        );
      }
      await connection.commit();
      
      return getOrderRecordById(orderId);
    } catch (e) {
      await connection.rollback();
      throw e;
    } finally {
      connection.release();
    }
  }
  return updateAppData((data) => {
    const created: StoredOrder = {
      id: nextId(data.orders),
      createdAt: new Date().toISOString(),
      ...order
    };
    data.orders.push(created);
    return created;
  });
}

async function upsertTurboSnapshot(connection: any, turbo: StoredTurbo) {
  await connection.query(
    `INSERT INTO turbos (id, sku, make, model, year, engine, bhp, type, price, trade_price, stock, images, description, seo_slug)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       sku=VALUES(sku), make=VALUES(make), model=VALUES(model), year=VALUES(year), engine=VALUES(engine),
       bhp=VALUES(bhp), type=VALUES(type), price=VALUES(price), trade_price=VALUES(trade_price),
       stock=VALUES(stock), images=VALUES(images), description=VALUES(description), seo_slug=VALUES(seo_slug)`,
    [
      turbo.id,
      turbo.sku,
      turbo.make,
      turbo.model,
      turbo.year ?? null,
      turbo.engine,
      turbo.bhp ?? null,
      turbo.type,
      turbo.price,
      turbo.tradePrice ?? null,
      turbo.stock,
      JSON.stringify(turbo.images),
      turbo.description,
      turbo.seoSlug
    ]
  );
}

export async function updateOrderPaymentRecord(orderId: number, patch: Partial<StoredOrder>) {
  if (useMysql()) {
    const updates: string[] = [];
    const params: any[] = [];
    
    if (patch.status !== undefined) { updates.push("status = ?"); params.push(patch.status); }
    if (patch.stripePaymentId !== undefined) { updates.push("stripe_payment_id = ?"); params.push(patch.stripePaymentId); }
    if (patch.stripeSessionId !== undefined) { updates.push("stripe_session_id = ?"); params.push(patch.stripeSessionId); }
    if (patch.invoiceNumber !== undefined) { updates.push("invoice_number = ?"); params.push(patch.invoiceNumber); }
    if (patch.invoicePath !== undefined) { updates.push("invoice_path = ?"); params.push(patch.invoicePath); }
    
    if (updates.length > 0) {
      params.push(orderId);
      await pool.query(`UPDATE orders SET ${updates.join(", ")} WHERE id = ?`, params);
    }
    
    return getOrderRecordById(orderId);
  }
  return updateAppData((data) => {
    const existing = data.orders.find((order) => order.id === orderId);
    if (!existing) return null;
    Object.assign(existing, patch);
    return existing;
  });
}

export async function getOrdersForUser(userId: number, email: string) {
  if (useMysql()) {
    const [rows] = await pool.query("SELECT * FROM orders WHERE user_id = ? OR email = ? ORDER BY created_at DESC", [userId, email]);
    
    const orders = (rows as any[]).map(mapOrder);
    for (const order of orders) {
      const [items] = await pool.query("SELECT i.*, t.make, t.model, t.engine FROM order_items i JOIN turbos t ON i.turbo_id = t.id WHERE i.order_id = ?", [order.id]);
      order.items = (items as any[]).map(item => ({
        turboId: item.turbo_id,
        sku: item.sku,
        name: item.name || `${item.make || ""} ${item.model || ""} ${item.engine || ""}`.trim(),
        quantity: item.quantity,
        unitPrice: Number(item.unit_price)
      }));
    }
    return orders;
  }
  return (await readAppData()).orders.filter((order) => order.userId === userId || order.email === email);
}

export async function getAllOrders() {
  if (useMysql()) {
    const [rows] = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
    
    const orders = (rows as any[]).map(mapOrder);
    for (const order of orders) {
      const [items] = await pool.query("SELECT i.*, t.make, t.model, t.engine FROM order_items i JOIN turbos t ON i.turbo_id = t.id WHERE i.order_id = ?", [order.id]);
      order.items = (items as any[]).map(item => ({
        turboId: item.turbo_id,
        sku: item.sku,
        name: item.name || `${item.make || ""} ${item.model || ""} ${item.engine || ""}`.trim(),
        quantity: item.quantity,
        unitPrice: Number(item.unit_price)
      }));
    }
    return orders;
  }
  return (await readAppData()).orders;
}

export async function getOrderRecordById(id: number) {
  if (useMysql()) {
    const [rows] = await pool.query("SELECT * FROM orders WHERE id = ? LIMIT 1", [id]);
    const row = (rows as any[])[0];
    if (!row) return null;
    
    const order = mapOrder(row);
    const [items] = await pool.query("SELECT i.*, t.make, t.model, t.engine FROM order_items i JOIN turbos t ON i.turbo_id = t.id WHERE i.order_id = ?", [id]);
    order.items = (items as any[]).map(item => ({
      turboId: item.turbo_id,
      sku: item.sku,
      name: item.name || `${item.make || ""} ${item.model || ""} ${item.engine || ""}`.trim(),
      quantity: item.quantity,
      unitPrice: Number(item.unit_price)
    }));
    return order;
  }
  return (await readAppData()).orders.find((order) => order.id === id) || null;
}

export async function updateOrderStatusRecord(id: number, status: string) {
  if (useMysql()) {
    await pool.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
    return getOrderRecordById(id);
  }
  return updateAppData((data) => {
    const existing = data.orders.find((order) => order.id === id);
    if (!existing) return null;
    existing.status = status;
    return existing;
  });
}

export async function getIpBlocks() {
  if (useMysql()) {
    const [rows] = await pool.query("SELECT * FROM ip_blocks ORDER BY blocked_at DESC");
    return (rows as any[]).map((row: any) => ({
      id: row.id,
      ipAddress: row.ip_address,
      reason: row.reason,
      redirectUrl: row.redirect_url || undefined,
      blockedAt: new Date(row.blocked_at).toISOString()
    }));
  }
  return (await readAppData()).ipBlocks;
}

export async function createIpBlockRecord(block: Omit<StoredIpBlock, "id" | "blockedAt">) {
  if (useMysql()) {
    const [result] = await pool.query(
      "INSERT INTO ip_blocks (ip_address, reason, redirect_url) VALUES (?, ?, ?)",
      [block.ipAddress, block.reason, block.redirectUrl]
    );
    const id = (result as any).insertId;
    const [rows] = await pool.query("SELECT * FROM ip_blocks WHERE id = ?", [id]);
    const row = (rows as any[])[0];
    return {
      id: row.id,
      ipAddress: row.ip_address,
      reason: row.reason,
      redirectUrl: row.redirect_url || undefined,
      blockedAt: new Date(row.blocked_at).toISOString()
    };
  }
  return updateAppData((data) => {
    const created: StoredIpBlock = { id: nextId(data.ipBlocks), blockedAt: new Date().toISOString(), ...block };
    data.ipBlocks.push(created);
    return created;
  });
}

export async function deleteIpBlockRecord(blockId: number) {
  if (useMysql()) {
    const [rows] = await pool.query("SELECT * FROM ip_blocks WHERE id = ?", [blockId]);
    if ((rows as any[]).length === 0) return null;
    const row = (rows as any[])[0];
    await pool.query("DELETE FROM ip_blocks WHERE id = ?", [blockId]);
    return {
      id: row.id,
      ipAddress: row.ip_address,
      reason: row.reason,
      redirectUrl: row.redirect_url || undefined,
      blockedAt: new Date(row.blocked_at).toISOString()
    };
  }
  return updateAppData((data) => {
    const index = data.ipBlocks.findIndex((block) => block.id === blockId);
    if (index < 0) return null;
    return data.ipBlocks.splice(index, 1)[0];
  });
}
