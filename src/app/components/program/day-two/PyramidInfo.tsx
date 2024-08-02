'use client';

import { useState } from "react";
import styles from './PyramidInfo.module.css';
import RepsCompleteButton from '@/components/program/day-two/RepsCompleteButton';
import Pyramid from "@/components/program/day-two/Pyramid";
import {isSingular} from "@/utils";
import MissModalPortal from "./MissModalPortal";

const PyramidInfo = () => {
  let initialRepsArray: number[] = [];

  const [reps, setReps] = useState(1);
  const [repsArray, setRepsArray] = useState(initialRepsArray);
  const [missed, setMissed] = useState(false);

  return (
    <section className={styles.pyramidSectionContainer}>
      <Pyramid repsArray={repsArray} />
      {missed ? (
        <h3 className={styles.doRepsText}>MAX OUT!</h3>
      ) : (
        <h3 className={styles.doRepsText}>DO {reps} {isSingular(reps) ? 'REP' : 'REPS'}</h3>
      )}
      <div className={ styles.actionButtons }>
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
          <p>A row of number buttons here</p>
        ) : (
        <RepsCompleteButton
          repsState={reps}
          repsArrayState={repsArray}
          setStateForReps={setReps}
          setStateForRepsArray={setRepsArray}
        />
        )}
      </div>
    </section>
  )
};

export default PyramidInfo;
