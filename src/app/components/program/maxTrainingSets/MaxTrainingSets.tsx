'use client';

import styles from './MaxTrainingSets.module.css';
import { useState } from "react";
import TrainingSetRepsInput from "@/components/program/TrainingSetRepsInput";
import MaxTrainingSetsDisplay from "@/components/program/maxTrainingSets/MaxTrainingSetsDisplay";
import DayComplete from "@/components/program/DayComplete";
import { DAYS } from "@/const";

interface MaxTrainingSetsProps {
  dayNumber: number;
}

const MaxTrainingSets = ({ dayNumber }: MaxTrainingSetsProps) => {
  const [trainingSetReps, setTrainingSetReps] = useState(0);
  const [dayComplete, setDayComplete] = useState(false);
  const [completedTrainingSets, setCompletedTrainingSets] = useState(0);

  return (
    <>
      {dayNumber === 5 ? (
        <section>
          {dayComplete ? (
            <DayComplete />
          ) : !trainingSetReps ? (
            <TrainingSetRepsInput
              setStateForTrainingSetReps={setTrainingSetReps}
            />
          ) : (
              <MaxTrainingSetsDisplay
                completedTrainingSets={completedTrainingSets}
                trainingSetReps={trainingSetReps}
                updateCompletedTrainingSets={setCompletedTrainingSets}
                updateDayComplete={setDayComplete}
              />
          )}
        </section>
      ) : (
        <main className={styles.main}>
          <div className={styles.headingContainer}>
            <h1>{DAYS.filter((day) => day.number === dayNumber)[0].label}</h1>
            <h2>{DAYS.filter((day) => day.number === dayNumber)[0].heading2}</h2>
            <h3>{DAYS.filter((day) => day.number === dayNumber)[0].heading3}</h3>
          </div>
          <section>
            {dayComplete ? (
              <DayComplete />
            ) : !trainingSetReps ? (
              <TrainingSetRepsInput
                setStateForTrainingSetReps={setTrainingSetReps}
              />
            ) : (
                <MaxTrainingSetsDisplay
                  completedTrainingSets={completedTrainingSets}
                  trainingSetReps={trainingSetReps}
                  updateCompletedTrainingSets={setCompletedTrainingSets}
                  updateDayComplete={setDayComplete}
                />
            )}
          </section>
        </main>
      )}
    </>
  )
};

export default MaxTrainingSets;
