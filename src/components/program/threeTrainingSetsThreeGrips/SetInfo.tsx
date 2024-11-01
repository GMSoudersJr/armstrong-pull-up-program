import styles from "./SetInfo.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { createPortal } from "react-dom";
import TimerModal from "../TimerModal";
import { TGrip } from "@/app/lib/definitions";
import { nunito } from "@/fonts";
import { ArrowRightToLineIcon, CircleCheckIcon } from "lucide-react";
import NumberedMissRepButton from "@/components/program/NumberedMissRepButton";
import MissSetButton from "../MissSetButton";
import DayProgessBar from "../DayProgressBar";

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
  updateCompletedGrips,
}: SetInfoProps) => {
  const [completedSetCount, setCompletedSetCount] = useState(0);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [missedSet, setMissedSet] = useState(false);

  function handleDone(): void {
    if (completedSetCount == 2 && completedGrips.length == 2) {
      updateCompletedGrips([...completedGrips, currentGrip]);

      updateCurrentGrip("");
    }
    if (completedSetCount <= 2) {
      setCompletedSetCount((completedSetCount) => completedSetCount + 1);
      updateTrainingSets([...trainingSets, trainingSetReps]);
      setShowTimerModal(true);
    } else {
      updateCompletedGrips([...completedGrips, currentGrip]);

      updateCurrentGrip("");
    }
  }

  return (
    <section className={styles.setInfoContainer}>
      <DayProgessBar
        dayAbbreviation="3S3G"
        currentSetNumber={trainingSets.length}
        maxSetNumber={9}
      />
      <h2 style={nunito.style}>
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
      </h2>

      <h3 style={nunito.style}>
        {missedSet ? (
          `Rep Count`
        ) : (
          <>
            {currentGrip?.toUpperCase()} SETS:
            <span className={styles.setCount} style={nunito.style}>
              {` ${completedSetCount}`}
            </span>
          </>
        )}
      </h3>

      <div className={styles.buttonsContainer}>
        {missedSet ? (
          <div
            id="missed-set-number-container"
            className={styles.missedSetNumberContainer}
          >
            {Array.from({ length: trainingSetReps }, (_, i) => {
              return (
                <NumberedMissRepButton
                  dayAbbreviation="3S3G"
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
              );
            })}
          </div>
        ) : (
          <section className={styles.actionButtonsContainer}>
            <MissSetButton
              dayAbbreviation="3S3G"
              onMissedSet={setMissedSet}
              showTimerModalState={showTimerModal}
              completedSetCount={completedSetCount}
            />
            {completedSetCount === 3 ? (
              <button
                id="next-grip-button"
                title="Choose next grip"
                type="button"
                className={`${styles.completeButton} actionButton`}
                onClick={handleDone}
                disabled={showTimerModal}
              >
                <ArrowRightToLineIcon className={styles.icon} />
              </button>
            ) : (
              <button
                id="complete-set-button"
                title="Completed the set"
                type="button"
                className={`${styles.completeButton} actionButton`}
                onClick={handleDone}
                disabled={showTimerModal}
              >
                <CircleCheckIcon className={styles.icon} />
              </button>
            )}
          </section>
        )}
        {showTimerModal &&
          createPortal(
            <TimerModal
              onClose={() => setShowTimerModal(false)}
              recoveryTime={recoveryTime}
              setStateForShowTimerModal={setShowTimerModal}
            />,
            document.body,
          )}
      </div>
    </section>
  );
};

export default SetInfo;
