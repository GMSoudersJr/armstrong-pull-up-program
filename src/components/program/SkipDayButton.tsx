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
import { Dispatch, SetStateAction, useState } from "react";

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
  const [isSkipping, setIsSkipping] = useState(false);

  async function handleSkip() {
    if (isSkipping) return;
    setIsSkipping(true);
    try {
      const startNewWeek = await shouldStartNewWeek();
      let currentWeekNumber = await getCurrentWeekNumber();

      if (startNewWeek) {
        currentWeekNumber++;
        await addNewWeek(currentWeekNumber);
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
      await updateThisWeekWithWorkoutNumber(weekDataToUpdate, skippedDayData.dayNumber);
      const nextDay = dayNumber < 5 ? dayNumber + 1 : 1;
      setStateForProgramDayNumber(nextDay);
      setStateForUpdatePastWorkouts(nextDay);
    } finally {
      setIsSkipping(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.button}
      id="skip-day-button"
      onClick={handleSkip}
      disabled={isSkipping}
      style={nunito.style}
    >
      SKIP
    </button>
  );
};

export default SkipDayButton;
