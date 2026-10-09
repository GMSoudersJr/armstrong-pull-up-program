import { LandingPage } from "./pom/landing-page";
import { test, expect } from "@playwright/test";
import { APP_STORE_ID } from "@/lib/appStore";

test("should have correct links", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await expect(landingPage.featuresLink).toBeVisible();
  await expect(landingPage.testimonialsLink).toBeVisible();
  await expect(landingPage.overviewLink).toBeVisible();
  await expect(landingPage.startInBrowserLink).toBeVisible();
  await expect(landingPage.getStartedLink).toBeVisible();
  await expect(landingPage.pdfSourceLink).toBeVisible();
  await expect(landingPage.suitYourselfLink).toBeVisible();
  await expect(landingPage.githubIcon).toBeVisible();
  await expect(landingPage.linkedInIcon).toBeVisible();
});

test("should have correct headers / sections", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await expect(landingPage.featuresHeader).toBeVisible();
  await expect(landingPage.testimonialsHeader).toBeVisible();
  await expect(landingPage.overviewHeader).toBeVisible();
  await expect(landingPage.appInstallationHeader).toBeVisible();
  await expect(landingPage.mostDevicesHeader).toBeVisible();
  await expect(landingPage.iOSDevicesHeader).toBeVisible();
  await expect(landingPage.copyrightSection).toBeVisible();
});

test("get started should navigate to app", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await landingPage.getStarted();
  await expect(
    page.getByRole("link", { name: "PULLUP PROGRAM" }),
  ).toBeVisible();
});

test("should have the Smart App Banner meta tag", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await expect(page.locator('meta[name="apple-itunes-app"]')).toHaveAttribute(
    "content",
    `app-id=${APP_STORE_ID}`,
  );
});

test("hero should link to the App Store", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await expect(landingPage.appStoreHeroLink).toBeVisible();
  const href = await landingPage.appStoreHeroLink.getAttribute("href");
  expect(href).toContain(`id${APP_STORE_ID}`);
  expect(href).toContain("ct=web-hero");
});

test("start in browser should navigate to the program", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await landingPage.startInBrowserLink.click();
  await expect(page).toHaveURL(/\/program$/);
});

test("iOS install instructions should link to the App Store", async ({
  page,
}) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  const badge = page
    .locator("#iosDevices")
    .getByRole("link", { name: "Download on the App Store" });
  await expect(badge).toBeVisible();
  expect(await badge.getAttribute("href")).toContain("ct=web-install");
});

test("page title should not repeat the brand", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await expect(page).toHaveTitle(
    "Rep Yourself | Armstrong Pull-up Program App & Tracker",
  );
});
