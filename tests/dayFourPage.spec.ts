import { isSingular } from "@/utils";
import { DayFourWorkoutPage } from "./pom";
import { test, expect } from "@playwright/test";

test("expect correct input elements", async ({ page }) => {
  const dayFourPage = new DayFourWorkoutPage(page, 4);
  await dayFourPage.goto();
  await expect(dayFourPage.homeLink).toBeVisible();
  await expect(dayFourPage.dayHeading).toBeVisible();
  await expect(dayFourPage.exerciseHeading).toBeVisible();
  await expect(dayFourPage.recoveryHeading).toBeVisible();
  await expect(dayFourPage.dailyHintButton).toBeVisible();
  await expect(dayFourPage.dailyHintButton).toBeEnabled();
  await expect(dayFourPage.decrementRepButton).toBeVisible();
  await expect(dayFourPage.decrementRepButton).toBeDisabled();
  await expect(dayFourPage.repInputLabel).toBeVisible();
  await expect(dayFourPage.repInput).toBeVisible();
  await expect(dayFourPage.repInput).toBeEnabled();
  await expect(dayFourPage.incrementRepButton).toBeVisible();
  await expect(dayFourPage.incrementRepButton).toBeEnabled();
  await expect(dayFourPage.submitButton).toBeVisible();
  await expect(dayFourPage.submitButton).toBeEnabled();
});

test("expect correct workout elements", async ({ page }) => {
  const dayFourPage = new DayFourWorkoutPage(page, 4);
  await dayFourPage.goto();
  /* Insert training set rep count */
  await dayFourPage.pressPlusIcon(100);
  await expect(dayFourPage.repInput).toHaveValue("100");
  await dayFourPage.pressMinusIcon(60);
  await expect(dayFourPage.repInput).toHaveValue("40");
  await dayFourPage.pressSubmitButton();
  await expect(dayFourPage.progressBar).toBeVisible();
  await expect(dayFourPage.progressBar).toHaveAttribute("value", "0");
  await expect(dayFourPage.remainingSetsHeading).toBeVisible();
  await expect(dayFourPage.completedSetsHeading).toBeVisible();
  await expect(dayFourPage.missSetButton).toBeVisible();
  await expect(dayFourPage.missSetButton).toBeEnabled();
  await expect(dayFourPage.completeSetButton).toBeVisible();
  await expect(dayFourPage.completeSetButton).toBeEnabled();
});

test("expect save workout elements", async ({ page }) => {
  const dayFourPage = new DayFourWorkoutPage(page, 4);
  await dayFourPage.goto();
  /* Insert training set rep count */
  await dayFourPage.pressPlusIcon(100);
  await expect(dayFourPage.repInput).toHaveValue("100");
  await dayFourPage.pressMinusIcon(94);
  await expect(dayFourPage.repInput).toHaveValue("6");
  await dayFourPage.pressSubmitButton();
  await expect(dayFourPage.remainingSetsHeading).toBeVisible();
  await expect(dayFourPage.completedSetsHeading).toBeVisible();
  await expect(dayFourPage.missSetButton).toBeVisible();
  await expect(dayFourPage.missSetButton).toBeEnabled();
  await expect(dayFourPage.completeSetButton).toBeVisible();
  await expect(dayFourPage.completeSetButton).toBeEnabled();
  /* Complete at least 9 training sets */
  for (
    let completedSetsCount = 0;
    completedSetsCount <= 9;
    completedSetsCount++
  ) {
    await expect(dayFourPage.progressBar).toBeVisible();
    await expect(dayFourPage.progressBar).toHaveAttribute(
      "value",
      `${completedSetsCount}`,
    );
    if (completedSetsCount < 9) {
      await expect(dayFourPage.remainingSetsHeading).toHaveText(
        `${9 - completedSetsCount} MORE ${isSingular(9 - completedSetsCount) ? "SET" : "SETS"} OF 6`,
      );
    }
    await expect(dayFourPage.completedSetsHeading).toHaveText(
      `COMPLETED ${completedSetsCount} ${isSingular(completedSetsCount) ? "SET" : "SETS"}`,
    );
    await dayFourPage.pressCompleteSetButton();
    await expect(dayFourPage.timerModal).toBeVisible();
    await expect(dayFourPage.missSetButton).toBeVisible();
    await expect(dayFourPage.missSetButton).toBeDisabled();
    await expect(dayFourPage.completeSetButton).toBeVisible();
    await expect(dayFourPage.completeSetButton).toBeDisabled();
    await dayFourPage.closeTimerModal();
  }
  await dayFourPage.pressMissSetButton();
  await expect(dayFourPage.missSetHeading1).toBeVisible();
  await expect(dayFourPage.missSetHeading2).toBeVisible();
  await expect(dayFourPage.numberedMissRepButtons).toHaveCount(6);
  await dayFourPage.pressZeroRepsButton();
  await expect(dayFourPage.dayCompleteArea).toBeVisible();
  await expect(dayFourPage.dayCompleteTotalReps).toBeVisible();
  await expect(dayFourPage.dayCompleteSaveProgressMessage).toBeVisible();
  await expect(dayFourPage.dayCompleteSaveButton).toBeVisible();
  await expect(dayFourPage.dayCompleteSaveButton).toBeEnabled();
});
