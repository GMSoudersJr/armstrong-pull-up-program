import { LandingPage } from "./pom/landing-page";
import { test, expect } from "@playwright/test";

test("landing page should have correct links", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await expect(landingPage.learnMoreLink).toBeVisible();
  await expect(landingPage.featuresLink).toBeVisible();
  await expect(landingPage.testimonialsLink).toBeVisible();
  await expect(landingPage.overviewLink).toBeVisible();
  await expect(landingPage.getStartedLink).toBeVisible();
});

test("landing page should have correct headers", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await expect(landingPage.featuresHeader).toBeVisible();
  await expect(landingPage.testimonialsHeader).toBeVisible();
  await expect(landingPage.overviewHeader).toBeVisible();
  await expect(landingPage.appInstallationHeader).toBeVisible();
  await expect(landingPage.mostDevicesHeader).toBeVisible();
  await expect(landingPage.iOSDevicesHeader).toBeVisible();
});

test("get started should navigate to app", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await landingPage.getStarted();
  expect(page.locator("h1", { hasText: "PULLUP PROGRAM" }));
});
