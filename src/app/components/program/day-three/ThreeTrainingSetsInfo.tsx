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
      ) : !currentGrip ? (
        <>
          <GripSelector
            completedGripsState={completedGrips}
            setStateForCurrentGrip={setCurrentGrip}
          />
        </>
      ) : (
        <>
          <h3>DO {trainingSetReps} {currentGrip.toUpperCase()} PULL-UPS</h3>
        </>
      )}

    </>
  )
};

export default ThreeTrainingSetsInfo;
