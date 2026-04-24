import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./TimerModal.module.css";
import { isSingular } from "@/utils";
import { nunito, ptSans } from "@/fonts";
import { XIcon } from "lucide-react";

interface TimerModalProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  recoveryTime: number;
  setStateForShowTimerModal: Dispatch<SetStateAction<boolean>>;
}

const TimerModal = ({
  onClose,
  recoveryTime,
  setStateForShowTimerModal,
}: TimerModalProps) => {
  const [secondsLeft, setSecondsLeft] = useState(recoveryTime);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (secondsLeft === 0) {
      const beep = new Audio("/audio/timer-beep.mp3");
      beep.volume = 0.1;
      beep.play().catch(() => {});
      setStateForShowTimerModal(false);
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
    }, 1_000);

    return () => {
      clearInterval(intervalId);
    };
  }, [secondsLeft, setStateForShowTimerModal]);

  return (
    <div
      id="timer-modal"
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-label="Recovery timer"
    >
      <div id="timer-modal-content" className={styles.modalContent}>
        <div id="timer-modal-heading-container" className={styles.timer}>
          <h1 style={nunito.style}>Recovery</h1>
          <h2 style={ptSans.style}>
            {secondsLeft > 0 &&
              `Next set in ${secondsLeft} ${isSingular(secondsLeft) ? "second!" : "seconds"}`}
          </h2>
        </div>
        <button
          id="timer-modal-close-button"
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close timer"
        >
          <XIcon className={styles.icon} />
          <span className="visibly-hidden">close timer</span>
        </button>
      </div>
    </div>
  );
};

export default TimerModal;
