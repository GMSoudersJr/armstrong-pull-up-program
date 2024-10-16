import { DayThreeWorkoutPage } from "./pom/index";
import { test, expect } from "@playwright/test";

test("expect correct elements", async ({ page }) => {
  const dayThreePage = new DayThreeWorkoutPage(page, 3);
  await dayThreePage.goto();
  await expect(dayThreePage.homeLink).toBeVisible();
  await expect(dayThreePage.dayHeading).toBeVisible();
  await expect(dayThreePage.exerciseHeading).toBeVisible();
  await expect(dayThreePage.recoveryHeading).toBeVisible();
  await expect(dayThreePage.repInputLabel).toHaveText("TRAINING SET REPS");
  await expect(dayThreePage.repInput).toBeVisible();
  await expect(dayThreePage.repInput).toBeEnabled();
  await expect(dayThreePage.decrementRepButton).toBeVisible();
  await expect(dayThreePage.decrementRepButton).toBeDisabled();
  await expect(dayThreePage.incrementRepButton).toBeVisible();
  await expect(dayThreePage.incrementRepButton).toBeEnabled();
  await expect(dayThreePage.submitButton).toBeVisible();
  await expect(dayThreePage.submitButton).toBeEnabled();
});

test("expect rep input response", async ({ page }) => {
  const dayThreePage = new DayThreeWorkoutPage(page, 3);
  await dayThreePage.goto();
  await expect(dayThreePage.repInput).toBeVisible();
  await expect(dayThreePage.repInput).toBeEnabled();
  await expect(dayThreePage.decrementRepButton).toBeVisible();
  await expect(dayThreePage.decrementRepButton).toBeDisabled();
  await expect(dayThreePage.incrementRepButton).toBeVisible();
  await expect(dayThreePage.incrementRepButton).toBeEnabled();
  await expect(dayThreePage.submitButton).toBeVisible();
  await expect(dayThreePage.submitButton).toBeEnabled();
  await dayThreePage.pressPlusIcon(5);
  await expect(dayThreePage.repInput).toHaveValue("5");
  await dayThreePage.pressMinusIcon(2);
  await expect(dayThreePage.repInput).toHaveValue("3");
});

test("expect enabeled grip buttons", async ({ page }) => {
  const dayThreePage = new DayThreeWorkoutPage(page, 3);
  await dayThreePage.goto();
  await expect(dayThreePage.repInput).toBeVisible();
  await expect(dayThreePage.repInput).toBeEnabled();
  await expect(dayThreePage.decrementRepButton).toBeVisible();
  await expect(dayThreePage.decrementRepButton).toBeDisabled();
  await expect(dayThreePage.incrementRepButton).toBeVisible();
  await expect(dayThreePage.incrementRepButton).toBeEnabled();
  await expect(dayThreePage.submitButton).toBeVisible();
  await expect(dayThreePage.submitButton).toBeEnabled();
  await dayThreePage.pressPlusIcon(5);
  await expect(dayThreePage.repInput).toHaveValue("5");
  await dayThreePage.pressSubmitButton();
  await expect(dayThreePage.selectGripHeading).toBeVisible();
  await expect(dayThreePage.listOfGripButtons).toBeVisible();
  await expect(dayThreePage.wideGripButton).toBeVisible();
  await expect(dayThreePage.wideGripButton).toBeEnabled();
  await expect(dayThreePage.pronatedGripButton).toBeVisible();
  await expect(dayThreePage.pronatedGripButton).toBeEnabled();
  await expect(dayThreePage.neutralGripButton).toBeVisible();
  await expect(dayThreePage.neutralGripButton).toBeEnabled();
  await expect(dayThreePage.supinatedGripButton).toBeVisible();
  await expect(dayThreePage.supinatedGripButton).toBeEnabled();
  await expect(dayThreePage.closeGripButton).toBeVisible();
  await expect(dayThreePage.closeGripButton).toBeEnabled();
});

