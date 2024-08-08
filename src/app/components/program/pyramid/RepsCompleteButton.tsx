import {Dispatch, SetStateAction, useState} from "react";
import styles from './RepsCompleteButton.module.css';
import {checkMarkButtonEmoji} from "@/emojis";
import {createPortal} from "react-dom";
import TimerModal from "../TimerModal";

interface RepsCompleteButtonProps {
  repsState: number;
  repsArrayState: number[];
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
}

const RepsCompleteButton = ({
  repsState,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray
}: RepsCompleteButtonProps) => {

  const [showTimerModal, setShowTimerModal] = useState(false);
  const [recoveryTime, setRecoveryTime] = useState(0);

  function handleClick() {
    setRecoveryTime(10 * repsState);
    setStateForRepsArray(
      [
        ...repsArrayState,
        repsState
      ]
    );
    setStateForReps(repsState => repsState + 1);
    setShowTimerModal(true);
  }

  return (
    <>
      <button
        className={styles.completeButton}
        onClick={handleClick}
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
  )
};

export default RepsCompleteButton;
