import { DayOnePage } from "./pom/day-one-page";
import { test, expect } from "@playwright/test";

test("expect correct elements", async ({ page }) => {
  const dayOnePage = new DayOnePage(page);
  await dayOnePage.goto();
  await expect(dayOnePage.homeLink).toBeVisible();
  await expect(dayOnePage.dayHeading).toBeVisible();
  await expect(dayOnePage.exerciseHeading).toBeVisible();
  await expect(dayOnePage.recoveryHeading).toBeVisible();
  await expect(dayOnePage.dailyHintButton).toBeVisible();
  await expect(dayOnePage.dailyHintButton).toBeEnabled();
  await expect(dayOnePage.progressBar).toBeVisible();
  await expect(dayOnePage.repInputLabel).toHaveText("SET 1 REPS");
  await expect(dayOnePage.repInput).toBeVisible();
  await expect(dayOnePage.repInput).toBeEnabled();
  await expect(dayOnePage.repInput).toHaveValue("0");
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

test("rep max 100", async ({ page }) => {
  const dayOnePage = new DayOnePage(page);
  await dayOnePage.goto();
  await dayOnePage.pressPlusIcon(100);
  await expect(dayOnePage.repInput).toHaveValue("100");
  await expect(dayOnePage.decrementRepButton).toBeEnabled();
  await expect(dayOnePage.incrementRepButton).toBeDisabled();
});

test("one set complete", async ({ page }) => {
  const dayOnePage = new DayOnePage(page);
  await dayOnePage.goto();
  await dayOnePage.pressCompleteSetButton();
  await expect(dayOnePage.setsTable).toBeVisible();
  await expect(dayOnePage.repInputLabel).toHaveText("SET 2 REPS");
  await expect(dayOnePage.repsRemoveButton).toBeDisabled();
  await expect(dayOnePage.repsCompleteButton).toBeDisabled();
});

test("hint modal functionality", async ({ page }) => {
  const dayOnePage = new DayOnePage(page);
  await dayOnePage.goto();
  await dayOnePage.pressDailyHintButton();
  await expect(dayOnePage.dailyHintModal).toBeVisible();
  await expect(dayOnePage.dailyHintModalContent).toBeVisible();
  await expect(dayOnePage.dailyHintModalSVG).toBeVisible();
  await expect(dayOnePage.dailyHintModalHeading).toBeVisible();
  await expect(dayOnePage.dailyHintModalCloseButton).toBeVisible();
  await expect(dayOnePage.dailyHintModalCloseButton).toBeEnabled();
  await expect(dayOnePage.dailyHintModalHintList).toBeVisible();
  await dayOnePage.closeHintModal();
  await expect(dayOnePage.dailyHintModal).not.toBeVisible();
});

test("timer modal functionality", async ({ page }) => {
  const dayOnePage = new DayOnePage(page);
  await dayOnePage.goto();
  await dayOnePage.pressCompleteSetButton();
  await expect(dayOnePage.timerModal).toBeVisible();
  await expect(dayOnePage.timerModalContent).toBeVisible();
  await expect(dayOnePage.timerModalTimerContainer).toBeVisible();
  await expect(dayOnePage.timerModalHeading).toBeVisible();
  await expect(dayOnePage.timerModalTimerMessage).toBeVisible();
  await expect(dayOnePage.timerModalCloseButton).toBeVisible();
  await expect(dayOnePage.timerModalCloseButton).toBeEnabled();
  await expect(dayOnePage.repsRemoveButton).toBeVisible();
  await expect(dayOnePage.repsRemoveButton).toBeDisabled();
  await expect(dayOnePage.repsCompleteButton).toBeVisible();
  await expect(dayOnePage.repsCompleteButton).toBeDisabled();
  await dayOnePage.closeTimerModal();
  await expect(dayOnePage.timerModal).not.toBeVisible();
  await expect(dayOnePage.repsRemoveButton).toBeVisible();
  await expect(dayOnePage.repsRemoveButton).toBeEnabled();
  await expect(dayOnePage.repsCompleteButton).toBeVisible();
  await expect(dayOnePage.repsCompleteButton).toBeEnabled();
});
