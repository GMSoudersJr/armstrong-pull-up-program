import { Dispatch, SetStateAction } from "react";
import styles from './RepsActionButton.module.css';
import {counterClockwiseArrowsButtonEmoji} from "@/emojis";

interface RepsRemoveButtonProps {
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
  repsArrayState: number[];
}

const RepsRemoveButton = ({ setStateForRepsArray, repsArrayState }: RepsRemoveButtonProps) => {

  function handleRemove() {
    setStateForRepsArray(repsArrayState.slice(0, -1));
  }

  return (
    <button
      type='button'
      onClick={handleRemove}
      className={`${styles.button} ${styles.removeButton}`}
    >
      {counterClockwiseArrowsButtonEmoji}
    </button>
  )
};

export default RepsRemoveButton;

