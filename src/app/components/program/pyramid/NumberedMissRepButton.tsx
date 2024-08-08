import {createPortal} from 'react-dom';
import styles from './NumberedMissRepButton.module.css';
import {
  Dispatch,
  SetStateAction,
  useState
} from "react";
import TimerModal from '../TimerModal';

interface NumberedMissRepButtonProps {
  onMissed: Dispatch<SetStateAction<boolean>>;
  repCount: number;
  repsArrayState: number[];
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
  setStateForMaxNumbers: Dispatch<SetStateAction<boolean>>;
}

const NumberedMissRepButton = ({
  onMissed,
  repCount,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray,
  setStateForMaxNumbers
}: NumberedMissRepButtonProps) => {

  const [showTimerModal, setShowTimerModal] = useState(false);

  const recoveryTime = 10 * repCount;

  function handleClick() {

    setStateForReps(repCount);

    setStateForRepsArray([
      ...repsArrayState,
      repCount
    ]);

    setShowTimerModal(true);

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
        disabled={showTimerModal}
      >
        {repCount}
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

export default NumberedMissRepButton;
