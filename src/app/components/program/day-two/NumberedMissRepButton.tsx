import styles from './NumberedMissRepButton.module.css';
import {Dispatch, SetStateAction} from "react";

interface NumberedMissRepButtonProps {
  repCount: number;
  repsArrayState: number[];
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
}

const NumberedMissRepButton = ({
  repCount,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray,
}: NumberedMissRepButtonProps) => {

  function handlClick() {
    setStateForReps(repCount);
    setStateForRepsArray([
      ...repsArrayState,
      repCount
    ]);
  };

  return (
    <button
      className={styles.repButton}
      onClick={handlClick}
    >
      {repCount}
    </button>
  )
};

export default NumberedMissRepButton;
