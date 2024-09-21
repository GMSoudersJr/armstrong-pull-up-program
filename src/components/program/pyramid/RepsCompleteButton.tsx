import {Dispatch, SetStateAction} from "react";
import styles from './ActionButton.module.css';
import {CircleCheckIcon} from "lucide-react";

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
      type="button"
      className={`${styles.pyramidActionButton} actionButton`}
      onClick={handleClick}
      disabled={showTimerModalState}
    >
      <CircleCheckIcon className={styles.icon}/>
    </button>
  )
};

export default RepsCompleteButton;
