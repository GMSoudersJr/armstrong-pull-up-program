import {Dispatch, SetStateAction} from "react";
import styles from './ActionButton.module.css';
import {checkMarkButtonEmoji} from "@/emojis";

interface RepsCompleteButtonProps {
  repsState: number;
  repsArrayState: number[];
  showTimerModalState: boolean;
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
  setStateForShowTimerModal: Dispatch<SetStateAction<boolean>>;
}

const RepsCompleteButton = ({
  repsState,
  repsArrayState,
  setStateForReps,
  showTimerModalState,
  setStateForRepsArray,
  setStateForShowTimerModal
}: RepsCompleteButtonProps) => {

  function handleClick() {
    const pyramidBrickNumber = repsState + 1;

    setStateForRepsArray(
      [
        ...repsArrayState,
        pyramidBrickNumber
      ]
    );

    setStateForReps(repsState => repsState + 1);

    setStateForShowTimerModal(true);
  }

  return (
    <button
      className={styles.pyramidActionButton}
      onClick={handleClick}
      disabled={showTimerModalState}
    >
      {checkMarkButtonEmoji}
    </button>
  )
};

export default RepsCompleteButton;
