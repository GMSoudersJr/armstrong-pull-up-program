import { Dispatch, SetStateAction } from "react";
import styles from './RepsActionButton.module.css';
import {CircleCheckIcon} from "lucide-react";

interface RepsCompleteButtonProps {
  reps: number;
  repsArrayState: number[];
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
  setStateForShowTimerModal: Dispatch<SetStateAction<boolean>>;
  showTimerModalState: boolean;
}


const RepsCompleteButton = ({
  reps,
  repsArrayState,
  setStateForRepsArray,
  setStateForShowTimerModal,
  showTimerModalState
}: RepsCompleteButtonProps) => {

  function handleComplete() {
    setStateForRepsArray(
      [
        ...repsArrayState,
        reps
      ]
    );

    if (repsArrayState.length < 4) setStateForShowTimerModal(true);

  };

  return (
    <>
      <button
        type='button'
        onClick={handleComplete}
        className={`${styles.button} ${styles.completeButton} actionButton`}
        disabled={showTimerModalState}
      >
        <CircleCheckIcon className={styles.icon} />
      </button>
    </>
  );
};

export default RepsCompleteButton;
