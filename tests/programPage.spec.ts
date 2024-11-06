import { ProgramPage } from "./pom/program-page";
import { test, expect } from "@playwright/test";

test("expect correct elements", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.homeLink).toBeVisible();
  await expect(programPage.dashboard).toBeVisible();
  await expect(programPage.getStartedHeader).toBeVisible();
  await expect(programPage.pastWorkoutsHeader).not.toBeVisible();
  await expect(programPage.pastWorkoutsSection).not.toBeVisible();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.todaysWorkoutHeader).toBeVisible();
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
});

test("expect past workouts visible", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.homeLink).toBeVisible();
  await expect(programPage.dashboard).toBeVisible();
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
  await programPage.pressSkipButton();
  await expect(programPage.getStartedHeader).not.toBeVisible();
  await expect(programPage.pastWorkoutsHeader).toBeVisible();
  await expect(programPage.pastWorkoutsSection).toBeVisible();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.todaysWorkoutHeader).toBeVisible();
});
