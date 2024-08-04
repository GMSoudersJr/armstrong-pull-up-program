'use client';

import { useState } from "react";
import styles from './PyramidInfo.module.css';
import RepsCompleteButton from '@/components/program/day-two/RepsCompleteButton';
import Pyramid from "@/components/program/day-two/Pyramid";
import {isSingular} from "@/utils";
import MissModalPortal from "./MissModalPortal";
import MaxoutNumberButton from "./MaxoutNumberButton";

const PyramidInfo = () => {
  let initialRepsArray: number[] = [];

  const [reps, setReps] = useState(1);
  const [repsArray, setRepsArray] = useState(initialRepsArray);
  const [missed, setMissed] = useState(false);
  const [dayComplete, setDayComplete] = useState(false);

  return (
    <section className={styles.pyramidSectionContainer}>
      <Pyramid repsArray={repsArray} />
      {dayComplete ? (
        <h1>COMPLETE</h1>
      ) : (
        <>


      {missed ? (
        <h3 className={styles.doRepsText}>MAX OUT!</h3>
      ) : (
        <h3 className={styles.doRepsText}>DO {reps} {isSingular(reps) ? 'REP' : 'REPS'}</h3>
      )}
      <div className={ styles.actionButtonContainer }>
        {repsArray.length > 0 && !missed  && (
        <MissModalPortal
          onMissed={setMissed}
          repsState={reps}
          repsArrayState={repsArray}
          setStateForReps={setReps}
          setStateForRepsArray={setRepsArray}
        />
        )}
        {missed ? (
          <div className={styles.maxoutRepNumberContainer}>
            {repsArray.map((reps) => {
              return (
                <MaxoutNumberButton
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

export default PyramidInfo;