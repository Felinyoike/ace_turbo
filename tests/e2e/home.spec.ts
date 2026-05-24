import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with 200 status and renders main heading", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("displays the four component cards (CHRA, Actuators, Wheels, VNT)", async ({ page }) => {
    await page.goto("/");
    for (const name of ["CHRA", "ACTUATORS", "WHEELS", "VNT RINGS"]) {
      await expect(page.locator(`h3:has-text("${name}")`)).toBeVisible();
    }
  });

  test("component cards have zoom-on-hover effect classes", async ({ page }) => {
    await page.goto("/");
    const card = page.locator("article").first();
    await expect(card).toBeVisible();

    // Card should have transition and hover translate classes
    const classes = await card.getAttribute("class");
    expect(classes).toContain("transition-all");
    expect(classes).toContain("hover:-translate-y-1");
  });

  test("VIEW FULL CATALOG links to /turbos/brands", async ({ page }) => {
    await page.goto("/");
    const catalogLink = page.locator("a:has-text('VIEW FULL CATALOG')");
    await expect(catalogLink).toBeVisible();
    await expect(catalogLink).toHaveAttribute("href", "/turbos/brands");
  });

  test("How It Works section shows three process steps", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=HOW IT WORKS")).toBeVisible();
    await expect(page.locator("text=CONTACT US").first()).toBeVisible();
    await expect(page.locator("text=STRIP & ASSESS")).toBeVisible();
    await expect(page.locator("text=REMANUFACTURE & RETURN")).toBeVisible();
  });

  test("quote request form is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=QUOTE REQUEST")).toBeVisible();
  });

  test("navigation header contains cart and dealer portal links", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("a[href='/cart']").first()).toBeVisible();
    await expect(page.locator("a[href='/b2b']")).toBeVisible();
  });
});
