import { LandingPage } from "./pom/landing-page";
import { test, expect } from "@playwright/test";

test("features link should navigate to features", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await expect(landingPage.featuresHeader).toBeVisible();
  await expect(landingPage.testimonialsHeader).toBeVisible();
  await expect(landingPage.overviewHeader).toBeVisible();
});
