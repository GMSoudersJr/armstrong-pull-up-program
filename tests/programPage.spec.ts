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
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
  await programPage.pressSkipButton();
  await expect(programPage.getStartedHeader).not.toBeVisible();
  await expect(programPage.pastWorkoutsHeader).toBeVisible();
  await expect(programPage.pastWorkoutsSection).toBeVisible();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.todaysWorkoutHeader).toBeVisible();
});

test("skip advances day counter to DAY 2", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 1");
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
  await programPage.pressSkipButton();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 2");
});

test("skipping day 5 wraps to DAY 1", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  for (let i = 0; i < 5; i++) {
    await expect(programPage.skipButton).toBeEnabled();
    await programPage.pressSkipButton();
  }
  await expect(programPage.skipButton).toBeVisible();
  await expect(programPage.skipButton).toBeEnabled();
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 1");
});

test("reset button not visible before any data", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.resetButton).not.toBeVisible();
});

test("reset button visible after skipping a day", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressSkipButton();
  await expect(programPage.resetButton).toBeVisible();
});

test("reset modal opens and cancel preserves data", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressSkipButton();
  await programPage.pressResetButton();
  await expect(programPage.resetModal).toBeVisible();
  await programPage.cancelReset();
  await expect(programPage.resetModal).not.toBeVisible();
  await expect(programPage.pastWorkoutsHeader).toBeVisible();
});

test("confirming reset clears all data", async ({ page }) => {
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await programPage.pressSkipButton();
  await expect(programPage.pastWorkoutsHeader).toBeVisible();
  await programPage.pressResetButton();
  await programPage.confirmReset();
  await expect(programPage.getStartedHeader).toBeVisible();
  await expect(programPage.pastWorkoutsHeader).not.toBeVisible();
  await expect(programPage.resetButton).not.toBeVisible();
});
