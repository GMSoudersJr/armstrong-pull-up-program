import {ptSans} from '@/fonts';
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

  function handleClick() {

    setStateForReps(repCount);

    setStateForRepsArray([
      ...repsArrayState,
      repCount
    ]);

    setStateForShowTimerModal(true);

    onMissed(false);

    setStateForMaxNumbers(true);

  };

  return (
    <>
      <button
        type='button'
        className={styles.repButton}
        style={ptSans.style}
        onClick={handleClick}
        disabled={showTimerModalState}
      >
        {repCount}
      </button>
    </>
  )
};

export default NumberedMissRepButton;
