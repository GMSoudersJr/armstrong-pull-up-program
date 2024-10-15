import { DayTwoWorkoutPage } from "./pom/index";
import { test, expect } from "@playwright/test";

test("expect correct elements", async ({ page }) => {
  const dayTwoPage = new DayTwoWorkoutPage(page, 2);
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
  await expect(dayTwoPage.missedSetNumberContainer).not.toBeVisible();
  await expect(dayTwoPage.maxoutRepNumberContainer).not.toBeVisible();
});

test("expect pyramid", async ({ page }) => {
  const dayTwoPage = new DayTwoWorkoutPage(page, 2);
  await dayTwoPage.goto();
  await expect(dayTwoPage.repsHeading).toHaveText("DO 1 REP");
  await dayTwoPage.pressCompleteSetButton();
  await expect(dayTwoPage.timerModal).toBeVisible();
  await expect(dayTwoPage.timerModalTimerMessage).toHaveText(
    "Next set in 10 seconds",
  );
  await dayTwoPage.closeTimerModal();
  await expect(dayTwoPage.timerModal).not.toBeVisible();

  await expect(dayTwoPage.repsHeading).toHaveText("DO 2 REPS");
  await expect(dayTwoPage.pyramid).toBeVisible();
  await dayTwoPage.pressCompleteSetButton();
  await expect(dayTwoPage.timerModalTimerMessage).toHaveText(
    "Next set in 20 seconds",
  );
  await expect(dayTwoPage.pyramid).toBeVisible();
  await dayTwoPage.pressMissSetButton();
});

test("expect miss and max rep containers", async ({ page }) => {
  const dayTwoPage = new DayTwoWorkoutPage(page, 2);
  await dayTwoPage.goto();
  for (let i = 0; i < 5; i++) {
    await dayTwoPage.pressCompleteSetButton();
    await dayTwoPage.closeTimerModal();
  }
  await dayTwoPage.pressMissSetButton();
  await expect(dayTwoPage.missedSetNumberContainer).toBeVisible();
  for (const repButton of await dayTwoPage.missRepNumberedButtons.all()) {
    await expect(repButton).toBeVisible();
    await expect(repButton).toBeEnabled();
  }
  await expect(dayTwoPage.missRepNumberedButtons).toHaveCount(5);
  await dayTwoPage.pressNumberForMissedSet(3);
  await expect(dayTwoPage.timerModal).toBeVisible();
  await dayTwoPage.closeTimerModal();
  await expect(dayTwoPage.maxoutRepNumberContainer).toBeVisible();
  for (const maxoutButton of await dayTwoPage.maxoutNumberedButtons.all()) {
    await expect(maxoutButton).toBeVisible();
    await expect(maxoutButton).toBeEnabled();
  }
  await dayTwoPage.pressNumberForMaxoutSet(2);
});
