import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './TimerModal.module.css';
import {isSingular} from '@/utils';
import {ptSans} from '@/fonts';
import {XIcon} from 'lucide-react';

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
      const beep = new Audio('/audio/timer-beep.mp3');
      beep.play();
      beep.volume = 0.1;
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
        <div className={styles.timer}>
          <p style={ptSans.style}>
            {secondsLeft > 0 && `Next set in ${secondsLeft} ${isSingular(secondsLeft) ? 'second!' : 'seconds'}`}
          </p>
        </div>
        <button
          type='button'
          className={styles.closeButton}
          onClick={onClose}
        >
          <XIcon className={styles.icon} />
        </button>
      </div>
    </div>
  )
};

export default TimerModal;
