'use client';

import { useState } from "react";
import TrainingSetRepsInput from "@/components/program/TrainingSetRepsInput";
import MaxTrainingSetsDisplay from "@/components/program/maxTrainingSets/MaxTrainingSetsDisplay";
import DayComplete from "@/components/program/DayComplete";
import {TDayNumber} from '@/definitions';

interface MaxTrainingSetsProps {
  dayNumber: TDayNumber;
}

const MaxTrainingSets = ({ dayNumber }: MaxTrainingSetsProps) => {
  const initialCompletedTrainingSets: number[] = [];
  const [trainingSetReps, setTrainingSetReps] = useState(0);
  const [dayComplete, setDayComplete] = useState(false);
  const [completedTrainingSets, setCompletedTrainingSets] = useState(initialCompletedTrainingSets);

  return (
    <section>
      {dayComplete ? (
        <DayComplete
          dayData={{
            dayAbbreviation: 'MXTS',
            dayNumber: dayNumber,
            trainingSetsCount: completedTrainingSets.length,
            sets: completedTrainingSets,
            trainingSetReps: trainingSetReps,
            success: completedTrainingSets.length >= 9
          }}
        />
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
