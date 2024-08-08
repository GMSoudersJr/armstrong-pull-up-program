'use client';

import { useState } from "react";
import TrainingSetRepsInput from "@/components/program/TrainingSetRepsInput";
import MaxTrainingSetsDisplay from "@/components/program/maxTrainingSets/MaxTrainingSetsDisplay";
import DayComplete from "@/components/program/DayComplete";

const MaxTrainingSets = () => {
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
          <MaxTrainingSetsDisplay
            completedTrainingSets={completedTrainingSets}
            trainingSetReps={trainingSetReps}
            updateCompletedTrainingSets={setCompletedTrainingSets}
            updateDayComplete={setDayComplete}
          />
      )}
    </section>
  )
};

export default MaxTrainingSets;
