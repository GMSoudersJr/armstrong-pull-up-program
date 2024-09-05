"use client";

import { Dispatch, SetStateAction, useState } from "react";
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
import {nunito} from "@/fonts";
import {CircleCheckBigIcon, SaveIcon, ThumbsUpIcon} from "lucide-react";

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

  async function handleSave() {
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
      <div className={styles.thumbsUpIconWrapper} >
        <ThumbsUpIcon className={styles.icon}/>
      </div>
      <div className={styles.totalReps}>
        <TotalReps sets={dayData.sets} />
      </div>
      <h3
        className={styles.message}
        style={nunito.style}
      >
        {isDataSaved ? 'DAY COMPLETE' : 'SAVE PROGRESS'}
      </h3>
      <div
        className={styles.takeAction}
        style={nunito.style}
      >
        {isDataSaved ? (
           <div className={styles.checkIconWrapper} >
             <CircleCheckBigIcon className={styles.icon}/>
          </div>
        ) : (
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
          >
            <SaveIcon className={styles.icon}/>
          </button>
        )}
      </div>
    </div>
  )
};

export default DayComplete;
