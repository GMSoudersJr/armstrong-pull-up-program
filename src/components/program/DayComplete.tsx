import { oncomingFistEmoji, floppyDiskEmoji } from "@/emojis";
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

interface DayCompleteProps {
  dayData: TDayComplete
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const DayComplete = ({ dayData }: DayCompleteProps) => {


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
    addCompletedDayToWorkoutsStore(dayData);
    const weekDataToUpdate = await getWeekDataForWeekNumber(currentWeekNumber);
    updateThisWeekWithWorkoutNumber(weekDataToUpdate, dayData.dayNumber);
  }

  return (
    <h1 className={styles.dayComplete}>
      <span className={styles.emoji}>
        {oncomingFistEmoji}
      </span>
       DAY COMPLETE
      <button
        className={`${styles.saveButton} ${styles.emoji}`}
        onClick={handleClick}
      >
        {floppyDiskEmoji}
      </button>
    </h1>
  )
};

export default DayComplete;
