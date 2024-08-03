'use client';

import { useState } from "react";
import TrainingSetRepsInput from "@/components/program/day-three/TrainingSetRepsInput";

const ThreeTrainingSetsInfo = () => {

  const [dayComplete, setDayComplete] = useState(false);
  const [trainingSetReps, setTrainingSetReps] = useState(0);
  const [currentGrip, setCurrentGrip] = useState('');

  const GRIPS = ['neutral', 'wide', 'close'];

  return (
    <>
      {!trainingSetReps ? (
        <TrainingSetRepsInput
          setStateForTrainingSetReps={setTrainingSetReps}
        />
      ) : (
        <>
          <h1>{trainingSetReps}</h1>
        </>
      )}

    </>
  )
};

export default ThreeTrainingSetsInfo;
