import styles from './SetInfo.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import {createPortal} from 'react-dom';
import TimerModal from '../TimerModal';
import {TGrip} from '@/app/lib/definitions';
import {nunito} from '@/fonts';
import {ArrowRightToLineIcon, CircleCheckIcon, CircleXIcon} from 'lucide-react';

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
          type='button'
          className={styles.actionButton}
          onClick={handleMiss}
          disabled={showTimerModal || completedSetCount === 3}
        >
          <CircleXIcon className={styles.icon}/>
        </button>
        <button
          type='button'
          className={styles.actionButton}
          onClick={handleDone}
          disabled={showTimerModal}
        >
          {completedSetCount === 3 ? <ArrowRightToLineIcon className={styles.icon} /> : <CircleCheckIcon className={styles.icon} />}
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
