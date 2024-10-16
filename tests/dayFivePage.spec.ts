import { DayFiveWorkoutPage } from "./pom";
import { test, expect } from "@playwright/test";

test("expect correct elements", async ({ page }) => {
  const dayFivePage = new DayFiveWorkoutPage(page, 5);
  await dayFivePage.goto();
  await expect(dayFivePage.homeLink).toBeVisible();
  await expect(dayFivePage.dayHeading).toBeVisible();
  await expect(dayFivePage.exerciseHeading).toBeVisible();
  await expect(dayFivePage.recoveryHeading).toBeVisible();
  await expect(dayFivePage.dailyHintButton).toBeVisible();
  await expect(dayFivePage.dailyHintButton).toBeEnabled();
  await expect(dayFivePage.dayOneButton).toBeVisible();
  await expect(dayFivePage.dayOneButton).toBeEnabled();
  await expect(dayFivePage.dayTwoButton).toBeVisible();
  await expect(dayFivePage.dayTwoButton).toBeEnabled();
  await expect(dayFivePage.dayThreeButton).toBeVisible();
  await expect(dayFivePage.dayThreeButton).toBeEnabled();
  await expect(dayFivePage.dayFourButton).toBeVisible();
  await expect(dayFivePage.dayFourButton).toBeEnabled();
});

test("expect correct day one headings", async ({ page }) => {
  const dayFivePage = new DayFiveWorkoutPage(page, 5);
  await dayFivePage.goto();
  await dayFivePage.pressDay1Button();
  await expect(dayFivePage.repeatDayOneExerciseHeading).toBeVisible();
  await expect(dayFivePage.repeatDayOneRecoveryHeading).toBeVisible();
});

test("expect correct day two headings", async ({ page }) => {
  const dayFivePage = new DayFiveWorkoutPage(page, 5);
  await dayFivePage.goto();
  await dayFivePage.pressDay2Button();
  await expect(dayFivePage.repeatDayTwoExerciseHeading).toBeVisible();
  await expect(dayFivePage.repeatDayTwoRecoveryHeading).toBeVisible();
});

test("expect correct day three headings", async ({ page }) => {
  const dayFivePage = new DayFiveWorkoutPage(page, 5);
  await dayFivePage.goto();
  await dayFivePage.pressDay3Button();
  await expect(dayFivePage.repeatDayThreeExerciseHeading).toBeVisible();
  await expect(dayFivePage.repeatDayThreeRecoveryHeading).toBeVisible();
});

test("expect correct day four headings", async ({ page }) => {
  const dayFivePage = new DayFiveWorkoutPage(page, 5);
  await dayFivePage.goto();
  await dayFivePage.pressDay4Button();
  await expect(dayFivePage.repeatDayFourExerciseHeading).toBeVisible();
  await expect(dayFivePage.repeatDayFourRecoveryHeading).toBeVisible();
});
