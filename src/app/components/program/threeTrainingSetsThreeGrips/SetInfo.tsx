import {checkMarkButtonEmoji, crossMarkButtonEmoji} from '@/emojis';
import styles from '@/components/program/threeTrainingSetsThreeGrips/SetInfo.module.css';
import { Dispatch, SetStateAction, useState } from 'react';

interface SetInfoProps {
  trainingSetReps: number;
  currentGrip: string;
  completedGrips: string[];
  updateCurrentGrip: Dispatch<SetStateAction<string>>;
  updateCompletedGrips: Dispatch<SetStateAction<string[]>>;
}

const SetInfo = ({
  trainingSetReps,
  currentGrip,
  completedGrips,
  updateCurrentGrip,
  updateCompletedGrips
}: SetInfoProps) => {

  const [currentSetCount, setCurrentSetCount] = useState(1);

  function handleMiss(): void {

  }

  function handleDone(): void {
    if (currentSetCount < 3) {
      setCurrentSetCount(currentSetCount => currentSetCount + 1)
    } else {
      updateCompletedGrips([
        ...completedGrips,
        currentGrip
      ]);

      updateCurrentGrip('');
    }
  }

  return (
    <section className={styles.setInfoContainer}>
      <h2>
        SET
        <span className={styles.setCount}>
          {` ${currentSetCount}`}
        </span>
      </h2>
      <h3>{trainingSetReps} {currentGrip.toUpperCase()} PULL-UPS</h3>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.actionButton}
          onClick={handleMiss}
        >
          {crossMarkButtonEmoji}
        </button>
        <button
          className={styles.actionButton}
          onClick={handleDone}
        >
          {checkMarkButtonEmoji}
        </button>
      </div>
    </section>
  )
};

export default SetInfo;
