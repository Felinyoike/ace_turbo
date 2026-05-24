/**
 * Domain 4: Admin Dashboard Security & Auditing Modules
 * Tests session guardrails and unauthenticated access to protected routes.
 */
import { expect, test } from "@playwright/test";

test.describe("Admin Route Protection (Unauthenticated)", () => {
  const adminRoutes = [
    "/admin",
    "/admin/turbos",
    "/admin/users",
    "/admin/orders",
    "/admin/car-lookup",
    "/admin/car-lookup/stats",
    "/admin/ebay",
    "/admin/seo",
    "/admin/audit"
  ];

  for (const route of adminRoutes) {
    test(`${route} redirects unauthenticated users to /account`, async ({ page }) => {
      await page.goto(route);
      // Middleware should redirect to /account with ?next= param
      await page.waitForURL(/\/account/, { timeout: 10_000 });
      expect(page.url()).toContain("/account");
    });
  }
});

test.describe("Admin API Route Protection (Unauthenticated)", () => {
  test("GET /api/admin/users returns 401 or redirect without auth", async ({ request }) => {
    const response = await request.get("/api/admin/users", {
      maxRedirects: 0
    });
    // Should be 307 redirect or 401/403
    expect([307, 401, 403]).toContain(response.status());
  });
});

test.describe("B2B Route Protection", () => {
  test("/b2b redirects unauthenticated users to /account", async ({ page }) => {
    await page.goto("/b2b");
    await page.waitForURL(/\/account/, { timeout: 10_000 });
    expect(page.url()).toContain("/account");
  });
});

test.describe("Protected Account Routes", () => {
  test("/account/orders redirects unauthenticated users", async ({ page }) => {
    await page.goto("/account/orders");
    await page.waitForURL(/\/account/, { timeout: 10_000 });
    expect(page.url()).toContain("/account");
  });

  test("/account/invoices redirects unauthenticated users", async ({ page }) => {
    await page.goto("/account/invoices");
    await page.waitForURL(/\/account/, { timeout: 10_000 });
    expect(page.url()).toContain("/account");
  });
});

test.describe("Public Pages Load Correctly", () => {
  const publicRoutes = [
    { path: "/", title: /ace/i },
    { path: "/contact", title: /contact/i },
    { path: "/services", title: /service/i },
    { path: "/turbos", title: /turbo/i },
    { path: "/news", title: /news/i },
    { path: "/cart", title: /cart/i },
  ];

  for (const route of publicRoutes) {
    test(`${route.path} loads without error`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
    });
  }
});
