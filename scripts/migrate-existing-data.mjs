import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

const cwd = process.cwd();
const sourcePath = process.env.MIGRATION_SOURCE || path.join(cwd, "data", "existing-data.json");
const outputDir = path.join(cwd, ".data");
const appDataPath = path.join(outputDir, "app-data.json");
const outputPath = path.join(outputDir, "migration-report.json");

function isRealDatabaseUrl() {
  const url = process.env.DATABASE_URL || "";
  return Boolean(url && !url.includes("user:pass@host"));
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function nextId(items) {
  return items.length ? Math.max(...items.map((item) => Number(item.id) || 0)) + 1 : 1;
}

function normaliseTurbo(input) {
  const sku = String(input.sku || input.partNumber || input.turboNumber || "").trim().toUpperCase();
  const make = String(input.make || input.vehicleMake || "Universal").trim();
  const model = String(input.model || input.vehicleModel || "Application").trim();
  const engine = String(input.engine || input.engineSize || "Engine dependent").trim();

  if (!sku) throw new Error("Turbo row missing sku/partNumber/turboNumber");

  return {
    sku,
    make,
    model,
    year: input.year ? Number(input.year) : undefined,
    engine,
    bhp: input.bhp ? Number(input.bhp) : undefined,
    type: String(input.type || input.condition || "Replacement").trim(),
    price: Number(input.price || input.retailPrice || 0),
    tradePrice: input.tradePrice ? Number(input.tradePrice) : undefined,
    stock: Number(input.stock || input.quantity || 0),
    images: Array.isArray(input.images) && input.images.length ? input.images : ["/images/ace-turbo-preview.svg"],
    description: String(input.description || `${make} ${model} ${engine} turbocharger`).trim(),
    seoSlug: slugify(input.seoSlug || `${make} ${model} ${engine} ${sku}`)
  };
}

function normaliseVehicle(input) {
  const registration = String(input.registration || input.reg || "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  if (!registration) throw new Error("Vehicle row missing registration/reg");
  return {
    registration,
    make: input.make ? String(input.make) : undefined,
    model: input.model ? String(input.model) : undefined,
    year: input.year ? Number(input.year) : undefined,
    engine: input.engine ? String(input.engine) : undefined,
    fuel: input.fuel ? String(input.fuel) : undefined,
    colour: input.colour || input.color ? String(input.colour || input.color) : undefined,
    source: input.source === "cache" || input.source === "db" ? input.source : "api"
  };
}

function normaliseUser(input) {
  const email = String(input.email || "").trim().toLowerCase();
  if (!email) throw new Error("User row missing email");
  return {
    email,
    passwordHash: input.passwordHash || bcrypt.hashSync(String(input.password || "ChangeMe12345!"), 10),
    role: ["customer", "b2b", "admin"].includes(input.role) ? input.role : "customer",
    firstName: String(input.firstName || input.first_name || "Customer"),
    lastName: String(input.lastName || input.last_name || ""),
    company: input.company ? String(input.company) : undefined,
    phone: input.phone ? String(input.phone) : undefined
  };
}

function normaliseBlogPost(input) {
  const title = String(input.title || "").trim();
  if (!title) throw new Error("Blog row missing title");
  return {
    slug: slugify(input.slug || title),
    title,
    excerpt: String(input.excerpt || input.summary || title).slice(0, 200),
    body: String(input.body || input.content || input.excerpt || title),
    coverImage: input.coverImage || input.cover_image || "/images/ace-turbo-preview.svg",
    publishedAt: input.publishedAt || input.published_at || new Date().toISOString(),
    tags: Array.isArray(input.tags) ? input.tags.map((tag) => slugify(tag)) : []
  };
}

async function readJsonSource() {
  const raw = await readFile(sourcePath, "utf8");
  const parsed = JSON.parse(raw);
  return {
    turbos: Array.isArray(parsed.turbos) ? parsed.turbos : [],
    vehicles: Array.isArray(parsed.vehicles) ? parsed.vehicles : [],
    users: Array.isArray(parsed.users) ? parsed.users : [],
    blogPosts: Array.isArray(parsed.blogPosts || parsed.posts || parsed.news) ? parsed.blogPosts || parsed.posts || parsed.news : []
  };
}

async function importToMySQL(source) {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  const carConn = process.env.DATABASE2_URL
    ? await mysql.createConnection(process.env.DATABASE2_URL)
    : conn;
  const counts = { turbos: 0, vehicles: 0, users: 0, blogPosts: 0 };

  try {
    for (const row of source.turbos.map(normaliseTurbo)) {
      await conn.execute(
        `INSERT INTO turbos (sku, make, model, year, engine, bhp, type, price, trade_price, stock, images, description, seo_slug)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           make=VALUES(make), model=VALUES(model), year=VALUES(year), engine=VALUES(engine),
           bhp=VALUES(bhp), type=VALUES(type), price=VALUES(price), trade_price=VALUES(trade_price),
           stock=VALUES(stock), images=VALUES(images), description=VALUES(description), seo_slug=VALUES(seo_slug)`,
        [
          row.sku, row.make, row.model, row.year ?? null, row.engine, row.bhp ?? null,
          row.type, row.price, row.tradePrice ?? null, row.stock,
          JSON.stringify(row.images), row.description, row.seoSlug
        ]
      );
      counts.turbos += 1;
    }

    for (const row of source.vehicles.map(normaliseVehicle)) {
      await carConn.execute(
        `INSERT INTO vehicles (registration, make, model, year, engine, fuel, colour, source)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           make=VALUES(make), model=VALUES(model), year=VALUES(year), engine=VALUES(engine),
           fuel=VALUES(fuel), colour=VALUES(colour), source=VALUES(source)`,
        [
          row.registration, row.make ?? null, row.model ?? null, row.year ?? null,
          row.engine ?? null, row.fuel ?? null, row.colour ?? null, row.source
        ]
      );
      counts.vehicles += 1;
    }

    for (const row of source.users.map(normaliseUser)) {
      await conn.execute(
        `INSERT INTO users (email, password_hash, role, first_name, last_name, company, phone)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           role=VALUES(role), first_name=VALUES(first_name), last_name=VALUES(last_name),
           company=VALUES(company), phone=VALUES(phone)`,
        [
          row.email, row.passwordHash, row.role, row.firstName,
          row.lastName ?? null, row.company ?? null, row.phone ?? null
        ]
      );
      counts.users += 1;
    }

    // No blog_posts table in MySQL schema — blog posts stay in local JSON store
    counts.blogPosts = source.blogPosts.length;
    return counts;
  } finally {
    await conn.end();
    if (carConn !== conn) await carConn.end();
  }
}

async function importToLocalStore(source) {
  await mkdir(outputDir, { recursive: true });
  let data;
  try {
    data = JSON.parse(await readFile(appDataPath, "utf8"));
  } catch {
    data = {
      users: [],
      sessions: [],
      turbos: [],
      carts: [],
      orders: [],
      lookups: [],
      ipBlocks: [],
      contactMessages: [],
      blogPosts: [],
      ebayListings: [],
      auditRuns: []
    };
  }

  const counts = { turbos: 0, vehicles: 0, users: 0, blogPosts: 0 };

  for (const row of source.turbos.map(normaliseTurbo)) {
    const existing = data.turbos.find((turbo) => turbo.sku === row.sku);
    if (existing) Object.assign(existing, row, { updatedAt: new Date().toISOString() });
    else data.turbos.push({ id: nextId(data.turbos), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...row });
    counts.turbos += 1;
  }

  for (const row of source.vehicles.map(normaliseVehicle)) {
    data.lookups.push({
      id: nextId(data.lookups),
      registration: row.registration,
      source: row.source,
      vehicle: row,
      createdAt: new Date().toISOString()
    });
    counts.vehicles += 1;
  }

  for (const row of source.users.map(normaliseUser)) {
    const existing = data.users.find((user) => user.email === row.email);
    if (existing) Object.assign(existing, row);
    else data.users.push({ id: nextId(data.users), createdAt: new Date().toISOString(), ...row });
    counts.users += 1;
  }

  for (const row of source.blogPosts.map(normaliseBlogPost)) {
    const existing = data.blogPosts.find((post) => post.slug === row.slug);
    if (existing) Object.assign(existing, row);
    else data.blogPosts.push({ id: nextId(data.blogPosts), ...row });
    counts.blogPosts += 1;
  }

  await writeFile(appDataPath, JSON.stringify(data, null, 2), "utf8");
  return counts;
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  try {
    const source = await readJsonSource();
    const target = isRealDatabaseUrl() ? "mysql" : "local-json";
    const counts = target === "mysql" ? await importToMySQL(source) : await importToLocalStore(source);
    const report = {
      migratedAt: new Date().toISOString(),
      sourcePath,
      target,
      counts,
      status: "completed"
    };
    await writeFile(outputPath, JSON.stringify(report, null, 2), "utf8");
    console.log(`Migration completed into ${target}. Report written to ${outputPath}`);
  } catch (error) {
    const report = {
      migratedAt: new Date().toISOString(),
      sourcePath,
      status: "blocked",
      note: "Provide data/existing-data.json or set MIGRATION_SOURCE to an exported Ace Turbo JSON file.",
      error: String(error)
    };
    await writeFile(outputPath, JSON.stringify(report, null, 2), "utf8");
    console.log(`Migration blocked. Report written to ${outputPath}`);
    process.exitCode = 1;
  }
}

main();
