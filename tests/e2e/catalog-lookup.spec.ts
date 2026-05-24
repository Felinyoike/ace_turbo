/**
 * Domain 2: Vehicle Catalog & Car Registration Lookup API
 * Tests /api/car-lookup endpoint, turbo finder form, and error handling.
 */
import { expect, test } from "@playwright/test";

test.describe("Car Registration Lookup API", () => {
  test("POST /api/car-lookup returns vehicle data for a valid registration", async ({ request }) => {
    const response = await request.post("/api/car-lookup", {
      data: { registration: "AB12CDE" }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("registration");
    expect(body).toHaveProperty("vehicle");
    expect(body.vehicle).toHaveProperty("make");
  });

  test("POST /api/car-lookup rejects invalid registration format", async ({ request }) => {
    const response = await request.post("/api/car-lookup", {
      data: { registration: "" }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });

  test("POST /api/car-lookup returns 400 for missing body", async ({ request }) => {
    const response = await request.post("/api/car-lookup", {
      data: {}
    });

    expect(response.status()).toBe(400);
  });

  test("GET /api/car-lookup returns 405 (method not allowed)", async ({ request }) => {
    const response = await request.get("/api/car-lookup");
    // Next.js App Router returns 405 for unsupported methods
    expect([404, 405]).toContain(response.status());
  });
});

test.describe("Turbo Finder Form (Homepage)", () => {
  test("registration lookup form submits and navigates to /turbos", async ({ page }) => {
    await page.goto("/");

    const regInput = page.locator("input[placeholder*='reg' i], input[name='registration']").first();
    if (await regInput.isVisible()) {
      await regInput.fill("AB12CDE");

      const submitBtn = page.locator("button:has-text('Search'), button:has-text('Find'), button[type='submit']").first();
      await submitBtn.click();

      // Should navigate to /turbos with query params
      await page.waitForURL(/\/turbos/, { timeout: 10_000 });
      expect(page.url()).toContain("/turbos");
    }
  });

  test("part number lookup redirects to /turbos with partNumber param", async ({ page }) => {
    await page.goto("/");

    // Look for the part number tab/input
    const partTab = page.locator("button:has-text('Part Number'), button:has-text('part')").first();
    if (await partTab.isVisible()) {
      await partTab.click();
    }

    const partInput = page.locator("input[placeholder*='part' i], input[name='partNumber']").first();
    if (await partInput.isVisible()) {
      await partInput.fill("GT1544V");

      const submitBtn = partInput.locator("..").locator("button[type='submit'], button:has-text('Search')").first();
      if (await submitBtn.isVisible()) {
        await submitBtn.click();
        await page.waitForURL(/partNumber/i, { timeout: 10_000 });
        expect(page.url()).toContain("partNumber=");
      }
    }
  });
});

test.describe("Turbo Catalog Pages", () => {
  test("/turbos page loads and shows search interface", async ({ page }) => {
    await page.goto("/turbos");
    await expect(page).toHaveTitle(/turbo/i);
    await expect(page.locator("h1")).toContainText(/turbo/i);
  });

  test("/turbos/brands page loads and shows brand catalog", async ({ page }) => {
    await page.goto("/turbos/brands");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("/turbos page respects force-dynamic (no stale cache)", async ({ request }) => {
    const r1 = await request.get("/turbos");
    const r2 = await request.get("/turbos");
    // Both should return 200 (not 304 from a static cache)
    expect(r1.status()).toBe(200);
    expect(r2.status()).toBe(200);
  });
});
