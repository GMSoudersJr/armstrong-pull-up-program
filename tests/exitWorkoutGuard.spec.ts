import { DayOneWorkoutPage } from "./pom";
import { test, expect } from "@playwright/test";

async function logOneSet(dayOnePage: InstanceType<typeof DayOneWorkoutPage>) {
  await dayOnePage.pressPlusIcon(3);
  await dayOnePage.pressCompleteSetButton();
  await dayOnePage.timerModalCloseButton.waitFor({ state: "visible" });
  await dayOnePage.closeTimerModal();
}

test("no progress logged: back navigation is not intercepted", async ({
  page,
}) => {
  const dayOnePage = new DayOneWorkoutPage(page, 1);
  await dayOnePage.startUserFlow();
  await expect(dayOnePage.dayHeading).toBeVisible();

  await page.goBack();

  await expect(dayOnePage.exitWorkoutModal).not.toBeVisible();
  await expect(dayOnePage.dayHeading).not.toBeVisible();
});

test("progress logged: back navigation shows the exit warning and stays on the page", async ({
  page,
}) => {
  const dayOnePage = new DayOneWorkoutPage(page, 1);
  await dayOnePage.startUserFlow();
  await logOneSet(dayOnePage);

  await page.goBack();

  await expect(dayOnePage.exitWorkoutModal).toBeVisible();
  await expect(dayOnePage.dayHeading).toBeVisible();
  await expect(dayOnePage.repInputLabel).toHaveText("SET 2 REPS");
});

test("cancelling the exit warning keeps in-progress data intact", async ({
  page,
}) => {
  const dayOnePage = new DayOneWorkoutPage(page, 1);
  await dayOnePage.startUserFlow();
  await logOneSet(dayOnePage);
  await page.goBack();
  await expect(dayOnePage.exitWorkoutModal).toBeVisible();

  await dayOnePage.exitWorkoutModalCancelButton.click();

  await expect(dayOnePage.exitWorkoutModal).not.toBeVisible();
  await expect(dayOnePage.dayHeading).toBeVisible();
  await expect(dayOnePage.setsTable).toBeVisible();
  await expect(dayOnePage.repInputLabel).toHaveText("SET 2 REPS");
});

test("confirming the exit warning leaves the workout and discards progress", async ({
  page,
}) => {
  const dayOnePage = new DayOneWorkoutPage(page, 1);
  await dayOnePage.startUserFlow();
  await logOneSet(dayOnePage);
  await page.goBack();
  await expect(dayOnePage.exitWorkoutModal).toBeVisible();

  await dayOnePage.exitWorkoutModalConfirmButton.click();

  await expect(dayOnePage.exitWorkoutModal).not.toBeVisible();
  await expect(page).toHaveURL(/\/program$/);
});

test("Escape key cancels the exit warning", async ({ page }) => {
  const dayOnePage = new DayOneWorkoutPage(page, 1);
  await dayOnePage.startUserFlow();
  await logOneSet(dayOnePage);
  await page.goBack();
  await expect(dayOnePage.exitWorkoutModal).toBeVisible();

  await page.keyboard.press("Escape");

  await expect(dayOnePage.exitWorkoutModal).not.toBeVisible();
  await expect(dayOnePage.dayHeading).toBeVisible();
});

test("after saving, the exit warning no longer appears on back navigation", async ({
  page,
}) => {
  const dayOnePage = new DayOneWorkoutPage(page, 1);
  await dayOnePage.startUserFlow();
  await dayOnePage.pressPlusIcon(3);
  for (let i = 0; i < 4; i++) {
    await dayOnePage.pressCompleteSetButton();
    await dayOnePage.timerModalCloseButton.waitFor({ state: "visible" });
    await dayOnePage.closeTimerModal();
  }
  await dayOnePage.pressCompleteSetButton();
  await expect(dayOnePage.dayCompleteArea).toBeVisible();
  await dayOnePage.saveTheWorkout();
  await expect(dayOnePage.dayCompleteMessage).toBeVisible();

  // The guard's dummy history entry from before the save is still on the
  // stack, so the first back-press after saving is absorbed without any
  // visible change; the second press performs the real navigation.
  await page.goBack();
  await expect(dayOnePage.exitWorkoutModal).not.toBeVisible();
  await expect(dayOnePage.dayHeading).toBeVisible();

  await page.goBack();
  await expect(dayOnePage.exitWorkoutModal).not.toBeVisible();
  await expect(dayOnePage.dayHeading).not.toBeVisible();
});
