'use client';

import { useState } from "react";
import styles from './Pyramid.module.css';
import RepsCompleteButton from '@/components/program/pyramid/RepsCompleteButton';
import {isSingular} from "@/utils";
import MissModalPortal from "@/components/program/pyramid/MissModalPortal";
import MaxoutNumberButton from "@/components/program/pyramid/MaxoutNumberButton";
import DayComplete from "@/components/program/DayComplete";
import PyramidDisplay from "@/components/program/pyramid/PyramidDisplay";
import MissSetButton from "./MissSetButton";
import NumberedMissRepButton from "./NumberedMissRepButton";
import TimerModal from "@/components/program/TimerModal";
import {createPortal} from "react-dom";

const Pyramid = () => {
  let initialRepsArray: number[] = [];

  const [completedReps, setCompletedReps] = useState(0);
  const [repsArray, setRepsArray] = useState(initialRepsArray);
  const [missed, setMissed] = useState(false);
  const [dayComplete, setDayComplete] = useState(false);
  const [showMissedSetNumbers, setShowMissedSetNumbers] = useState(false);
  const [showMaxoutNumbers, setShowMaxoutNumbers] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);

  return (
    <section className={styles.pyramidSectionContainer}>
      <PyramidDisplay repsArray={repsArray} />
      {dayComplete ? (
        <DayComplete />
      ) : (
        <>
          <h3 className={styles.doRepsText}>
            {missed ? (
              `How many did you do?`
            ) : showMaxoutNumbers ? (
              `MAX OUT!`
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
                {repsArray.map((reps, i) => {
                  return (
                    <MaxoutNumberButton
                      key={`${i}-${reps}`}
                      repCount={reps}
                      repsArrayState={repsArray}
                      setStateForRepsArray={setRepsArray}
                      setStateForDayComplete={setDayComplete}
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
