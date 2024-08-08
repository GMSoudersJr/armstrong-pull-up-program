import { Dispatch, SetStateAction, useState } from "react";
import styles from './RepsActionButton.module.css';
import {checkMarkButtonEmoji} from "@/emojis";
import {createPortal} from "react-dom";
import TimerModal from "../TimerModal";

interface RepsCompleteButtonProps {
  reps: number;
  repsArrayState: number[];
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
}

const recoveryTime = 90;

const RepsCompleteButton = ({
  reps,
  repsArrayState,
  setStateForRepsArray,
}: RepsCompleteButtonProps) => {
  
  const [showTimerModal, setShowTimerModal] = useState(false);

  function handleComplete() {
    setStateForRepsArray(
      [
        ...repsArrayState,
        reps
      ]
    );

    setShowTimerModal(true);

  };

  return (
    <>
      <button
        type='button'
        onClick={handleComplete}
        className={`${styles.button} ${styles.completeButton}`}
      >
        {checkMarkButtonEmoji}
      </button>
      {showTimerModal && createPortal(
        <TimerModal
          onClose={() => setShowTimerModal(false)}
          recoveryTime={recoveryTime}
          setStateForShowTimerModal={setShowTimerModal}
        />,
        document.body
      )}
    </>
  );
};

export default RepsCompleteButton;
