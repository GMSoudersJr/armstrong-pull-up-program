import { Dispatch, SetStateAction, useState } from "react";
import styles from './RepsActionButton.module.css';
import {checkMarkButtonEmoji} from "@/emojis";
import {notoColorEmoji} from "@/fonts";

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

    if (repsArrayState.length < 4) setStateForShowTimerModal(true);

  };

  return (
    <>
      <button
        type='button'
        onClick={handleComplete}
        className={`${styles.button} ${styles.completeButton}`}
        style={notoColorEmoji.style}
        disabled={showTimerModalState}
      >
        {checkMarkButtonEmoji}
      </button>
    </>
  );
};

export default RepsCompleteButton;
