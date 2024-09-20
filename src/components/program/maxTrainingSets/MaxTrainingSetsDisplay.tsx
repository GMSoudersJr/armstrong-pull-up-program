import { Dispatch, SetStateAction, useState } from "react";
import styles from './MaxTrainingSetsDisplay.module.css';
import {isSingular} from "@/utils";
import {createPortal} from "react-dom";
import TimerModal from "../TimerModal";
import {nunito} from "@/fonts";
import {CircleCheckIcon} from "lucide-react";
import {TDayAbbreviation} from "@/definitions";
import MissSetButton from "../MissSetButton";
import NumberedMissRepButton from "../NumberedMissRepButton";

interface MaxTrainingSetsDisplayProps {
  trainingSetReps: number;
  updateCompletedTrainingSets: Dispatch<SetStateAction<number[]>>;
  updateDayComplete: Dispatch<SetStateAction<boolean>>;
  completedTrainingSets: number[];
}

const recoveryTime = 60;
const dayAbbreviation: TDayAbbreviation = 'MXTS';

const MaxTrainingSetsDisplay = ({
  trainingSetReps,
  updateCompletedTrainingSets,
  completedTrainingSets,
  updateDayComplete
}: MaxTrainingSetsDisplayProps) => {

  const [showTimerModal, setShowTimerModal] = useState(false);
  const [missedSet, setMissedSet] = useState(false);

  function handleComplete() {
    updateCompletedTrainingSets(
      [...completedTrainingSets, trainingSetReps]
    );
    setShowTimerModal(true);
  }

  return (
    <section className={styles.maxTrainingSetsContainer}>
      <h2 style={nunito.style}>
        {missedSet ? (
          <>How many did you do?</>
        ) : completedTrainingSets.length < 9 ? (
          `${9 - completedTrainingSets.length} MORE ${isSingular(9 - completedTrainingSets.length) ? 'SET' : 'SETS'} OF ${trainingSetReps}`
        ) : completedTrainingSets.length === 9 ? (
        `DO ANOTHER`
        ) : (
        `... AND ANOTHER!`
        )}
      </h2>
      <div>
        <h3 style={nunito.style}>
          {missedSet ? (
            `Rep Count`
          ) : (
            <>
              COMPLETED {completedTrainingSets.length} {isSingular(completedTrainingSets.length) ? 'SET' : 'SETS'}
            </>
          )}
        </h3>
      </div>
      <div className={styles.actionButtonsContainer}>
        {missedSet ? (
          <>
            {Array.from({length: trainingSetReps}, (_, i) => {
              return (
                <NumberedMissRepButton
                  key={i}
                  dayAbbreviation={dayAbbreviation}
                  onMissed={setMissedSet}
                  repCount={i}
                  updateCompletedTrainingSets={updateCompletedTrainingSets}
                  completedTrainingSets={completedTrainingSets}
                  updateDayComplete={updateDayComplete}
                />
              )
            })}
          </>
        ) : (
          <section className={styles.missOrHitButtonsContainer}>
            <MissSetButton
              dayAbbreviation={dayAbbreviation}
              onMissedSet={setMissedSet}
            />
            <button
              type='button'
              className={styles.actionButton}
              onClick={handleComplete}
              disabled={showTimerModal}
            >
              <CircleCheckIcon className={styles.icon} />
            </button>
          </section>
        )}
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
