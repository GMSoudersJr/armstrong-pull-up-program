'use client';

import { useState } from "react";
import styles from './FiveMaxEffortSets.module.css';
import RepInput from "@/components/program/fiveMaxEffortSets/RepInput";
import RepsCompleteButton from "@/components/program/fiveMaxEffortSets/RepsCompleteButton";
import RepsRemoveButton from "@/components/program/fiveMaxEffortSets/RepsRemoveButton";
import SetsTable from "@/components/program/fiveMaxEffortSets/SetsTable";

const FiveMaxEffortSets = () => {
  let initialRepsArray: number[] = [];

  const [reps, setReps] = useState(0);
  const [repsArray, setRepsArray] = useState(initialRepsArray);

  return (
    <section className={styles.repInfoSection}>
      <SetsTable repsArray={repsArray}/>
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

export default FiveMaxEffortSets;
