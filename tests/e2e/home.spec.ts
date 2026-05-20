import { expect, test } from "@playwright/test";

test("homepage includes reg lookup and turbo search", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /engineered/i, level: 1 })).toBeVisible();
  await expect(page.getByLabel("Turbo Finder")).toBeVisible();
});
