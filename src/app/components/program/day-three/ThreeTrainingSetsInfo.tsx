'use client';

import { useState } from "react";
import TrainingSetRepsInput from "@/components/program/TrainingSetRepsInput";
import GripSelector from "./GripSelector";
import SetInfo from "./SetInfo";
import DayComplete from "@/components/program/DayComplete";

const ThreeTrainingSetsInfo = () => {
  let initialCompletedGrips: string[] = [];

  const [trainingSetReps, setTrainingSetReps] = useState(0);
  const [currentGrip, setCurrentGrip] = useState('');
  const [completedGrips, setCompletedGrips] = useState(initialCompletedGrips);

  const dayComplete = completedGrips.length === 3;

  return (
    <section>
      {dayComplete ? (
        <DayComplete />
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
  )
};

export default ThreeTrainingSetsInfo;
