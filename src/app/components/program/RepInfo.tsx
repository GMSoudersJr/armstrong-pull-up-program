'use client';

import styles from './RepInfo.module.css'
import RepInput from "./RepInput"
import RepOutput from "./RepOutput"
import { useState } from "react";
import RepsCompleteButton from "@/components/program/RepsCompleteButton";
import RepsRemoveButton from "@/components/program/RepsRemoveButton";

const RepInfo = () => {
  let initialRepsArray: number[] = [];
  const [reps, setReps] = useState(0);
  const [repsArray, setRepsArray] = useState(initialRepsArray);

  return (
    <section className={styles.repInfoSection}>
      <RepOutput reps={repsArray}/>
      {repsArray.length > 0 &&
        <RepsRemoveButton
          setStateForRepsArray={setRepsArray}
          repsArrayState={repsArray}
        />
      }
      <RepInput
        onChange={setReps}
        onEnter={setRepsArray}
        repsArrayState={repsArray}
      />
      <RepsCompleteButton
        reps={reps}
        setStateForRepsArray={setRepsArray}
        repsArrayState={repsArray}
      />
    </section>
  )
}

export default RepInfo;
