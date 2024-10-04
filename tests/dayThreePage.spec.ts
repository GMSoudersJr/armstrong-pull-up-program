import { DayThreePage } from "./pom/day-three-page";
import { test, expect } from "@playwright/test";

test("expect correct elements", async ({ page }) => {
  const dayThreePage = new DayThreePage(page);
  await dayThreePage.goto();
  await expect(dayThreePage.homeLink).toBeVisible();
  await expect(dayThreePage.dayHeading).toBeVisible();
  await expect(dayThreePage.exerciseHeading).toBeVisible();
  await expect(dayThreePage.recoveryHeading).toBeVisible();
  await expect(dayThreePage.hintButton).toBeVisible();
  await expect(dayThreePage.hintButton).toBeEnabled();
  await expect(dayThreePage.repInput).toBeVisible();
  await expect(dayThreePage.repInput).toBeEnabled();
  await expect(dayThreePage.decrementRepButton).toBeVisible();
  await expect(dayThreePage.decrementRepButton).toBeDisabled();
  await expect(dayThreePage.incrementRepButton).toBeVisible();
  await expect(dayThreePage.incrementRepButton).toBeEnabled();
  await expect(dayThreePage.submitButton).toBeVisible();
  await expect(dayThreePage.submitButton).toBeEnabled();
});
