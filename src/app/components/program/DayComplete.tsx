import { oncomingFistEmoji, floppyDiskEmoji } from "@/emojis";
import styles from './DayComplete.module.css';
import {TDayComplete} from "@/app/lib/definitions";

interface DayCompleteProps {
  dayData: TDayComplete
}

const DayComplete = ({ dayData }: DayCompleteProps) => {

  function handleClick() {
    dayData.date =
      new Date(Date.now())
    .toLocaleDateString('en-US',
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }
                       );

    console.log(dayData);
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
