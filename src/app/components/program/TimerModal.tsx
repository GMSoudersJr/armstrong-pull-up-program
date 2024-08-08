import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './TimerModal.module.css';

interface TimerModalProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  recoveryTime: number;
  setStateForShowTimerModal: Dispatch<SetStateAction<boolean>>;
}

const TimerModal = ({
  onClose,
  recoveryTime,
  setStateForShowTimerModal
}: TimerModalProps) => {

  const [secondsLeft, setSecondsLeft] = useState(recoveryTime);

  if (secondsLeft <= 0) setStateForShowTimerModal(false);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft => secondsLeft - 1);
    }, 1_000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <div id="timerModal" className={styles.modal}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={onClose}
        >
          &times;
        </button>
        <div>
          <h1>
            {secondsLeft > 0 && `Next set in ${secondsLeft} seconds`}
          </h1>
        </div>
      </div>
    </div>
  )
};

export default TimerModal;
