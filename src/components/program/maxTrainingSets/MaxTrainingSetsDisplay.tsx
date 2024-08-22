import {checkMarkButtonEmoji, crossMarkButtonEmoji} from "@/emojis";
import { Dispatch, SetStateAction, useState } from "react";
import styles from './MaxTrainingSetsDisplay.module.css';
import {isSingular} from "@/utils";
import {createPortal} from "react-dom";
import TimerModal from "../TimerModal";
import {notoColorEmoji, nunito} from "@/fonts";

interface MaxTrainingSetsDisplayProps {
  trainingSetReps: number;
  updateCompletedTrainingSets: Dispatch<SetStateAction<number[]>>;
  updateDayComplete: Dispatch<SetStateAction<boolean>>;
  completedTrainingSets: number[];
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
    updateCompletedTrainingSets(
      [...completedTrainingSets, trainingSetReps]
    );
    setShowTimerModal(true);
  }

  function handleMiss() {
    updateDayComplete(true);
  }

  return (
    <section className={styles.maxTrainingSetsContainer}>
      <div className={styles.completeSetsDisplay}>
        <h3 style={nunito.style}>
          COMPLETED {completedTrainingSets.length} {isSingular(completedTrainingSets.length) ? 'SET' : 'SETS'}
        </h3>
      </div>
      <h3 className={styles.maxSetsText} style={nunito.style}>
        {completedTrainingSets.length < 9 ? (
          `ONLY ${9 - completedTrainingSets.length} MORE ${isSingular(9 - completedTrainingSets.length) ? 'SET' : 'SETS'} OF ${trainingSetReps}`
        ) : completedTrainingSets.length === 9 ? (
        `DO ANOTHER`
        ) : (
        `... AND ANOTHER!`
        )}
      </h3>
      <div className={styles.actionButtonsContainer}>
        <button
          className={styles.actionButton}
          style={notoColorEmoji.style}
          onClick={handleMiss}
          disabled={showTimerModal}
        >
          {crossMarkButtonEmoji}
        </button>
        <button
          className={styles.actionButton}
          style={notoColorEmoji.style}
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
