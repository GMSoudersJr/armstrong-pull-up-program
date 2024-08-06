import styles from '@/components/program/pyramid/NumberedMissRepButton.module.css';
import {Dispatch, SetStateAction} from "react";

interface NumberedMissRepButtonProps {
  onMissed: Dispatch<SetStateAction<boolean>>;
  repCount: number;
  repsArrayState: number[];
  setStateForShowModal: Dispatch<SetStateAction<boolean>>;
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
}

const NumberedMissRepButton = ({
  setStateForShowModal,
  onMissed,
  repCount,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray,
}: NumberedMissRepButtonProps) => {

  function handleClick() {

    setStateForReps(repCount);

    setStateForRepsArray([
      ...repsArrayState,
      repCount
    ]);

    setStateForShowModal(false);

    onMissed(true);
  };

  return (
    <button
      className={styles.repButton}
      onClick={handleClick}
    >
      {repCount}
    </button>
  )
};

export default NumberedMissRepButton;
