import { ptSans } from "@/fonts";
import styles from "./NumberedMissRepButton.module.css";
import { Dispatch, SetStateAction } from "react";
import { TGrip } from "@/definitions";

interface NumberedMissRepButtonProps {
  dayAbbreviation: "PYRA" | "3S3G" | "MXTS";
  onMissed: Dispatch<SetStateAction<boolean>>;
  showTimerModalState?: boolean;
  setStateForShowTimerModal?: Dispatch<SetStateAction<boolean>>;
  repCount: number;
  // PYRA
  repsArrayState?: number[];
  setStateForReps?: Dispatch<SetStateAction<number>>;
  setStateForRepsArray?: Dispatch<SetStateAction<number[]>>;
  setStateForMaxNumbers?: Dispatch<SetStateAction<boolean>>;
  // 3S3G
  completedSetCount?: number;
  completedGrips?: TGrip[];
  updateCompletedGrips?: Dispatch<SetStateAction<TGrip[]>>;
  currentGrip?: TGrip;
  updateCurrentGrip?: Dispatch<SetStateAction<TGrip>>;
  updateCompletedSetCount?: Dispatch<SetStateAction<number>>;
  updateTrainingSets?: Dispatch<SetStateAction<number[]>>;
  trainingSets?: number[];
  // MXTS
  updateDayComplete?: Dispatch<SetStateAction<boolean>>;
  updateCompletedTrainingSets?: Dispatch<SetStateAction<number[]>>;
  completedTrainingSets?: number[];
}

const NumberedMissRepButton = ({
  dayAbbreviation,
  onMissed,
  repCount,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray,
  setStateForMaxNumbers,
  showTimerModalState,
  setStateForShowTimerModal,
  completedSetCount,
  completedGrips,
  updateCompletedGrips,
  currentGrip,
  updateCurrentGrip,
  updateCompletedSetCount,
  updateTrainingSets,
  trainingSets,
  updateDayComplete,
  updateCompletedTrainingSets,
  completedTrainingSets,
}: NumberedMissRepButtonProps) => {
  function handleClick() {
    if (dayAbbreviation === "PYRA") {
      if (setStateForReps && repCount) setStateForReps(repCount);

      if (setStateForRepsArray && repsArrayState) {
        setStateForRepsArray([...repsArrayState, repCount]);
      }

      setStateForShowTimerModal && setStateForShowTimerModal(true);

      onMissed(false);

      if (setStateForMaxNumbers) setStateForMaxNumbers(true);
    }

    if (dayAbbreviation === "3S3G") {
      if (completedSetCount == 2 && completedGrips?.length == 2) {
        if (updateCompletedGrips && currentGrip) {
          updateCompletedGrips([...completedGrips, currentGrip]);
        }

        if (updateCurrentGrip) updateCurrentGrip("");
        onMissed(false);
      }

      if (
        completedSetCount === 0 ||
        (completedSetCount && completedSetCount <= 2)
      ) {
        if (updateCompletedSetCount)
          updateCompletedSetCount((completedSetCount) => completedSetCount + 1);

        if (updateTrainingSets && trainingSets)
          updateTrainingSets([...trainingSets, repCount]);

        setStateForShowTimerModal && setStateForShowTimerModal(true);
        onMissed(false);
      } else {
        if (updateCompletedGrips && completedGrips && currentGrip) {
          updateCompletedGrips([...completedGrips, currentGrip]);
        }

        if (updateCurrentGrip) updateCurrentGrip("");
        onMissed(false);
      }
    }

    if (dayAbbreviation === "MXTS") {
      if (updateCompletedTrainingSets && completedTrainingSets) {
        updateCompletedTrainingSets([...completedTrainingSets, repCount]);
      }

      updateDayComplete && updateDayComplete(true);
      onMissed(false);
    }
  }

  return (
    <>
      <button
        id={`miss-${repCount}`}
        type="button"
        className={styles.missSetNumberedButton}
        style={ptSans.style}
        onClick={handleClick}
        disabled={showTimerModalState}
      >
        {repCount}
      </button>
    </>
  );
};

export default NumberedMissRepButton;
