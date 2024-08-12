'use client';

import { useState } from "react";
import styles from './FiveMaxEffortSets.module.css';
import RepInput from "@/components/program/fiveMaxEffortSets/RepInput";
import RepsCompleteButton from "@/components/program/fiveMaxEffortSets/RepsCompleteButton";
import RepsRemoveButton from "@/components/program/fiveMaxEffortSets/RepsRemoveButton";
import SetsTable from "@/components/program/fiveMaxEffortSets/SetsTable";
import {createPortal} from "react-dom";
import TimerModal from "../TimerModal";
import { DAYS } from "@/const";
import DayComplete from "../DayComplete";

const recoveryTime = 90;

interface FiveMaxEffortSetsProps {
  dayNumber: number
}

const FiveMaxEffortSets = ({ dayNumber }: FiveMaxEffortSetsProps) => {
  let initialRepsArray: number[] = [];

  const [reps, setReps] = useState(0);
  const [repsArray, setRepsArray] = useState(initialRepsArray);
  const [showTimerModal, setShowTimerModal] = useState(false);

  const dayComplete = repsArray.length === 5;


  return (
    <>
    {dayNumber === 5 ? (
      <section className={styles.repInfoSection}>
        <SetsTable repsArray={repsArray}/>
        {dayComplete ? (
          <DayComplete
            dayData={{
              dayNumber: 5,
              dayAbbreviation: '5MES',
              sets: repsArray
            }}
          />
        ) : (
          <>
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
          </>
        )}
      </section>
    ) : (
    <main className={styles.main}>
      <div className={styles.headingContainer}>
        <h1>{DAYS.filter((day) => day.number === dayNumber)[0].label}</h1>
        <h2>{DAYS.filter((day) => day.number === dayNumber)[0].heading2}</h2>
        <h3>{DAYS.filter((day) => day.number === dayNumber)[0].heading3}</h3>
      </div>
      <section className={styles.repInfoSection}>
        <SetsTable repsArray={repsArray}/>
        {dayComplete ? (
          <DayComplete
            dayData={{
              dayNumber: 1,
              dayAbbreviation: '5MES',
              sets: repsArray
            }}
          />
        ) : (
          <>
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
          </>
        )}
      </section>
    </main>
        )}
    </>
  )
}

export default FiveMaxEffortSets;
