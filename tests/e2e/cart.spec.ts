/**
 * Cart Functionality E2E Tests
 * Tests cart API (GET, POST, PATCH, DELETE), cart page rendering, and checkout flow.
 */
import { expect, test } from "@playwright/test";

test.describe("Cart API", () => {
  test.afterEach(async ({ request }) => {
    // Clean teardown — clear cart after each test
    await request.delete("/api/cart");
  });

  test("GET /api/cart returns empty cart initially", async ({ request }) => {
    await request.delete("/api/cart");
    const response = await request.get("/api/cart");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("items");
    expect(body).toHaveProperty("total");
  });

  test("POST /api/cart adds an item", async ({ request }) => {
    const response = await request.post("/api/cart", {
      data: { turboId: 1, quantity: 1 }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("status", "added");
  });

  test("POST /api/cart rejects invalid turboId", async ({ request }) => {
    const response = await request.post("/api/cart", {
      data: { turboId: -1, quantity: 1 }
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/cart rejects quantity > 20", async ({ request }) => {
    const response = await request.post("/api/cart", {
      data: { turboId: 1, quantity: 21 }
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/cart rejects missing fields", async ({ request }) => {
    const response = await request.post("/api/cart", {
      data: {}
    });
    expect(response.status()).toBe(400);
  });

  test("PATCH /api/cart updates item quantity", async ({ request }) => {
    await request.post("/api/cart", { data: { turboId: 1, quantity: 1 } });

    const response = await request.patch("/api/cart", {
      data: { turboId: 1, quantity: 3 }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("status", "updated");
  });

  test("DELETE /api/cart clears the cart", async ({ request }) => {
    await request.post("/api/cart", { data: { turboId: 1, quantity: 1 } });

    const response = await request.delete("/api/cart");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("status", "cleared");
  });
});

test.describe("Cart Page", () => {
  test("/cart page loads with 200", async ({ page }) => {
    const response = await page.goto("/cart");
    expect(response?.status()).toBe(200);
  });

  test("/cart shows empty state when cart is empty", async ({ request, page }) => {
    await request.delete("/api/cart");
    await page.goto("/cart");
    await expect(page.locator("text=empty")).toBeVisible();
  });

  test("/cart shows Browse Stock link when empty", async ({ request, page }) => {
    await request.delete("/api/cart");
    await page.goto("/cart");
    const browseLink = page.locator("a:has-text('Browse Stock')");
    await expect(browseLink).toBeVisible();
    await expect(browseLink).toHaveAttribute("href", "/turbos");
  });
});

test.describe("Checkout Page", () => {
  test("/checkout page loads with 200", async ({ page }) => {
    const response = await page.goto("/checkout");
    expect(response?.status()).toBe(200);
  });

  test("/checkout shows empty cart message when no items", async ({ request, page }) => {
    await request.delete("/api/cart");
    await page.goto("/checkout");
    await expect(page.locator("text=empty")).toBeVisible();
  });
});
