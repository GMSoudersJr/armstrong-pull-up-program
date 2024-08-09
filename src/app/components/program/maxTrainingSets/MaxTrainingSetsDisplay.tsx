import {checkMarkButtonEmoji, crossMarkButtonEmoji} from "@/emojis";
import { Dispatch, SetStateAction, useState } from "react";
import styles from './MaxTrainingSetsDisplay.module.css';
import {isSingular} from "@/utils";
import {createPortal} from "react-dom";
import TimerModal from "../TimerModal";

interface MaxTrainingSetsDisplayProps {
  trainingSetReps: number;
  updateCompletedTrainingSets: Dispatch<SetStateAction<number>>;
  updateDayComplete: Dispatch<SetStateAction<boolean>>;
  completedTrainingSets: number;
}

const recoveryTime = 60;

const MaxTrainingSetsDisplay = ({
  trainingSetReps,
  updateCompletedTrainingSets,
  completedTrainingSets,
  updateDayComplete
}: MaxTrainingSetsDisplayProps) => {

  const [showTimerModal, setShowTimerModal] = useState(false);

  function handleComplete() {
    updateCompletedTrainingSets(completedTrainingSets => completedTrainingSets + 1);
    setShowTimerModal(true);
  }

  function handleMiss() {
    updateDayComplete(true);
  }

  return (
    <section className={styles.maxTrainingSetsContainer}>
      <div className={styles.completeSetsDisplay}>
        <h3>
          COMPLETED {completedTrainingSets} {isSingular(completedTrainingSets) ? 'SET' : 'SETS'}
        </h3>
      </div>
      <h3 className={styles.maxSetsText}>
        {completedTrainingSets < 9 ? (
          `AT LEAST ${9 - completedTrainingSets} MORE ${isSingular(9 - completedTrainingSets) ? 'SET' : 'SETS'} OF ${trainingSetReps}`
        ) : completedTrainingSets === 9 ? (
        `DO ANOTHER`
        ) : (
        `... AND ANOTHER!`
        )}
      </h3>
      <div className={styles.actionButtonsContainer}>
        <button
          className={styles.actionButton}
          onClick={handleMiss}
          disabled={showTimerModal}
        >
          {crossMarkButtonEmoji}
        </button>
        <button
          className={styles.actionButton}
          onClick={handleComplete}
          disabled={showTimerModal}
        >
          {checkMarkButtonEmoji}
        </button>
        {showTimerModal && createPortal(
        <TimerModal
          onClose={() => setShowTimerModal(false)}
          recoveryTime={recoveryTime}
          setStateForShowTimerModal={setShowTimerModal}
        />,
        document.body)}
      </div>
    </section>
  )
};

export default MaxTrainingSetsDisplay;
