import { Dispatch, SetStateAction } from "react";
import styles from './RepsActionButton.module.css';
import {lastTrackButtonEmoji} from "@/emojis";
import {notoColorEmoji} from "@/fonts";

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
  showTimerModalState
}: RepsRemoveButtonProps) => {

  function handleRemove() {
    setStateForRepsArray(repsArrayState.slice(0, -1));
  }

  return (
    <button
      type='button'
      onClick={handleRemove}
      className={`${styles.button} ${styles.removeButton}`}
      style={notoColorEmoji.style}
      disabled={showTimerModalState || savedDay}
    >
      {lastTrackButtonEmoji}
    </button>
  )
};

export default RepsRemoveButton;

