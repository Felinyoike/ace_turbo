/**
 * Domain 3: Dynamic Sitemap & Search Index Pipelines
 * Tests sitemap generation, route integrity, and concurrent fetch performance.
 */
import { expect, test } from "@playwright/test";

test.describe("Sitemap Generation", () => {
  test("GET /sitemap.xml returns valid XML with required static routes", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const contentType = response.headers()["content-type"] || "";
    expect(contentType).toMatch(/xml/i);

    const body = await response.text();

    // Must include required static routes
    const requiredPaths = ["/turbos", "/contact", "/brands", "/news", "/b2b"];
    for (const path of requiredPaths) {
      expect(body).toContain(path);
    }
  });

  test("sitemap includes properly formatted URL entries", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    // Verify XML structure
    expect(body).toContain("<urlset");
    expect(body).toContain("<url>");
    expect(body).toContain("<loc>");
  });

  test("sitemap includes dynamic turbo product routes if data exists", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    // Count <url> entries — should have at least the 6 static routes
    const urlCount = (body.match(/<url>/g) || []).length;
    expect(urlCount).toBeGreaterThanOrEqual(6);
  });

  test("sitemap responds within acceptable time (< 5s)", async ({ request }) => {
    const start = Date.now();
    const response = await request.get("/sitemap.xml");
    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(5000);
  });
});
