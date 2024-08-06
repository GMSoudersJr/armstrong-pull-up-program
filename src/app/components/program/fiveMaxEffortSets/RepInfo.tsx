'use client';

import styles from './RepInfo.module.css'
import RepInput from "./RepInput"
import { useState } from "react";
import RepsCompleteButton from "@/components/program/RepsCompleteButton";
import RepsRemoveButton from "@/components/program/RepsRemoveButton";
import SetTable from '@/components/program/day-one/SetTable';

const RepInfo = () => {
  let initialRepsArray: number[] = [];

  const [reps, setReps] = useState(0);
  const [repsArray, setRepsArray] = useState(initialRepsArray);

  return (
    <section className={styles.repInfoSection}>
      <SetTable repsArray={repsArray}/>
      {repsArray.length > 0 &&
        <RepsRemoveButton
          repsArrayState={repsArray}
          setStateForRepsArray={setRepsArray}
        />
      }
      {repsArray.length < 5 &&
        <>
          <RepInput
            onChange={setReps}
            onEnter={setRepsArray}
            repsArrayState={repsArray}
          />
          <RepsCompleteButton
            reps={reps}
            repsArrayState={repsArray}
            setStateForRepsArray={setRepsArray}
          />
        </>
      }
    </section>
  )
}

export default RepInfo;
