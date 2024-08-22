import {checkMarkButtonEmoji, crossMarkButtonEmoji, nextTrackButtonEmoji} from '@/emojis';
import styles from './SetInfo.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import {createPortal} from 'react-dom';
import TimerModal from '../TimerModal';
import {TGrip} from '@/app/lib/definitions';
import {notoColorEmoji, nunito} from '@/fonts';

interface SetInfoProps {
  trainingSetReps: number;
  currentGrip: TGrip;
  completedGrips: TGrip[];
  totalSets: number[];
  updateTotalSets: Dispatch<SetStateAction<number[]>>;
  updateCurrentGrip: Dispatch<SetStateAction<TGrip>>;
  updateCompletedGrips: Dispatch<SetStateAction<TGrip[]>>;
}

const recoveryTime = 60;

const SetInfo = ({
  trainingSetReps,
  currentGrip,
  totalSets,
  completedGrips,
  updateTotalSets,
  updateCurrentGrip,
  updateCompletedGrips
}: SetInfoProps) => {

  const [completedSetCount, setCompletedSetCount] = useState(0);
  const [showTimerModal, setShowTimerModal] = useState(false);

  function handleMiss(): void {
    if (completedSetCount == 2 && completedGrips.length == 2) {
      updateCompletedGrips([
        ...completedGrips,
        currentGrip
      ]);

      updateCurrentGrip('');
    }
    if (completedSetCount <= 2) {
      setCompletedSetCount(completedSetCount => completedSetCount + 1);
      updateTotalSets([...totalSets, 0]);
      setShowTimerModal(true);
    } else {
      updateCompletedGrips([
        ...completedGrips,
        currentGrip
      ]);

      updateCurrentGrip('');
    }
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
      updateTotalSets([...totalSets, trainingSetReps]);
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
      <h2 style={nunito.style}>
        COMPLETED SETS:
        <span
          className={styles.setCount}
          style={nunito.style}
        >
          {` ${completedSetCount}`}
        </span>
      </h2>

      {completedSetCount < 3 ? (
        <h3 style={nunito.style}>
          {trainingSetReps} {currentGrip?.toUpperCase()} PULL-UPS
        </h3>
      ) : completedGrips.length < 2 ? (
        <h3 style={nunito.style}>CHOOSE NEXT GRIP</h3>
      ) : (
        <h3 style={nunito.style}>TAP NEXT COMPLETE</h3>
      )}

      <div className={styles.buttonsContainer}>
        <button
          className={styles.actionButton}
          style={notoColorEmoji.style}
          onClick={handleMiss}
          disabled={showTimerModal || completedSetCount === 3}
        >
          {crossMarkButtonEmoji}
        </button>
        <button
          className={styles.actionButton}
          style={notoColorEmoji.style}
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
