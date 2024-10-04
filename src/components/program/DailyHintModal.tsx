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

  return (
    <div id="daily-hint-modal" className={styles.modal}>
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
        >
          <XIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default DailyHintModal;
