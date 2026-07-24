import { useEffect } from "react";
import { TriangleAlertIcon } from "lucide-react";
import { nunito, ptSans } from "@/fonts";
import styles from "./ExitWorkoutModal.module.css";

interface ExitWorkoutModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ExitWorkoutModal = ({ onClose, onConfirm }: ExitWorkoutModalProps) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      id="exit-workout-modal"
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-workout-modal-heading"
    >
      <div id="exit-workout-modal-content" className={styles.dialog}>
        <TriangleAlertIcon className={styles.icon} />
        <h2
          id="exit-workout-modal-heading"
          style={nunito.style}
          className={styles.heading}
        >
          Leave Workout?
        </h2>
        <p className={styles.message} style={ptSans.style}>
          Your progress on this workout hasn&apos;t been saved yet. If you leave
          now, it will be lost.
        </p>
        <div className={styles.actions}>
          <button
            id="exit-workout-modal-cancel-button"
            type="button"
            className={styles.cancelButton}
            style={nunito.style}
            onClick={onClose}
            aria-label="Cancel leaving workout"
          >
            Cancel
          </button>
          <button
            id="exit-workout-modal-confirm-button"
            type="button"
            className={styles.leaveButton}
            style={nunito.style}
            onClick={onConfirm}
            aria-label="Confirm leave workout"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitWorkoutModal;
