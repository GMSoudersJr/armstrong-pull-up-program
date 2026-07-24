"use client";

import { useState } from "react";
import TrainingSetRepsInput from "@/components/program/TrainingSetRepsInput";
import GripSelector from "@/components/program/threeTrainingSetsThreeGrips/GripSelector";
import SetInfo from "@/components/program/threeTrainingSetsThreeGrips/SetInfo";
import DayComplete from "@/components/program/DayComplete";
import ExitWorkoutModal from "@/components/program/ExitWorkoutModal";
import { useConfirmExitOnBack } from "@/hooks/useConfirmExitOnBack";
import { TDayNumber, TGrip } from "@/app/lib/definitions";

interface ThreeTrainingSetsThreeGripsProps {
  dayNumber: TDayNumber;
}

const ThreeTrainingSetsThreeGrips = ({
  dayNumber,
}: ThreeTrainingSetsThreeGripsProps) => {
  let initialCompletedGrips: TGrip[] = [];
  let initalGrip: TGrip = "";
  const initialTotalSets: number[] = [];

  const [trainingSetReps, setTrainingSetReps] = useState(0);
  const [currentGrip, setCurrentGrip] = useState(initalGrip);
  const [completedGrips, setCompletedGrips] = useState(initialCompletedGrips);
  const [trainingSets, setTrainingSets] = useState(initialTotalSets);
  const [savedDay, setSavedDay] = useState(false);

  const dayComplete = completedGrips.length === 3;
  const hasProgress =
    (trainingSetReps > 0 || completedGrips.length > 0) && !savedDay;
  const { showExitModal, cancelExit, confirmExit } =
    useConfirmExitOnBack(hasProgress);

  return (
    <section>
      {dayComplete ? (
        <DayComplete
          setStateForSavedDay={setSavedDay}
          dayData={{
            dayNumber: dayNumber,
            dayAbbreviation: "3S3G",
            trainingSetsCount: 9,
            grips: completedGrips,
            sets: trainingSets,
            trainingSetReps: trainingSetReps,
          }}
        />
      ) : !trainingSetReps ? (
        <TrainingSetRepsInput setStateForTrainingSetReps={setTrainingSetReps} />
      ) : !currentGrip ? (
        <GripSelector
          completedGripsState={completedGrips}
          setStateForCurrentGrip={setCurrentGrip}
        />
      ) : (
        <SetInfo
          trainingSets={trainingSets}
          updateTrainingSets={setTrainingSets}
          trainingSetReps={trainingSetReps}
          currentGrip={currentGrip}
          completedGrips={completedGrips}
          updateCurrentGrip={setCurrentGrip}
          updateCompletedGrips={setCompletedGrips}
        />
      )}
      {showExitModal && (
        <ExitWorkoutModal onClose={cancelExit} onConfirm={confirmExit} />
      )}
    </section>
  );
};

export default ThreeTrainingSetsThreeGrips;