test("expect grip set details", async ({ page }) => {
  const dayThreePage = new DayThreeWorkoutPage(page, 3);
  await dayThreePage.goto();
  await expect(dayThreePage.repInput).toBeVisible();
  await expect(dayThreePage.repInput).toBeEnabled();
  await expect(dayThreePage.decrementRepButton).toBeVisible();
  await expect(dayThreePage.decrementRepButton).toBeDisabled();
  await expect(dayThreePage.incrementRepButton).toBeVisible();
  await expect(dayThreePage.incrementRepButton).toBeEnabled();
  await expect(dayThreePage.submitButton).toBeVisible();
  await expect(dayThreePage.submitButton).toBeEnabled();
  await dayThreePage.pressPlusIcon(5);
  await expect(dayThreePage.repInput).toHaveValue("5");
  await dayThreePage.pressSubmitButton();
  await expect(dayThreePage.pronatedGripButton).toBeVisible();
  await expect(dayThreePage.pronatedGripButton).toBeEnabled();
  await dayThreePage.pressPronatedGripButton();
  await expect(dayThreePage.progressBar).toBeVisible();
  await expect(dayThreePage.currentPullupHeading).toBeVisible();
  await expect(dayThreePage.currentGripSetCount).toBeVisible();
  await expect(dayThreePage.missSetButton).toBeVisible();
  await expect(dayThreePage.missSetButton).toBeEnabled();
  await expect(dayThreePage.completeSetButton).toBeVisible();
  await expect(dayThreePage.completeSetButton).toBeEnabled();
  await expect(dayThreePage.nextGripButton).not.toBeVisible();
});

test("expect next grip button", async ({ page }) => {
  const dayThreePage = new DayThreeWorkoutPage(page, 3);
  await dayThreePage.goto();
  await expect(dayThreePage.repInput).toBeVisible();
  await expect(dayThreePage.repInput).toBeEnabled();
  await expect(dayThreePage.decrementRepButton).toBeVisible();
  await expect(dayThreePage.decrementRepButton).toBeDisabled();
  await expect(dayThreePage.incrementRepButton).toBeVisible();
  await expect(dayThreePage.incrementRepButton).toBeEnabled();
  await expect(dayThreePage.submitButton).toBeVisible();
  await expect(dayThreePage.submitButton).toBeEnabled();
  await dayThreePage.pressPlusIcon(5);
  await expect(dayThreePage.repInput).toHaveValue("5");
  await dayThreePage.pressSubmitButton();
  await expect(dayThreePage.pronatedGripButton).toBeVisible();
  await expect(dayThreePage.pronatedGripButton).toBeEnabled();
  await dayThreePage.pressPronatedGripButton();
  for (let i = 0; i < 3; i++) {
    await expect(dayThreePage.progressBar).toHaveAttribute("value", `${i}`);
    await expect(dayThreePage.currentGripSetCount).toHaveText(
      `PRONATED SETS: ${i}`,
    );
    await dayThreePage.pressCompleteSetButton();
    if (i === 2) {
      await expect(dayThreePage.nextGripButton).toBeVisible();
      await expect(dayThreePage.nextGripButton).toBeDisabled();
    } else {
      await expect(dayThreePage.timerModal).toBeVisible();
      await expect(dayThreePage.missSetButton).toBeVisible();
      await expect(dayThreePage.missSetButton).toBeDisabled();
      await expect(dayThreePage.completeSetButton).toBeVisible();
      await expect(dayThreePage.completeSetButton).toBeDisabled();
    }
    await expect(dayThreePage.timerModalCloseButton).toBeVisible();
    await expect(dayThreePage.timerModalCloseButton).toBeEnabled();
    await dayThreePage.closeTimerModal();
    await expect(dayThreePage.progressBar).toHaveAttribute("value", `${i + 1}`);
    await expect(dayThreePage.currentGripSetCount).toHaveText(
      `PRONATED SETS: ${i + 1}`,
    );
  }
  await expect(dayThreePage.chooseNextGripHeading).toBeVisible();
  await expect(dayThreePage.missSetButton).toBeVisible();
  await expect(dayThreePage.missSetButton).toBeDisabled();
  await expect(dayThreePage.nextGripButton).toBeVisible();
  await expect(dayThreePage.nextGripButton).toBeEnabled();
});

