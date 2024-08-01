import { Dispatch, SetStateAction } from "react";
import styles from './RepsActionButton.module.css';

interface RepsCompleteButtonProps {
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
  repsArrayState: number[];
  reps: number;
}

const RepsCompleteButton = ({ setStateForRepsArray, repsArrayState, reps }: RepsCompleteButtonProps) => {

  function handleComplete() {
    setStateForRepsArray(
      [
        ...repsArrayState,
        reps
      ]
    );
  };

  return (
    <button
      type='button'
      onClick={handleComplete}
      className={`${styles.button} ${styles.completeButton}`}
    >
      COMPLETED
    </button>
  )
};

export default RepsCompleteButton;
