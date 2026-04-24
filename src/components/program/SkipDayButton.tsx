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
  setStateForUpdatePastWorkouts: Dispatch<SetStateAction<number>>;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const SkipDayButton = ({
  dayNumber,
  setStateForProgramDayNumber,
  setStateForUpdatePastWorkouts,
}: SkipDayButtonProps) => {
  async function handleSkip() {
    const startNewWeek = await shouldStartNewWeek();
    let currentWeekNumber = await getCurrentWeekNumber();

    if (startNewWeek) {
      currentWeekNumber++;
      addNewWeek(currentWeekNumber);
    }

    const date = new Date(Date.now()).toLocaleDateString("en-US", dateFormatOptions);
    const skippedDayData: TDayComplete = {
      id: `${currentWeekNumber}-${dayNumber}`,
      dayAbbreviation: "SKPD",
      dayNumber: dayNumber,
      date,
      weekNumber: currentWeekNumber,
      sets: [0],
    };

    await addCompletedDayToWorkoutsStore(skippedDayData);
    const weekDataToUpdate = await getWeekDataForWeekNumber(currentWeekNumber);
    updateThisWeekWithWorkoutNumber(weekDataToUpdate, skippedDayData.dayNumber);
    const nextDay = dayNumber < 5 ? dayNumber + 1 : 1;
    setStateForProgramDayNumber(nextDay);
    setStateForUpdatePastWorkouts(nextDay);
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
