'use client';

import { useState } from "react";
import styles from './Pyramid.module.css';
import RepsCompleteButton from '@/components/program/pyramid/RepsCompleteButton';
import {isSingular} from "@/utils";
import MaxoutNumberButton from "@/components/program/pyramid/MaxoutNumberButton";
import DayComplete from "@/components/program/DayComplete";
import PyramidDisplay from "@/components/program/pyramid/PyramidDisplay";
import MissSetButton from "./MissSetButton";
import NumberedMissRepButton from "./NumberedMissRepButton";
import TimerModal from "@/components/program/TimerModal";
import {createPortal} from "react-dom";
import {TDayNumber} from "@/definitions";
import {nunito} from "@/fonts";

interface PyramidProps {
  dayNumber: TDayNumber;
}

const Pyramid = ({ dayNumber }: PyramidProps) => {
  let initialRepsArray: number[] = [];

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
          <h3
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
          </h3>

          <div className={ styles.actionButtonContainer }>
            {repsArray.length > 0 && !missed && !showMaxoutNumbers && (
              <MissSetButton
                showTimerModalState={showTimerModal}
                onMissed={setMissed}
              />
            )}

            {missed ? (
                <div className={styles.missedSetNumberContainer}>
                  {repsArray.map((reps, i) => {
                    return (
                      <NumberedMissRepButton
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
            <RepsCompleteButton
              repsState={completedReps}
              repsArrayState={repsArray}
              setStateForReps={setCompletedReps}
              setStateForRepsArray={setRepsArray}
              setStateForShowTimerModal={setShowTimerModal}
              showTimerModalState={showTimerModal}
            />
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
