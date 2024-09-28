import styles from "./DailyHintModal.module.css";
import { nunito, ptSans } from "@/fonts";
import { XIcon } from "lucide-react";
import { dailyHints } from "@/lib/hints";
import PullupSVG from "../PullupSVG";

interface DailyHintModalProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  dayNumber: number;
}

const DailyHintModal = ({ onClose, dayNumber }: DailyHintModalProps) => {
  const dailyHint = dailyHints.filter(
    (hint) => hint.dayNumber === dayNumber,
  )[0];

  return (
    <div id="dailyHintModal" className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.svgContainer}>
          <PullupSVG />
        </div>
        <h1 className={styles.headerText} style={nunito.style}>
          Hints
        </h1>
        <ol className={styles.hintList} style={ptSans.style}>
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
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <XIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default DailyHintModal;
