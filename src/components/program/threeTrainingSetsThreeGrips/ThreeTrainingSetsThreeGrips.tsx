'use client';

import styles from './ThreeTrainingSetsThreeGrips.module.css';
import { useState } from "react";
import TrainingSetRepsInput from "@/components/program/TrainingSetRepsInput";
import GripSelector from "@/components/program/threeTrainingSetsThreeGrips/GripSelector";
import SetInfo from "@/components/program/threeTrainingSetsThreeGrips/SetInfo";
import DayComplete from "@/components/program/DayComplete";
import { DAYS } from "@/const";
import {TGrip} from '@/app/lib/definitions';

interface ThreeTrainingSetsThreeGripsProps {
  dayNumber: number;
};

const ThreeTrainingSetsThreeGrips = ({ dayNumber }: ThreeTrainingSetsThreeGripsProps) => {
  let initialCompletedGrips: TGrip[] = [];
  let initalGrip: TGrip = '';

  const [trainingSetReps, setTrainingSetReps] = useState(0);
  const [currentGrip, setCurrentGrip] = useState(initalGrip);
  const [completedGrips, setCompletedGrips] = useState(initialCompletedGrips);

  const dayComplete = completedGrips.length === 3;

  return (
    <>
      {dayNumber === 5 ? (
        <section>
          {dayComplete ? (
            <DayComplete
              dayData={{
                dayNumber: 5,
                dayAbbreviation: '3S3G',
                trainingSetsCount: 9,
                grips: completedGrips,
                trainingSetReps: trainingSetReps,
              }}
            />
          ) : !trainingSetReps ? (
            <TrainingSetRepsInput
              setStateForTrainingSetReps={setTrainingSetReps}
            />
          ) : !currentGrip ? (
              <GripSelector
                completedGripsState={completedGrips}
                setStateForCurrentGrip={setCurrentGrip}
              />
          ) : (
              <SetInfo
                trainingSetReps={trainingSetReps}
                currentGrip={currentGrip}
                completedGrips={completedGrips}
                updateCurrentGrip={setCurrentGrip}
                updateCompletedGrips={setCompletedGrips}
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
              <DayComplete
                dayData={{
                  dayNumber: 3,
                  dayAbbreviation: '3S3G',
                  trainingSetsCount: 9,
                  grips: completedGrips,
                  trainingSetReps: trainingSetReps,
                }}
              />
            ) : !trainingSetReps ? (
              <TrainingSetRepsInput
                setStateForTrainingSetReps={setTrainingSetReps}
              />
            ) : !currentGrip ? (
                <GripSelector
                  completedGripsState={completedGrips}
                  setStateForCurrentGrip={setCurrentGrip}
                />
            ) : (
                <SetInfo
                  trainingSetReps={trainingSetReps}
                  currentGrip={currentGrip}
                  completedGrips={completedGrips}
                  updateCurrentGrip={setCurrentGrip}
                  updateCompletedGrips={setCompletedGrips}
                />
            )}
          </section>
        </main>
      )}
    </>
  )
};

export default ThreeTrainingSetsThreeGrips;
