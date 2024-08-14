import { oncomingFistEmoji, floppyDiskEmoji } from "@/emojis";
import styles from './DayComplete.module.css';
import type {TDayComplete} from "@/app/lib/definitions";
import {
  addCompletedDay,
  getIncompleteWeek,
  getWeekNumber,
  allWeeksComplete
} from "@/data/indexedDB";

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
    const inProgessWeekNumber = await getIncompleteWeek();

    console.log(await allWeeksComplete());

    console.log(inProgessWeekNumber);
    const weekNumber = await getWeekNumber();

    dayData.date =
      new Date(Date.now()).toLocaleDateString('en-US', dateFormatOptions);

    dayData.weekNumber = weekNumber;

    dayData.id = `${dayData.weekNumber}-${dayData.dayNumber}`
    addCompletedDay('workoutsStore', dayData);
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
