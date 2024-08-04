'use client';

import { useState } from "react";
import TrainingSetRepsInput from "@/components/program/TrainingSetRepsInput";
import MaxTrainingSets from "@/components/program/day-four/MaxTrainingSets";
import DayComplete from "@/components/program/DayComplete";

const MaxTrainingSetsInfo = () => {
  const [trainingSetReps, setTrainingSetReps] = useState(0);
  const [dayComplete, setDayComplete] = useState(false);
  const [completedTrainingSets, setCompletedTrainingSets] = useState(0);

  return (
    <section>
      {dayComplete ? (
        <DayComplete />
      ) : !trainingSetReps ? (
        <TrainingSetRepsInput
          setStateForTrainingSetReps={setTrainingSetReps}
        />
      ) : (
          <MaxTrainingSets
            completedTrainingSets={completedTrainingSets}
            trainingSetReps={trainingSetReps}
            updateCompletedTrainingSets={setCompletedTrainingSets}
            updateDayComplete={setDayComplete}
          />
      )}
    </section>
  )
};

export default MaxTrainingSetsInfo;
