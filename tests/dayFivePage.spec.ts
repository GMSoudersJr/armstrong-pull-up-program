import { DayFivePage } from "./pom/day-five-page";
import { test, expect } from "@playwright/test";

test("expect correct elements", async ({ page }) => {
  const dayFivePage = new DayFivePage(page);
  await dayFivePage.goto();
  await expect(dayFivePage.homeLink).toBeVisible();
  await expect(dayFivePage.dayHeading).toBeVisible();
  await expect(dayFivePage.heading2).toBeVisible();
  await expect(dayFivePage.heading3).toBeVisible();
  await expect(dayFivePage.hintButton).toBeVisible();
  await expect(dayFivePage.hintButton).toBeEnabled();
  await expect(dayFivePage.dayOneButton).toBeVisible();
  await expect(dayFivePage.dayOneButton).toBeEnabled();
  await expect(dayFivePage.dayTwoButton).toBeVisible();
  await expect(dayFivePage.dayTwoButton).toBeEnabled();
  await expect(dayFivePage.dayThreeButton).toBeVisible();
  await expect(dayFivePage.dayThreeButton).toBeEnabled();
  await expect(dayFivePage.dayFourButton).toBeVisible();
  await expect(dayFivePage.dayFourButton).toBeEnabled();
});
