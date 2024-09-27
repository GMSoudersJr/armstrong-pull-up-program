"use client";

import { useState } from "react";
import styles from "./FiveMaxEffortSets.module.css";
import RepInput from "@/components/program/fiveMaxEffortSets/RepInput";
import RepsCompleteButton from "@/components/program/fiveMaxEffortSets/RepsCompleteButton";
import RepsRemoveButton from "@/components/program/fiveMaxEffortSets/RepsRemoveButton";
import SetsTable from "@/components/program/fiveMaxEffortSets/SetsTable";
import { createPortal } from "react-dom";
import TimerModal from "@/components/program/TimerModal";
import DayComplete from "@/components/program/DayComplete";
import { TDayNumber } from "@/definitions";
import DayProgessBar from "../DayProgressBar";

const recoveryTime = 90;

interface FiveMaxEffortSetsProps {
  dayNumber: TDayNumber;
}

const FiveMaxEffortSets = ({ dayNumber }: FiveMaxEffortSetsProps) => {
  let initialRepsArray: number[] = [];

  const [reps, setReps] = useState(0);
  const [repsArray, setRepsArray] = useState(initialRepsArray);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [savedDay, setSavedDay] = useState(false);

  const dayComplete = repsArray.length === 5;

  return (
    <section className={styles.repInfoSection}>
      {repsArray.length > 0 && (
        <div className={styles.setInfo}>
          <SetsTable repsArray={repsArray} />
        </div>
      )}
      {dayComplete ? (
        <DayComplete
          setStateForSavedDay={setSavedDay}
          dayData={{
            dayNumber: dayNumber,
            dayAbbreviation: "5MES",
            sets: repsArray,
          }}
        />
      ) : (
        <>
          {repsArray.length < 5 && (
            <>
              <DayProgessBar
                dayAbbreviation="5MES"
                currentSetNumber={repsArray.length}
                maxSetNumber={5}
              />
              <RepInput
                onChange={setReps}
                onEnter={setRepsArray}
                repsArrayState={repsArray}
                setStateForShowTimerModal={setShowTimerModal}
                showTimerModalState={showTimerModal}
              />
              <section className={styles.actionButtonsContainer}>
                <div>
                  <RepsRemoveButton
                    repsArrayState={repsArray}
                    setStateForRepsArray={setRepsArray}
                    showTimerModalState={showTimerModal}
                    savedDay={savedDay}
                  />
                </div>
                <div>
                  <RepsCompleteButton
                    reps={reps}
                    repsArrayState={repsArray}
                    setStateForRepsArray={setRepsArray}
                    setStateForShowTimerModal={setShowTimerModal}
                    showTimerModalState={showTimerModal}
                  />
                </div>
              </section>
            </>
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
        </>
      )}
    </section>
  );
};

export default FiveMaxEffortSets;
