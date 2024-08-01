import { Dispatch, SetStateAction } from "react";
import styles from './RepsActionButton.module.css';

interface RepsCompleteButtonProps {
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
  repsArrayState: number[];
}

const RepsRemoveButton = ({ setStateForRepsArray, repsArrayState }: RepsCompleteButtonProps) => {

  function handleRemove() {
    setStateForRepsArray(repsArrayState.slice(0, -1));
  }

  return (
    <button
      type='button'
      onClick={handleRemove}
      className={`${styles.button} ${styles.removeButton}`}
    >
      REMOVE
    </button>
  )
};

export default RepsRemoveButton;

