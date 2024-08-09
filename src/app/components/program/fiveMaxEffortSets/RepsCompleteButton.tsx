import { Dispatch, SetStateAction, useState } from "react";
import styles from './RepsActionButton.module.css';
import {checkMarkButtonEmoji} from "@/emojis";

interface RepsCompleteButtonProps {
  reps: number;
  repsArrayState: number[];
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
  setStateForShowTimerModal: Dispatch<SetStateAction<boolean>>;
  showTimerModalState: boolean;
}


const RepsCompleteButton = ({
  reps,
  repsArrayState,
  setStateForRepsArray,
  setStateForShowTimerModal,
  showTimerModalState
}: RepsCompleteButtonProps) => {

  function handleComplete() {
    setStateForRepsArray(
      [
        ...repsArrayState,
        reps
      ]
    );

    setStateForShowTimerModal(true);

  };

  return (
    <>
      <button
        type='button'
        onClick={handleComplete}
        className={`${styles.button} ${styles.completeButton}`}
        disabled={showTimerModalState}
      >
        {checkMarkButtonEmoji}
      </button>
    </>
  );
};

export default RepsCompleteButton;
