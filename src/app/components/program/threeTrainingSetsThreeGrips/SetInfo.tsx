import {checkMarkButtonEmoji, crossMarkButtonEmoji, nextTrackButtonEmoji} from '@/emojis';
import styles from './SetInfo.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import {createPortal} from 'react-dom';
import TimerModal from '../TimerModal';

interface SetInfoProps {
  trainingSetReps: number;
  currentGrip: string;
  completedGrips: string[];
  updateCurrentGrip: Dispatch<SetStateAction<string>>;
  updateCompletedGrips: Dispatch<SetStateAction<string[]>>;
}

const recoveryTime = 60;

const SetInfo = ({
  trainingSetReps,
  currentGrip,
  completedGrips,
  updateCurrentGrip,
  updateCompletedGrips
}: SetInfoProps) => {

  const [completedSetCount, setCompletedSetCount] = useState(0);
  const [showTimerModal, setShowTimerModal] = useState(false);

  function handleMiss(): void {
  }

  function handleDone(): void {
    if (completedSetCount == 2 && completedGrips.length == 2) {
      updateCompletedGrips([
        ...completedGrips,
        currentGrip
      ]);

      updateCurrentGrip('');
    }
    if (completedSetCount <= 2) {
      setCompletedSetCount(completedSetCount => completedSetCount + 1);
      setShowTimerModal(true);
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
        COMPLETED SETS
        <span className={styles.setCount}>
          {` ${completedSetCount}`}
        </span>
      </h2>

      {completedSetCount < 3 ? (
        <h3>{trainingSetReps} {currentGrip.toUpperCase()} PULL-UPS</h3>
      ) : completedGrips.length < 2 ? (
        <h3>CHOOSE NEXT GRIP</h3>
      ) : (
        <h3>TAP NEXT COMPLETE</h3>
      )}

      <div className={styles.buttonsContainer}>
        <button
          className={styles.actionButton}
          onClick={handleMiss}
          disabled={showTimerModal}
        >
          {crossMarkButtonEmoji}
        </button>
        <button
          className={styles.actionButton}
          onClick={handleDone}
          disabled={showTimerModal}
        >
          {completedSetCount === 3 ? nextTrackButtonEmoji : checkMarkButtonEmoji}
        </button>
        {showTimerModal && createPortal(
          <TimerModal
            onClose={() => setShowTimerModal(false)}
            recoveryTime={recoveryTime}
            setStateForShowTimerModal={setShowTimerModal}
          />,
          document.body
        )}
      </div>
    </section>
  )
};

export default SetInfo;
