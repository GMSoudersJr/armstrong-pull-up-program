import { useEffect } from "react";
import { TriangleAlertIcon } from "lucide-react";
import { nunito, ptSans } from "@/fonts";
import styles from "./ResetProgramModal.module.css";

interface ResetProgramModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ResetProgramModal = ({ onClose, onConfirm }: ResetProgramModalProps) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      id="reset-program-modal"
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-heading"
    >
      <div id="reset-program-modal-content" className={styles.dialog}>
        <TriangleAlertIcon className={styles.icon} />
        <h2 id="reset-modal-heading" style={nunito.style} className={styles.heading}>
          Reset Program?
        </h2>
        <p className={styles.message} style={ptSans.style}>
          This will erase all your workouts and progress. This cannot be undone.
        </p>
        <div className={styles.actions}>
          <button
            id="reset-modal-cancel-button"
            type="button"
            className={styles.cancelButton}
            style={nunito.style}
            onClick={onClose}
            aria-label="Cancel reset"
          >
            Cancel
          </button>
          <button
            id="reset-modal-confirm-button"
            type="button"
            className={styles.resetButton}
            style={nunito.style}
            onClick={onConfirm}
            aria-label="Confirm reset"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetProgramModal;
