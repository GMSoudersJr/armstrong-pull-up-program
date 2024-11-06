import { Dispatch, SetStateAction } from "react";
import styles from "./RepsActionButton.module.css";
import { EraserIcon } from "lucide-react";

interface RepsRemoveButtonProps {
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
  repsArrayState: number[];
  showTimerModalState: boolean;
  savedDay: boolean;
}

const RepsRemoveButton = ({
  setStateForRepsArray,
  repsArrayState,
  savedDay,
  showTimerModalState,
}: RepsRemoveButtonProps) => {
  function handleRemove() {
    setStateForRepsArray(repsArrayState.slice(0, -1));
  }

  return (
    <button
      id="reps-remove-button"
      title="Erase previous set"
      type="button"
      onClick={handleRemove}
      className={`${styles.button} ${styles.removeButton} actionButton`}
      disabled={showTimerModalState || savedDay || repsArrayState.length === 0}
    >
      <EraserIcon className={styles.icon} />
    </button>
  );
};

export default RepsRemoveButton;
