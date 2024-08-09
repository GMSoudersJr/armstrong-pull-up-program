'use client';

import { useState } from "react";
import styles from './FiveMaxEffortSets.module.css';
import RepInput from "@/components/program/fiveMaxEffortSets/RepInput";
import RepsCompleteButton from "@/components/program/fiveMaxEffortSets/RepsCompleteButton";
import RepsRemoveButton from "@/components/program/fiveMaxEffortSets/RepsRemoveButton";
import SetsTable from "@/components/program/fiveMaxEffortSets/SetsTable";
import {createPortal} from "react-dom";
import TimerModal from "../TimerModal";

const recoveryTime = 90;

const FiveMaxEffortSets = () => {
  let initialRepsArray: number[] = [];

  const [reps, setReps] = useState(0);
  const [repsArray, setRepsArray] = useState(initialRepsArray);
  const [showTimerModal, setShowTimerModal] = useState(false);



  return (
    <section className={styles.repInfoSection}>
      <SetsTable repsArray={repsArray}/>
      {repsArray.length > 0 &&
        <RepsRemoveButton
          repsArrayState={repsArray}
          setStateForRepsArray={setRepsArray}
          showTimerModalState={showTimerModal}
        />
      }
      {repsArray.length < 5 &&
        <>
          <RepInput
            onChange={setReps}
            onEnter={setRepsArray}
            repsArrayState={repsArray}
            setStateForShowTimerModal={setShowTimerModal}
            showTimerModalState={showTimerModal}
          />
          <RepsCompleteButton
            reps={reps}
            repsArrayState={repsArray}
            setStateForRepsArray={setRepsArray}
            setStateForShowTimerModal={setShowTimerModal}
            showTimerModalState={showTimerModal}
          />
        </>
      }
      {showTimerModal && createPortal(
        <TimerModal
          onClose={() => setShowTimerModal(false)}
          recoveryTime={recoveryTime}
          setStateForShowTimerModal={setShowTimerModal}
        />,
        document.body
      )}
    </section>
  )
}

export default FiveMaxEffortSets;