test("expect miss section", async ({ page }) => {
  const dayThreePage = new DayThreeWorkoutPage(page, 3);
  await dayThreePage.goto();
  await expect(dayThreePage.repInput).toBeVisible();
  await expect(dayThreePage.repInput).toBeEnabled();
  await expect(dayThreePage.decrementRepButton).toBeVisible();
  await expect(dayThreePage.decrementRepButton).toBeDisabled();
  await expect(dayThreePage.incrementRepButton).toBeVisible();
  await expect(dayThreePage.incrementRepButton).toBeEnabled();
  await expect(dayThreePage.submitButton).toBeVisible();
  await expect(dayThreePage.submitButton).toBeEnabled();
  await dayThreePage.pressPlusIcon(5);
  await expect(dayThreePage.repInput).toHaveValue("5");
  await dayThreePage.pressSubmitButton();
  await expect(dayThreePage.supinatedGripButton).toBeVisible();
  await expect(dayThreePage.supinatedGripButton).toBeEnabled();
  await dayThreePage.pressSupinatedGripButton();
  await expect(dayThreePage.currentPullupHeading).toBeVisible();
  await expect(dayThreePage.currentGripSetCount).toBeVisible();
  await dayThreePage.pressMissSetButton();
  await expect(dayThreePage.missSetHeading1).toBeVisible();
  await expect(dayThreePage.missSetHeading2).toBeVisible();
  await expect(dayThreePage.numberedMissRepButtons).toHaveCount(5);
  await dayThreePage.pressZeroRepsButton();
  await expect(dayThreePage.timerModal).toBeVisible();
  await expect(dayThreePage.missSetButton).toBeVisible();
  await expect(dayThreePage.missSetButton).toBeDisabled();
  await expect(dayThreePage.completeSetButton).toBeVisible();
  await expect(dayThreePage.completeSetButton).toBeDisabled();
  await dayThreePage.closeTimerModal();
  await expect(dayThreePage.missSetButton).toBeVisible();
  await expect(dayThreePage.missSetButton).toBeEnabled();
  await expect(dayThreePage.completeSetButton).toBeVisible();
  await expect(dayThreePage.completeSetButton).toBeEnabled();
  await expect(dayThreePage.progressBar).toHaveAttribute("value", "1");
});

