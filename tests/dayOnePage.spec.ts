import { DayOnePage } from "./pom/day-one-page";
import { test, expect } from "@playwright/test";

test("expect correct elements", async ({ page }) => {
  const dayOnePage = new DayOnePage(page);
  await dayOnePage.goto();
  await expect(dayOnePage.homeLink).toBeVisible();
  await expect(dayOnePage.dayHeading).toBeVisible();
  await expect(dayOnePage.exerciseHeading).toBeVisible();
  await expect(dayOnePage.recoveryHeading).toBeVisible();
  await expect(dayOnePage.hintButton).toBeVisible();
  await expect(dayOnePage.hintButton).toBeEnabled();
  await expect(dayOnePage.progressBar).toBeVisible();
  await expect(dayOnePage.repInput).toBeVisible();
  await expect(dayOnePage.decrementRepButton).toBeVisible();
  await expect(dayOnePage.decrementRepButton).toBeDisabled();
  await expect(dayOnePage.incrementRepButton).toBeVisible();
  await expect(dayOnePage.incrementRepButton).toBeEnabled();
  await expect(dayOnePage.repsRemoveButton).toBeVisible();
  await expect(dayOnePage.repsRemoveButton).toBeDisabled();
  await expect(dayOnePage.repsCompleteButton).toBeVisible();
  await expect(dayOnePage.repsCompleteButton).toBeEnabled();
  await expect(dayOnePage.setsTable).not.toBeVisible();
});
