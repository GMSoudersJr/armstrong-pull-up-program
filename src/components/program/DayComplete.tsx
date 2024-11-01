"use client";

import { Dispatch, SetStateAction, useState } from "react";
import styles from "./DayComplete.module.css";
import type { TDayComplete } from "@/app/lib/definitions";
import {
  getCurrentWeekNumber,
  addCompletedDayToWorkoutsStore,
  shouldStartNewWeek,
  addNewWeek,
  updateThisWeekWithWorkoutNumber,
  getWeekDataForWeekNumber,
} from "@/indexedDBActions";
import TotalReps from "./TotalReps";
import { nunito } from "@/fonts";
import { CircleCheckBigIcon, SaveIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import {
  DAY_COMPLETE_MESSAGES,
  THUMBS_UP_ICON_MESSAGE,
  CIRCLE_CHECK_BIG_ICON_MESSAGE,
} from "@/lib/strings/dayComplete";

interface DayCompleteProps {
  dayData: TDayComplete;
  setStateForSavedDay: Dispatch<SetStateAction<boolean>>;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
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

    dayData.date = new Date(Date.now()).toLocaleDateString(
      "en-US",
      dateFormatOptions,
    );

    dayData.weekNumber = currentWeekNumber;

    dayData.id = `${dayData.weekNumber}-${dayData.dayNumber}`;
    const dataSavedInIndexedDB = await addCompletedDayToWorkoutsStore(dayData);
    const weekDataToUpdate = await getWeekDataForWeekNumber(currentWeekNumber);
    updateThisWeekWithWorkoutNumber(weekDataToUpdate, dayData.dayNumber);
    setIsDataSaved(dataSavedInIndexedDB);
    setStateForSavedDay(true);
  }

  return (
    <div id="day-complete-container" className={styles.dayCompleteContainer}>
      <div id="thumbs-up-icon-wrapper" className={styles.thumbsUpIconWrapper}>
        <ThumbsUpIcon className={`${styles.icon} ${styles.thumbsUpIcon}`} />
        <span className="visibly-hidden">{THUMBS_UP_ICON_MESSAGE}</span>
      </div>
      <div className={styles.totalReps}>
        <TotalReps sets={dayData.sets} />
      </div>
      <h3 className={styles.message} style={nunito.style}>
        {isDataSaved ? DAY_COMPLETE_MESSAGES[0] : DAY_COMPLETE_MESSAGES[1]}
      </h3>
      <div className={styles.takeAction} style={nunito.style}>
        {isDataSaved ? (
          <Link href={"/program"}>
            <div className={styles.checkIconWrapper}>
              <CircleCheckBigIcon
                className={`${styles.icon} ${styles.circleCheckBigIcon}`}
              />
              <span className="visibly-hidden">
                {CIRCLE_CHECK_BIG_ICON_MESSAGE}
              </span>
            </div>
          </Link>
        ) : (
          <button
            id="save-icon-button"
            title="Save your workout"
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
          >
            <SaveIcon className={`${styles.icon} ${styles.saveIcon}`} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DayComplete;
