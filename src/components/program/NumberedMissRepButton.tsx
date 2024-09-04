import {ptSans} from '@/fonts';
import styles from './NumberedMissRepButton.module.css';
import {
  Dispatch,
  SetStateAction,
} from "react";
import {TGrip} from '@/definitions';

interface NumberedMissRepButtonProps {
  dayAbbreviation: 'PYRA' | '3S3G' | 'MXTS';
  onMissed: Dispatch<SetStateAction<boolean>>;
  showTimerModalState: boolean;
  setStateForShowTimerModal: Dispatch<SetStateAction<boolean>>;
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
  trainingSets

}: NumberedMissRepButtonProps) => {

  function handleClick() {
    if (dayAbbreviation === 'PYRA') {
      if (setStateForReps && repCount) setStateForReps(repCount);

      if (setStateForRepsArray && repsArrayState) {
        setStateForRepsArray([
          ...repsArrayState,
          repCount
        ]);
      }

      setStateForShowTimerModal(true);

      onMissed(false);

      if (setStateForMaxNumbers) setStateForMaxNumbers(true);
    }

    if (dayAbbreviation === '3S3G') {

      console.table({
        completedGrips,
        completedSetCount,
        currentGrip,
        trainingSets,
      });

      if (completedSetCount == 2 && completedGrips?.length == 2) {
        if (updateCompletedGrips && currentGrip) {
          updateCompletedGrips([
            ...completedGrips,
            currentGrip
          ]);
        }

        if (updateCurrentGrip) updateCurrentGrip('');
        onMissed(false);

      }

      if (completedSetCount === 0 || completedSetCount && completedSetCount <= 2) {
        console.log("Here because less than 2 completed sets");

        if (updateCompletedSetCount) updateCompletedSetCount(completedSetCount => completedSetCount + 1);

        if (updateTrainingSets && trainingSets) updateTrainingSets([...trainingSets, repCount]);

        setStateForShowTimerModal(true);
        onMissed(false);

      } else {

        if (updateCompletedGrips && completedGrips && currentGrip) {
          updateCompletedGrips([
            ...completedGrips,
            currentGrip
          ]);
        }

        if (updateCurrentGrip) updateCurrentGrip('');
        onMissed(false);
      }
    }



    if (dayAbbreviation === 'MXTS') {

    }

  };

  return (
    <>
      <button
        type='button'
        className={styles.repButton}
        style={ptSans.style}
        onClick={handleClick}
        disabled={showTimerModalState}
      >
        {repCount}
      </button>
    </>
  )
};

export default NumberedMissRepButton;
