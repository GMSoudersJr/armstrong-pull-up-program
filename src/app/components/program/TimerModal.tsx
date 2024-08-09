import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './TimerModal.module.css';
import {isSingular} from '@/utils';

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


  useEffect(() => {
    if (secondsLeft === 0) {
      setStateForShowTimerModal(false);
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft => secondsLeft - 1);
    }, 1_000);

    return () => {
      clearInterval(intervalId);
    }
  }, [secondsLeft, setStateForShowTimerModal]);

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
          <p>
            {secondsLeft > 0 && `Next set in ${secondsLeft} ${isSingular(secondsLeft) ? 'second!' : 'seconds'}`}
          </p>
        </div>
      </div>
    </div>
  )
};

export default TimerModal;
