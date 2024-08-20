'use client';

import { useState } from "react";
import TrainingSetRepsInput from "@/components/program/TrainingSetRepsInput";
import GripSelector from "@/components/program/threeTrainingSetsThreeGrips/GripSelector";
import SetInfo from "@/components/program/threeTrainingSetsThreeGrips/SetInfo";
import DayComplete from "@/components/program/DayComplete";
import {TDayNumber, TGrip} from '@/app/lib/definitions';

interface ThreeTrainingSetsThreeGripsProps {
  dayNumber: TDayNumber;
};

const ThreeTrainingSetsThreeGrips = ({ dayNumber }: ThreeTrainingSetsThreeGripsProps) => {
  let initialCompletedGrips: TGrip[] = [];
  let initalGrip: TGrip = '';
  const initialTotalSets: number[] = [];

  const [trainingSetReps, setTrainingSetReps] = useState(0);
  const [currentGrip, setCurrentGrip] = useState(initalGrip);
  const [completedGrips, setCompletedGrips] = useState(initialCompletedGrips);
  const [totalSets, setTotalSets] = useState(initialTotalSets);
  const [savedDay, setSavedDay] = useState(false);

  const dayComplete = completedGrips.length === 3;

  return (
    <section>
      {dayComplete ? (
        <DayComplete
          setStateForSavedDay={setSavedDay}
          dayData={{
            dayNumber: dayNumber,
            dayAbbreviation: '3S3G',
            trainingSetsCount: 9,
            grips: completedGrips,
            sets: totalSets,
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
            totalSets={totalSets}
            updateTotalSets={setTotalSets}
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

export default ThreeTrainingSetsThreeGrips;
