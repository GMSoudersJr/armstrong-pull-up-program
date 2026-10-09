import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/armstrong-program");
});

test("has the correct title without a duplicated brand", async ({ page }) => {
  await expect(page).toHaveTitle(
    "The Armstrong Pull-up Program: Full 5-Day Routine Explained | Rep Yourself",
  );
});

test("has a self-referencing canonical URL", async ({ page }) => {
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://repyourself.app/armstrong-program",
  );
});

test("renders the program content and source credit", async ({ page }) => {
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "The Armstrong Pull-up Program",
    }),
  ).toBeVisible();
  for (const day of ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"]) {
    await expect(
      page.getByRole("heading", { name: new RegExp(`^${day}:`) }),
    ).toBeVisible();
  }
  await expect(
    page.getByRole("heading", { name: "Medical disclaimer" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "the original program (PDF)" }),
  ).toHaveAttribute("href", /\.pdf$/);
});

test("ends with App Store and browser CTAs", async ({ page }) => {
  const badge = page
    .locator("main")
    .getByRole("link", { name: "Download on the App Store" });
  await expect(badge).toBeVisible();
  expect(await badge.getAttribute("href")).toContain("ct=web-faq");
  await expect(
    page.getByRole("link", { name: "Start in browser" }),
  ).toHaveAttribute("href", "/program");
});
