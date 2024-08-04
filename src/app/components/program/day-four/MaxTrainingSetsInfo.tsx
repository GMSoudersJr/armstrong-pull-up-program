'use client';

import { useState } from "react";
import TrainingSetRepsInput from "../TrainingSetRepsInput";
import DayComplete from "../DayComplete";

const MaxTrainingSetsInfo = () => {
  const [trainingSetReps, setTrainingSetReps] = useState(0);
  const [dayComplete, setDayComplete] = useState(false);

  return (
    <section>
      {dayComplete ? (
        <DayComplete />
      ) : !trainingSetReps ? (
        <TrainingSetRepsInput
          setStateForTrainingSetReps={setTrainingSetReps}
        />
      ) : (
        <>
          {trainingSetReps}
        </>
      )}
    </section>
  )
};

export default MaxTrainingSetsInfo;
