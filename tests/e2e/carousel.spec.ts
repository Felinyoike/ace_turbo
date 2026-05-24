/**
 * Domain 1: Dynamic Hero Image Carousel & Client States
 * Tests carousel mounting, slide transitions, and indicator controls.
 */
import { expect, test } from "@playwright/test";

test.describe("Hero Image Carousel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("mounts on the client and displays the first slide image", async ({ page }) => {
    const carousel = page.locator("[class*='overflow-hidden']").first();
    await expect(carousel).toBeVisible();

    const firstImage = page.locator("img[src='/images/blueturbo.png']");
    await expect(firstImage).toBeVisible();
  });

  test("transitions to the second slide after ~5 seconds", async ({ page }) => {
    const slide1 = page.locator("img[src='/images/blueturbo.png']").locator("..");
    const slide2 = page.locator("img[src='/images/blueturbo2.png']").locator("..");

    // Initially slide 1 should be active (opacity: 1)
    await expect(slide1).toHaveCSS("opacity", "1");

    // Wait for the transition (5s interval + 1s transition buffer)
    await page.waitForTimeout(6500);

    // After transition, slide 2 should become active
    await expect(slide2).toHaveCSS("opacity", "1");
    await expect(slide1).toHaveCSS("opacity", "0");
  });

  test("clicking slide indicators changes the active slide", async ({ page }) => {
    const indicators = page.locator("button[aria-label^='Slide']");
    await expect(indicators).toHaveCount(2);

    // Click second indicator
    await indicators.nth(1).click();
    await page.waitForTimeout(1200);

    const slide2 = page.locator("img[src='/images/blueturbo2.png']").locator("..");
    await expect(slide2).toHaveCSS("opacity", "1");

    // Click first indicator to go back
    await indicators.nth(0).click();
    await page.waitForTimeout(1200);

    const slide1 = page.locator("img[src='/images/blueturbo.png']").locator("..");
    await expect(slide1).toHaveCSS("opacity", "1");
  });

  test("both carousel images load successfully", async ({ page }) => {
    const img1 = page.locator("img[src='/images/blueturbo.png']");
    const img2 = page.locator("img[src='/images/blueturbo2.png']");

    await expect(img1).toHaveAttribute("src", "/images/blueturbo.png");
    await expect(img2).toHaveAttribute("src", "/images/blueturbo2.png");

    // Verify images actually loaded (naturalWidth > 0)
    const loaded1 = await img1.evaluate((el: HTMLImageElement) => el.naturalWidth > 0);
    const loaded2 = await img2.evaluate((el: HTMLImageElement) => el.naturalWidth > 0);
    expect(loaded1).toBe(true);
    expect(loaded2).toBe(true);
  });
});
