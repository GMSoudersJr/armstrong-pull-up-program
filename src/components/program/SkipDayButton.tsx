"use client";

import { nunito } from "@/fonts";
import styles from "./SkipDayButton.module.css";
import { TDayComplete, TDayNumber } from "@/definitions";
import {
  getCurrentWeekNumber,
  addCompletedDayToWorkoutsStore,
  shouldStartNewWeek,
  addNewWeek,
  updateThisWeekWithWorkoutNumber,
  getWeekDataForWeekNumber,
} from "@/indexedDBActions";
import { Dispatch, SetStateAction } from "react";

interface SkipDayButtonProps {
  dayNumber: TDayNumber;
  setStateForProgramDayNumber: Dispatch<SetStateAction<number>>;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const skippedDayData: TDayComplete = {
  id: "",
  dayAbbreviation: "SKPD",
  dayNumber: 1,
  sets: [0],
};

const SkipDayButton = ({
  dayNumber,
  setStateForProgramDayNumber,
}: SkipDayButtonProps) => {
  async function handleSkip() {
    const startNewWeek = await shouldStartNewWeek();
    let currentWeekNumber = await getCurrentWeekNumber();

    if (startNewWeek) {
      currentWeekNumber++;
      addNewWeek(currentWeekNumber);
    }

    skippedDayData.date = new Date(Date.now()).toLocaleDateString(
      "en-US",
      dateFormatOptions,
    );

    skippedDayData.weekNumber = currentWeekNumber;
    skippedDayData.dayNumber = dayNumber;

    skippedDayData.id = `${skippedDayData.weekNumber}-${skippedDayData.dayNumber}`;

    await addCompletedDayToWorkoutsStore(skippedDayData);
    const weekDataToUpdate = await getWeekDataForWeekNumber(currentWeekNumber);
    updateThisWeekWithWorkoutNumber(weekDataToUpdate, skippedDayData.dayNumber);
    setStateForProgramDayNumber(skippedDayData.dayNumber + 1);
  }

  return (
    <button
      type="button"
      className={styles.button}
      id="skip-day-button"
      onClick={handleSkip}
      style={nunito.style}
    >
      SKIP
    </button>
  );
};

export default SkipDayButton;
