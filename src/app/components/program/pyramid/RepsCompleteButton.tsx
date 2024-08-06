import {Dispatch, SetStateAction} from "react";
import styles from './RepsCompleteButton.module.css';
import {checkMarkButtonEmoji} from "@/emojis";

interface RepsCompleteButtonProps {
  repsState: number;
  repsArrayState: number[];
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
}

const RepsCompleteButton = ({
  repsState,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray
}: RepsCompleteButtonProps) => {

  function handleClick() {
    setStateForRepsArray(
      [
        ...repsArrayState,
        repsState
      ]
    );
    setStateForReps(repsState => repsState + 1);
  }

  return (
    <button
      className={styles.completeButton}
      onClick={handleClick}
    >
      {checkMarkButtonEmoji}
    </button>
  )
};

export default RepsCompleteButton;