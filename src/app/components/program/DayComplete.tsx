import { oncomingFistEmoji, floppyDiskEmoji } from "@/emojis";
import styles from './DayComplete.module.css';

const DayComplete = () => {

  return (
    <h1 className={styles.dayComplete}>
      <span className={styles.emoji}>
        {oncomingFistEmoji}
      </span>
       DAY COMPLETE
      <button className={`${styles.saveButton} ${styles.emoji}`}>
        {floppyDiskEmoji}
      </button>
    </h1>
  )
};

export default DayComplete;
