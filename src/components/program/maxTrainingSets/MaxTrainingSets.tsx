"use client";

import { useState } from "react";
import TrainingSetRepsInput from "@/components/program/TrainingSetRepsInput";
import MaxTrainingSetsDisplay from "@/components/program/maxTrainingSets/MaxTrainingSetsDisplay";
import DayComplete from "@/components/program/DayComplete";
import ExitWorkoutModal from "@/components/program/ExitWorkoutModal";
import { useConfirmExitOnBack } from "@/hooks/useConfirmExitOnBack";
import { TDayNumber } from "@/definitions";

interface MaxTrainingSetsProps {
  dayNumber: TDayNumber;
}

const MaxTrainingSets = ({ dayNumber }: MaxTrainingSetsProps) => {
  const initialCompletedTrainingSets: number[] = [];
  const [trainingSetReps, setTrainingSetReps] = useState(0);
  const [dayComplete, setDayComplete] = useState(false);
  const [completedTrainingSets, setCompletedTrainingSets] = useState(
    initialCompletedTrainingSets,
  );
  const [savedDay, setSavedDay] = useState(false);

  const hasProgress =
    (trainingSetReps > 0 || completedTrainingSets.length > 0) && !savedDay;
  const { showExitModal, cancelExit, confirmExit } =
    useConfirmExitOnBack(hasProgress);

  return (
    <section>
      {dayComplete ? (
        <DayComplete
          setStateForSavedDay={setSavedDay}
          dayData={{
            dayAbbreviation: "MXTS",
            dayNumber: dayNumber,
            trainingSetsCount: completedTrainingSets.length,
            sets: completedTrainingSets,
            trainingSetReps: trainingSetReps,
            success: completedTrainingSets.length >= 9,
          }}
        />
      ) : !trainingSetReps ? (
        <TrainingSetRepsInput setStateForTrainingSetReps={setTrainingSetReps} />
      ) : (
        <MaxTrainingSetsDisplay
          completedTrainingSets={completedTrainingSets}
          trainingSetReps={trainingSetReps}
          updateCompletedTrainingSets={setCompletedTrainingSets}
          updateDayComplete={setDayComplete}
        />
      )}
      {showExitModal && (
        <ExitWorkoutModal onClose={cancelExit} onConfirm={confirmExit} />
      )}
    </section>
  );
};

export default MaxTrainingSets;
