import { useEffect } from "react";
import styles from "./DailyHintModal.module.css";
import { nunito, ptSans } from "@/fonts";
import { XIcon } from "lucide-react";
import { DAILY_HINTS, HINT_MODAL_HEADING } from "@/lib/hints";
import PullupSVG from "../PullupSVG";

interface DailyHintModalProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  dayNumber: number;
}

const DailyHintModal = ({ onClose, dayNumber }: DailyHintModalProps) => {
  const dailyHint = DAILY_HINTS.filter(
    (hint) => hint.dayNumber === dayNumber,
  )[0];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose(e as unknown as React.MouseEvent<HTMLButtonElement>);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      id="daily-hint-modal"
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-label="Daily hint"
    >
      <div id="daily-hint-modal-content" className={styles.modalContent}>
        <div
          id="daily-hint-modal-svg-container"
          className={styles.svgContainer}
        >
          <PullupSVG />
        </div>
        <h2 className={styles.headerText} style={nunito.style}>
          {HINT_MODAL_HEADING}
        </h2>
        <ol
          id="daily-hint-modal-list"
          className={styles.hintList}
          style={ptSans.style}
        >
          {dailyHint.hints.map((hint, i) => {
            return (
              <li key={`${hint[i]}-${i}`}>
                {typeof hint === "string" ? (
                  hint
                ) : (
                  <>
                    {hint[0]}
                    <ol>
                      {hint.map((detail, i) => {
                        if (i === 0) return;
                        return <li key={detail}>{detail}</li>;
                      })}
                    </ol>
                  </>
                )}
              </li>
            );
          })}
        </ol>
        <button
          id="daily-hint-modal-close-button"
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close hint"
        >
          <XIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default DailyHintModal;
