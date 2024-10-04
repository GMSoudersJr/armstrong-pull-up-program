import { DayFourPage } from "./pom/day-four-page";
import { test, expect } from "@playwright/test";

test("expect correct elements", async ({ page }) => {
  const dayFourPage = new DayFourPage(page);
  await dayFourPage.goto();
  await expect(dayFourPage.homeLink).toBeVisible();
  await expect(dayFourPage.dayHeading).toBeVisible();
  await expect(dayFourPage.exerciseHeading).toBeVisible();
  await expect(dayFourPage.recoveryHeading).toBeVisible();
  await expect(dayFourPage.hintButton).toBeVisible();
  await expect(dayFourPage.hintButton).toBeEnabled();
  await expect(dayFourPage.decrementRepButton).toBeVisible();
  await expect(dayFourPage.decrementRepButton).toBeDisabled();
  await expect(dayFourPage.repInput).toBeVisible();
  await expect(dayFourPage.repInput).toBeEnabled();
  await expect(dayFourPage.incrementRepButton).toBeVisible();
  await expect(dayFourPage.incrementRepButton).toBeEnabled();
  await expect(dayFourPage.submitButton).toBeVisible();
  await expect(dayFourPage.submitButton).toBeEnabled();
});
