"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { oncomingFistEmoji, floppyDiskEmoji, checkMarkEmoji } from "@/emojis";
import styles from './DayComplete.module.css';
import type {TDayComplete} from "@/app/lib/definitions";

import {
  getCurrentWeekNumber,
  addCompletedDayToWorkoutsStore,
  shouldStartNewWeek,
  addNewWeek,
  updateThisWeekWithWorkoutNumber,
  getWeekDataForWeekNumber,
} from '@/indexedDBActions';
import TotalReps from "./TotalReps";

interface DayCompleteProps {
  dayData: TDayComplete;
  setStateForSavedDay: Dispatch<SetStateAction<boolean>>;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const DayComplete = ({ dayData, setStateForSavedDay }: DayCompleteProps) => {

  const [isDataSaved, setIsDataSaved] = useState(false);

  async function handleClick() {
    const startNewWeek = await shouldStartNewWeek();
    let currentWeekNumber = await getCurrentWeekNumber();

    if (startNewWeek) {
      currentWeekNumber++;
      addNewWeek(currentWeekNumber);
    }

    dayData.date =
      new Date(Date.now()).toLocaleDateString('en-US', dateFormatOptions);

    dayData.weekNumber = currentWeekNumber;

    dayData.id = `${dayData.weekNumber}-${dayData.dayNumber}`
    const dataSavedInIndexedDB = await addCompletedDayToWorkoutsStore(dayData);
    const weekDataToUpdate = await getWeekDataForWeekNumber(currentWeekNumber);
    updateThisWeekWithWorkoutNumber(weekDataToUpdate, dayData.dayNumber);
    setIsDataSaved(dataSavedInIndexedDB);
    setStateForSavedDay(true);
  }

  return (
    <div className={styles.dayCompleteContainer}>
      <h1 className={`${styles.oncomingFist} ${styles.emoji}`}>
        {oncomingFistEmoji}
      </h1>
      <div className={styles.totalReps}>
        <TotalReps sets={dayData.sets} />
      </div>
      <h1 className={styles.message}>
        {isDataSaved ? 'DAY COMPLETE' : 'SAVE PROGRESS'}
      </h1>
      <h1 className={styles.takeAction}>
        {isDataSaved ? (
           <span className={styles.emoji}>
             {checkMarkEmoji}
          </span>
        ) : (
          <button
            className={`${styles.saveButton} ${styles.emoji}`}
            onClick={handleClick}
          >
            {floppyDiskEmoji}
          </button>
        )}
      </h1>
    </div>
  )
};

export default DayComplete;
