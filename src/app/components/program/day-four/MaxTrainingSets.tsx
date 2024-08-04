import {checkMarkButtonEmoji, crossMarkButtonEmoji} from "@/emojis";
import { Dispatch, SetStateAction } from "react";
import styles from './MaxTrainingSets.module.css';

interface MaxTrainingSetsProps {
  trainingSetReps: number;
  updateCompletedTrainingSets: Dispatch<SetStateAction<number>>;
  updateDayComplete: Dispatch<SetStateAction<boolean>>;
  completedTrainingSets: number;
}
const MaxTrainingSets = ({
  trainingSetReps,
  updateCompletedTrainingSets,
  completedTrainingSets,
  updateDayComplete
}: MaxTrainingSetsProps) => {


  function handleComplete() {
    updateCompletedTrainingSets(completedTrainingSets => completedTrainingSets + 1);
  }

  function handleMiss() {
    updateDayComplete(true);
  }

  return (
    <section className={styles.maxTrainingSetsContainer}>
      <div>{completedTrainingSets}</div>
      <h3 className={styles.maxSetsText}>
        {completedTrainingSets < 9 ? (
          `AT LEAST ${9 - completedTrainingSets} SETS OF ${trainingSetReps}`
        ) : completedTrainingSets === 9 ? (
        `DO ANOTHER`
        ) : (
        `... AND ANOTHER!`
        )}
      </h3>
      <div className={styles.actionButtonsContainer}>
        <button className={styles.actionButton} onClick={handleMiss}>
          {crossMarkButtonEmoji}
        </button>
        <button className={styles.actionButton}  onClick={handleComplete}>
          {checkMarkButtonEmoji}
        </button>
      </div>
    </section>
  )
};

export default MaxTrainingSets;
