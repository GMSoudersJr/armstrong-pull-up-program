'use client';

import { useState } from "react";
import styles from './Pyramid.module.css';
import RepsCompleteButton from '@/components/program/pyramid/RepsCompleteButton';
import {isSingular} from "@/utils";
import MaxoutNumberButton from "@/components/program/pyramid/MaxoutNumberButton";
import DayComplete from "@/components/program/DayComplete";
import PyramidDisplay from "@/components/program/pyramid/PyramidDisplay";
import NumberedMissRepButton from "@/components/program/NumberedMissRepButton";
import TimerModal from "@/components/program/TimerModal";
import MissSetButton from "@/components/program/MissSetButton";
import {createPortal} from "react-dom";
import {TDayAbbreviation, TDayNumber} from "@/definitions";
import {nunito} from "@/fonts";

interface PyramidProps {
  dayNumber: TDayNumber;
}

const Pyramid = ({ dayNumber }: PyramidProps) => {
  let initialRepsArray: number[] = [];
  const dayAbbreviation: TDayAbbreviation = 'PYRA';

  const [completedReps, setCompletedReps] = useState(0);
  const [repsArray, setRepsArray] = useState(initialRepsArray);
  const [missed, setMissed] = useState(false);
  const [dayComplete, setDayComplete] = useState(false);
  const [showMaxoutNumbers, setShowMaxoutNumbers] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [savedDay, setSavedDay] = useState(false);

  return (
    <section className={styles.pyramidSectionContainer}>
      <PyramidDisplay repsArray={repsArray} />
      {dayComplete ? (
        <DayComplete
          setStateForSavedDay={setSavedDay}
          dayData={{
            dayAbbreviation: "PYRA",
            dayNumber: dayNumber,
            sets: repsArray
          }}
        />
      ) : (
        <>
          <h2
            className={styles.doRepsText}
            style={nunito.style}
          >
            {missed ? (
              `How many did you do?`
            ) : showMaxoutNumbers ? (
              `MAX OUT! HOW MANY?`
            ) : (
            `DO ${completedReps + 1} ${isSingular(completedReps + 1) ? 'REP' : 'REPS'}`
            )}
          </h2>

          <div className={ styles.actionButtonContainer }>

            {missed ? (
                <div className={styles.missedSetNumberContainer}>
                  {repsArray.map((reps, i) => {
                    return (
                      <NumberedMissRepButton
                        dayAbbreviation={dayAbbreviation}
                        key={`${i}-${reps}`}
                        repCount={reps}
                        repsArrayState={repsArray}
                        setStateForRepsArray={setRepsArray}
                        setStateForReps={setCompletedReps}
                        onMissed={setMissed}
                        setStateForMaxNumbers={setShowMaxoutNumbers}
                        setStateForShowTimerModal={setShowTimerModal}
                        showTimerModalState={showTimerModal}
                      />
                    )
                  })}
                </div>
            ) : showMaxoutNumbers ? (
              <div className={styles.maxoutRepNumberContainer}>
                {repsArray.slice(0, -1).map((reps, i) => {
                  return (
                    <MaxoutNumberButton
                      key={`${i}-${reps}`}
                      repCount={reps}
                      repsArrayState={repsArray}
                      setStateForRepsArray={setRepsArray}
                      setStateForDayComplete={setDayComplete}
                      showTimerModalState={showTimerModal}
                    />
                  )
                })}
              </div>
            ) : (
              <section className={styles.actionButtonsContainer}>
                <MissSetButton
                  dayAbbreviation={dayAbbreviation}
                  showTimerModalState={showTimerModal}
                  onMissedSet={setMissed}
                  completedSetCount={repsArray.length}
                />
                <RepsCompleteButton
                  repsState={completedReps}
                  repsArrayState={repsArray}
                  setStateForReps={setCompletedReps}
                  setStateForRepsArray={setRepsArray}
                  setStateForShowTimerModal={setShowTimerModal}
                  showTimerModalState={showTimerModal}
                />
              </section>
            )}
          </div>
          {showTimerModal && createPortal(
            <TimerModal
              recoveryTime={10 * completedReps}
              onClose={() => setShowTimerModal(false)}
              setStateForShowTimerModal={setShowTimerModal}
            />,
            document.body
          )}

        </>
      )}
    </section>
  )
};

export default Pyramid;
