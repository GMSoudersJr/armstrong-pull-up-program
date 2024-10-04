import { DayTwoPage } from "./pom/day-two-page";
import { test, expect } from "@playwright/test";

test("expect correct elements", async ({ page }) => {
  const dayTwoPage = new DayTwoPage(page);
  await dayTwoPage.goto();
  await expect(dayTwoPage.homeLink).toBeVisible();
  await expect(dayTwoPage.dayHeading).toBeVisible();
  await expect(dayTwoPage.exerciseHeading).toBeVisible();
  await expect(dayTwoPage.recoveryHeading).toBeVisible();
  await expect(dayTwoPage.dailyHintButton).toBeVisible();
  await expect(dayTwoPage.dailyHintButton).toBeEnabled();
  await expect(dayTwoPage.pyramid).not.toBeVisible();
  await expect(dayTwoPage.repsHeading).toBeVisible();
  await expect(dayTwoPage.missSetbutton).toBeVisible();
  await expect(dayTwoPage.missSetbutton).toBeDisabled();
  await expect(dayTwoPage.repsCompleteButton).toBeVisible();
  await expect(dayTwoPage.repsCompleteButton).toBeEnabled();
});
