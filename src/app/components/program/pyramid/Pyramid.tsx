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

const Pyramid = () => {
  let initialRepsArray: number[] = [];

  const [reps, setReps] = useState(1);
  const [repsArray, setRepsArray] = useState(initialRepsArray);
  const [missed, setMissed] = useState(false);
  const [dayComplete, setDayComplete] = useState(false);
  const [showMissedSetNumbers, setShowMissedSetNumbers] = useState(false);
  const [showMaxoutNumbers, setShowMaxoutNumbers] = useState(false);

  return (
    <section className={styles.pyramidSectionContainer}>
      <PyramidDisplay repsArray={repsArray} />
      {dayComplete ? (
        <DayComplete />
      ) : (
        <>


      {missed ? (
        <h3 className={styles.doRepsText}>How many did you do?</h3>
      ) : showMaxoutNumbers ? (
        <h3 className={styles.doRepsText}>MAX OUT!</h3>
      ) : (
        <h3 className={styles.doRepsText}>DO {reps} {isSingular(reps) ? 'REP' : 'REPS'}</h3>
          )}
      <div className={ styles.actionButtonContainer }>
        {repsArray.length > 0 && !missed && !showMaxoutNumbers && (
          <MissSetButton onMissed={setMissed} />
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
                    setStateForReps={setReps}
                    onMissed={setMissed}
                    setStateForMaxNumbers={setShowMaxoutNumbers}
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
          repsState={reps}
          repsArrayState={repsArray}
          setStateForReps={setReps}
          setStateForRepsArray={setRepsArray}
        />
        )}
      </div>
        </>
      )}
    </section>
  )
};

export default Pyramid;
