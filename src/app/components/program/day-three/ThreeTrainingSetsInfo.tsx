'use client';

import { useState } from "react";
import TrainingSetRepsInput from "@/components/program/day-three/TrainingSetRepsInput";
import GripSelector from "./GripSelector";

const ThreeTrainingSetsInfo = () => {

  const [dayComplete, setDayComplete] = useState(false);
  const [trainingSetReps, setTrainingSetReps] = useState(0);
  const [currentGrip, setCurrentGrip] = useState('');
  const [completedGrips, setCompletedGrips] = useState([]);

  return (
    <>
      {!trainingSetReps ? (
        <TrainingSetRepsInput
          setStateForTrainingSetReps={setTrainingSetReps}
        />
      ) : (
        <>
          <GripSelector
            completedGripsState={completedGrips}
            setStateForCurrentGrip={setCurrentGrip}
          />
        </>
      )}

    </>
  )
};

export default ThreeTrainingSetsInfo;
