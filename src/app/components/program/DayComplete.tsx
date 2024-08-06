import { oncomingFistEmoji } from "@/emojis";
import styles from './DayComplete.module.css';

const DayComplete = () => {

  return (
    <h1 className={styles.dayComplete}>
      <span className={styles.emoji}>
        {oncomingFistEmoji}
      </span>
       DAY COMPLETE
      <span className={styles.emoji}>
        {oncomingFistEmoji}
      </span>
    </h1>
  )
};

export default DayComplete;
