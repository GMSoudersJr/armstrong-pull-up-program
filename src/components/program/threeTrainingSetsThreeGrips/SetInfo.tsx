import styles from './SetInfo.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import {createPortal} from 'react-dom';
import TimerModal from '../TimerModal';
import {TGrip} from '@/app/lib/definitions';
import {nunito} from '@/fonts';
import {ArrowRightToLineIcon, CircleCheckIcon, CircleXIcon} from 'lucide-react';
import NumberedMissRepButton from '@/components/program/NumberedMissRepButton';
import MissSetButton from '../MissSetButton';

interface SetInfoProps {
  trainingSetReps: number;
  currentGrip: TGrip;
  completedGrips: TGrip[];
  trainingSets: number[];
  updateTrainingSets: Dispatch<SetStateAction<number[]>>;
  updateCurrentGrip: Dispatch<SetStateAction<TGrip>>;
  updateCompletedGrips: Dispatch<SetStateAction<TGrip[]>>;
}

const recoveryTime = 60;

const SetInfo = ({
  trainingSetReps,
  currentGrip,
  trainingSets,
  completedGrips,
  updateTrainingSets,
  updateCurrentGrip,
  updateCompletedGrips
}: SetInfoProps) => {

  const [completedSetCount, setCompletedSetCount] = useState(0);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [missedSet, setMissedSet] = useState(false);

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
      updateTrainingSets([...trainingSets, trainingSetReps]);
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

      <h3 style={nunito.style}>
        {missedSet ? (
          <>How many did you do?</>
        ) : completedSetCount < 3 ? (
          <>
            {trainingSetReps} {currentGrip?.toUpperCase()} PULL-UPS
          </>
        ) : completedGrips.length < 2 ? (
          <>CHOOSE NEXT GRIP</>
        ) : (
          <>How did we get here?</>
        )}
      </h3>

      <div className={styles.buttonsContainer}>
        {missedSet ? (
          <>
            {Array.from({length: trainingSetReps}, (_, i) => {
              return (
                <NumberedMissRepButton
                  dayAbbreviation='3S3G'
                  key={i}
                  onMissed={setMissedSet}
                  repCount={i}
                  showTimerModalState={showTimerModal}
                  setStateForShowTimerModal={setShowTimerModal}
                  completedSetCount={completedSetCount}
                  completedGrips={completedGrips}
                  updateCompletedGrips={updateCompletedGrips}
                  currentGrip={currentGrip}
                  updateCurrentGrip={updateCurrentGrip}
                  updateCompletedSetCount={setCompletedSetCount}
                  updateTrainingSets={updateTrainingSets}
                  trainingSets={trainingSets}
                />
              )
            })}
          </>
        ) : (
          <>
            <MissSetButton
              dayAbbreviation='3S3G'
              onMissedSet={setMissedSet}
              showTimerModalState={showTimerModal}
              completedSetCount={completedSetCount}
            />
            <button
              type='button'
              className={styles.actionButton}
              onClick={handleDone}
              disabled={showTimerModal}
            >
              {completedSetCount === 3 ? (
                <ArrowRightToLineIcon className={styles.icon} />
              ) : (
                <CircleCheckIcon className={styles.icon} />
              )}
            </button>
          </>
        )}
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
