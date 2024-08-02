import { Dispatch, SetStateAction } from "react";
import styles from './RepsActionButton.module.css';

interface RepsCompleteButtonProps {
  reps: number;
  repsArrayState: number[];
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
}

const RepsCompleteButton = ({
  reps,
  repsArrayState,
  setStateForRepsArray,
}: RepsCompleteButtonProps) => {

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