test("expect save workout elements", async ({ page }) => {
  const dayThreePage = new DayThreeWorkoutPage(page, 3);
  await dayThreePage.goto();
  await expect(dayThreePage.repInput).toBeVisible();
  await expect(dayThreePage.repInput).toBeEnabled();
  await expect(dayThreePage.decrementRepButton).toBeVisible();
  await expect(dayThreePage.decrementRepButton).toBeDisabled();
  await expect(dayThreePage.incrementRepButton).toBeVisible();
  await expect(dayThreePage.incrementRepButton).toBeEnabled();
  await expect(dayThreePage.submitButton).toBeVisible();
  await expect(dayThreePage.submitButton).toBeEnabled();
  await dayThreePage.pressPlusIcon(5);
  await expect(dayThreePage.repInput).toHaveValue("5");
  await dayThreePage.pressSubmitButton();
  // Go through pronated grip
  await expect(dayThreePage.pronatedGripButton).toBeVisible();
  await expect(dayThreePage.pronatedGripButton).toBeEnabled();
  await dayThreePage.pressPronatedGripButton();
  for (let i = 0; i < 3; i++) {
    await expect(dayThreePage.progressBar).toHaveAttribute("value", `${i}`);
    await expect(dayThreePage.currentGripSetCount).toHaveText(
      `PRONATED SETS: ${i}`,
    );
    await dayThreePage.pressCompleteSetButton();
    if (i === 2) {
      await expect(dayThreePage.nextGripButton).toBeVisible();
      await expect(dayThreePage.nextGripButton).toBeDisabled();
    } else {
      await expect(dayThreePage.timerModal).toBeVisible();
      await expect(dayThreePage.missSetButton).toBeVisible();
      await expect(dayThreePage.missSetButton).toBeDisabled();
      await expect(dayThreePage.completeSetButton).toBeVisible();
      await expect(dayThreePage.completeSetButton).toBeDisabled();
    }
    await expect(dayThreePage.timerModalCloseButton).toBeVisible();
    await expect(dayThreePage.timerModalCloseButton).toBeEnabled();
    await dayThreePage.closeTimerModal();
    await expect(dayThreePage.progressBar).toHaveAttribute("value", `${i + 1}`);
    await expect(dayThreePage.currentGripSetCount).toHaveText(
      `PRONATED SETS: ${i + 1}`,
    );
  }
  await expect(dayThreePage.chooseNextGripHeading).toBeVisible();
  await expect(dayThreePage.missSetButton).toBeVisible();
  await expect(dayThreePage.missSetButton).toBeDisabled();
  await expect(dayThreePage.nextGripButton).toBeVisible();
  await expect(dayThreePage.nextGripButton).toBeEnabled();
  await dayThreePage.pressNextGripButton();
  // Go through close grip
  await expect(dayThreePage.pronatedGripButton).toBeVisible();
  await expect(dayThreePage.pronatedGripButton).toBeDisabled();
  await expect(dayThreePage.closeGripButton).toBeVisible();
  await expect(dayThreePage.closeGripButton).toBeEnabled();
  await dayThreePage.pressCloseGripButton();
  for (let i = 0; i < 3; i++) {
    let workoutProgress = 3 + i;
    await expect(dayThreePage.progressBar).toHaveAttribute(
      "value",
      `${workoutProgress}`,
    );
    await expect(dayThreePage.currentGripSetCount).toHaveText(
      `CLOSE SETS: ${i}`,
    );
    await dayThreePage.pressCompleteSetButton();
    if (i === 2) {
      await expect(dayThreePage.nextGripButton).toBeVisible();
      await expect(dayThreePage.nextGripButton).toBeDisabled();
    } else {
      await expect(dayThreePage.timerModal).toBeVisible();
      await expect(dayThreePage.missSetButton).toBeVisible();
      await expect(dayThreePage.missSetButton).toBeDisabled();
      await expect(dayThreePage.completeSetButton).toBeVisible();
      await expect(dayThreePage.completeSetButton).toBeDisabled();
    }
    await expect(dayThreePage.timerModalCloseButton).toBeVisible();
    await expect(dayThreePage.timerModalCloseButton).toBeEnabled();
    await dayThreePage.closeTimerModal();
    await expect(dayThreePage.progressBar).toHaveAttribute(
      "value",
      `${workoutProgress + 1}`,
    );
    await expect(dayThreePage.currentGripSetCount).toHaveText(
      `CLOSE SETS: ${i + 1}`,
    );
  }
  await expect(dayThreePage.chooseNextGripHeading).toBeVisible();
  await expect(dayThreePage.missSetButton).toBeVisible();
  await expect(dayThreePage.missSetButton).toBeDisabled();
  await expect(dayThreePage.nextGripButton).toBeVisible();
  await expect(dayThreePage.nextGripButton).toBeEnabled();
  await dayThreePage.pressNextGripButton();
  // Go through wide grip
  await expect(dayThreePage.pronatedGripButton).toBeVisible();
  await expect(dayThreePage.pronatedGripButton).toBeDisabled();
  await expect(dayThreePage.closeGripButton).toBeVisible();
  await expect(dayThreePage.closeGripButton).toBeDisabled();
  await expect(dayThreePage.wideGripButton).toBeVisible();
  await expect(dayThreePage.wideGripButton).toBeEnabled();
  await dayThreePage.pressWideGripButton();
  for (let i = 0; i < 3; i++) {
    let workoutProgress = 6 + i;
    await expect(dayThreePage.progressBar).toHaveAttribute(
      "value",
      `${workoutProgress}`,
    );
    await expect(dayThreePage.currentGripSetCount).toHaveText(
      `WIDE SETS: ${i}`,
    );
    await dayThreePage.pressCompleteSetButton();
    if (i === 2) {
      break;
    } else {
      await expect(dayThreePage.completeSetButton).toBeVisible();
      await expect(dayThreePage.completeSetButton).toBeDisabled();
      await expect(dayThreePage.timerModal).toBeVisible();
      await expect(dayThreePage.missSetButton).toBeVisible();
      await expect(dayThreePage.missSetButton).toBeDisabled();
    }
    await expect(dayThreePage.timerModalCloseButton).toBeVisible();
    await expect(dayThreePage.timerModalCloseButton).toBeEnabled();
    await dayThreePage.closeTimerModal();
    await expect(dayThreePage.progressBar).toHaveAttribute(
      "value",
      `${workoutProgress + 1}`,
    );
    await expect(dayThreePage.currentGripSetCount).toHaveText(
      `WIDE SETS: ${i + 1}`,
    );
  }
  await expect(dayThreePage.dayCompleteArea).toBeVisible();
  await expect(dayThreePage.dayCompleteTotalReps).toBeVisible();
  await expect(dayThreePage.dayCompleteSaveProgressMessage).toBeVisible();
  await expect(dayThreePage.dayCompleteSaveButton).toBeVisible();
  await expect(dayThreePage.dayCompleteSaveButton).toBeEnabled();
});
