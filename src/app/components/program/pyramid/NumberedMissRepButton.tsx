import styles from './NumberedMissRepButton.module.css';
import {
  Dispatch,
  SetStateAction,
} from "react";

interface NumberedMissRepButtonProps {
  onMissed: Dispatch<SetStateAction<boolean>>;
  repCount: number;
  repsArrayState: number[];
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
  setStateForMaxNumbers: Dispatch<SetStateAction<boolean>>;
  showTimerModalState: boolean;
  setStateForShowTimerModal: Dispatch<SetStateAction<boolean>>;
}

const NumberedMissRepButton = ({
  onMissed,
  repCount,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray,
  setStateForMaxNumbers,
  showTimerModalState,
  setStateForShowTimerModal
}: NumberedMissRepButtonProps) => {

  const recoveryTime = 10 * repCount;

  function handleClick() {

    setStateForReps(repCount);

    setStateForRepsArray([
      ...repsArrayState,
      repCount
    ]);

    setStateForShowTimerModal(true);

    setTimeout(() => {
      setStateForMaxNumbers(true);
      onMissed(false);
    }, 1_000 * recoveryTime);

  };

  return (
    <>
      <button
        className={styles.repButton}
        onClick={handleClick}
        disabled={showTimerModalState}
      >
        {repCount}
      </button>
    </>
  )
};

export default NumberedMissRepButton;
