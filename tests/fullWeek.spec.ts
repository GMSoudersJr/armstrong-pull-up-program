import { isSingular } from "@/utils";
import { test, expect } from "@playwright/test";
import {
  DayOneWorkoutPage,
  DayTwoWorkoutPage,
  DayThreeWorkoutPage,
  DayFourWorkoutPage,
  DayFiveWorkoutPage,
} from "./pom";
import { ProgramPage } from "./pom/program-page";

test("expect completed week", async ({ page }) => {
  test.setTimeout(180 * 1_000);
  const programPage = new ProgramPage(page);
  await programPage.goto();
  await expect(programPage.dayLink).toHaveText("DAY 1");
  await programPage.pressDayLink();
  const dayOnePage = new DayOneWorkoutPage(page, 1);

  /* Go through day one workout */
  await dayOnePage.pressPlusIcon(3);
  for (let i = 0; i < 4; i++) {
    await dayOnePage.pressCompleteSetButton();
    await dayOnePage.timerModalCloseButton.waitFor({ state: "visible" });
    await dayOnePage.closeTimerModal();
  }
  await dayOnePage.pressCompleteSetButton();
  await expect(dayOnePage.dayCompleteArea).toBeVisible();
  await expect(dayOnePage.thumbsUpIconWrapper).toBeVisible();
  await expect(dayOnePage.dayCompleteTotalReps).toBeVisible();
  await expect(dayOnePage.dayCompleteMessage).toBeHidden();
  await expect(dayOnePage.dayCompleteSaveProgressMessage).toBeVisible();
  await expect(dayOnePage.dayCompleteSaveButton).toBeVisible();
  await expect(dayOnePage.dayCompleteSaveButton).toBeEnabled();
  await dayOnePage.saveTheWorkout();
  await expect(dayOnePage.dayCompleteMessage).toBeVisible();
  await expect(dayOnePage.dayCompleteSaveProgressMessage).toBeHidden();
  await expect(dayOnePage.dayCompleteGoBackLink).toBeVisible();
  await dayOnePage.pressGoBackLink();
  await expect(dayOnePage.dayHeading).not.toBeVisible();
  /* completed day one workout */
  /* Check for day 2 link on program page*/
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 2");
  await programPage.pressDayLink();

  /* Go through day two workout */
  const dayTwoPage = new DayTwoWorkoutPage(page, 2);
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
  await expect(dayTwoPage.dayCompleteTotalReps).toBeVisible();
  await expect(dayTwoPage.dayCompleteMessage).toBeHidden();
  await expect(dayTwoPage.dayCompleteSaveProgressMessage).toBeVisible();
  await expect(dayTwoPage.dayCompleteSaveButton).toBeVisible();
  await expect(dayTwoPage.dayCompleteSaveButton).toBeEnabled();
  await dayTwoPage.saveTheWorkout();
  await expect(dayTwoPage.dayCompleteMessage).toBeVisible();
  await expect(dayTwoPage.dayCompleteSaveProgressMessage).toBeHidden();
  await expect(dayTwoPage.dayCompleteGoBackLink).toBeVisible();
  await dayTwoPage.pressGoBackLink();
  await expect(dayTwoPage.dayHeading).not.toBeVisible();
  /* completed day two workout */
  /* Check for day 3 link on program page*/
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 3");
  await programPage.pressDayLink();

  /* Go through day three workout */
  const dayThreePage = new DayThreeWorkoutPage(page, 3);
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
  await dayOnePage.saveTheWorkout();
  await expect(dayThreePage.dayCompleteMessage).toBeVisible();
  await expect(dayThreePage.dayCompleteSaveProgressMessage).toBeHidden();
  await expect(dayThreePage.dayCompleteGoBackLink).toBeVisible();
  await dayThreePage.pressGoBackLink();
  await expect(dayThreePage.dayHeading).not.toBeVisible();
  /* completed day three workout */
  /* Check for day 4 link on program page*/
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 4");
  await programPage.pressDayLink();

  /* Go through day four workout */
  const dayFourPage = new DayFourWorkoutPage(page, 4);
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
  await dayOnePage.saveTheWorkout();
  await expect(dayFourPage.dayCompleteMessage).toBeVisible();
  await expect(dayFourPage.dayCompleteSaveProgressMessage).toBeHidden();
  await expect(dayFourPage.dayCompleteGoBackLink).toBeVisible();
  await dayFourPage.pressGoBackLink();
  await expect(dayFourPage.dayHeading).not.toBeVisible();
  /* completed day three workout */
  /* Check for day 5 link on program page*/
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 5");
  await programPage.pressDayLink();
  /* completed day four workout */

  /* Go through day five workout */
  const dayFivePage = new DayFiveWorkoutPage(page, 5);
  await dayFivePage.pressDay2Button();
  await expect(dayFivePage.repeatDayTwoExerciseHeading).toBeVisible();
  await expect(dayFivePage.repeatDayTwoRecoveryHeading).toBeVisible();
  const repeatDayTwoPage = new DayTwoWorkoutPage(page, 2);
  for (let i = 0; i < 5; i++) {
    await repeatDayTwoPage.pressCompleteSetButton();
    await repeatDayTwoPage.closeTimerModal();
  }
  await repeatDayTwoPage.pressMissSetButton();
  await expect(repeatDayTwoPage.missedSetNumberContainer).toBeVisible();
  for (const repButton of await repeatDayTwoPage.missRepNumberedButtons.all()) {
    await expect(repButton).toBeVisible();
    await expect(repButton).toBeEnabled();
  }
  await expect(repeatDayTwoPage.missRepNumberedButtons).toHaveCount(5);
  await repeatDayTwoPage.pressNumberForMissedSet(3);
  await expect(repeatDayTwoPage.timerModal).toBeVisible();
  await repeatDayTwoPage.closeTimerModal();
  await expect(repeatDayTwoPage.maxoutRepNumberContainer).toBeVisible();
  for (const maxoutButton of await repeatDayTwoPage.maxoutNumberedButtons.all()) {
    await expect(maxoutButton).toBeVisible();
    await expect(maxoutButton).toBeEnabled();
  }
  await repeatDayTwoPage.pressNumberForMaxoutSet(2);
  await expect(repeatDayTwoPage.dayCompleteTotalReps).toBeVisible();
  await expect(repeatDayTwoPage.dayCompleteMessage).toBeHidden();
  await expect(repeatDayTwoPage.dayCompleteSaveProgressMessage).toBeVisible();
  await expect(repeatDayTwoPage.dayCompleteSaveButton).toBeVisible();
  await expect(repeatDayTwoPage.dayCompleteSaveButton).toBeEnabled();
  await repeatDayTwoPage.saveTheWorkout();
  await expect(repeatDayTwoPage.dayCompleteMessage).toBeVisible();
  await expect(repeatDayTwoPage.dayCompleteSaveProgressMessage).toBeHidden();
  await expect(repeatDayTwoPage.dayCompleteGoBackLink).toBeVisible();
  await repeatDayTwoPage.pressGoBackLink();
  await expect(repeatDayTwoPage.dayHeading).not.toBeVisible();
  /* completed day five workout */
  /* Check for day 1 link on program page*/
  await expect(programPage.dayLink).toBeVisible();
  await expect(programPage.dayLink).toHaveText("DAY 1");
});
