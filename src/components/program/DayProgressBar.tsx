import { TDayAbbreviation } from "@/definitions";
import styles from "./DayProgressBar.module.css";

interface DayProgressBarProps {
  dayAbbreviation: TDayAbbreviation;
  currentSetNumber: number;
  maxSetNumber: number;
}

const DayProgessBar = ({
  dayAbbreviation,
  currentSetNumber,
  maxSetNumber,
}: DayProgressBarProps) => {
  return (
    <progress
      id="day-progress"
      className={
        currentSetNumber === 0 ? `${styles.progressZero}` : `${styles.progress}`
      }
      value={currentSetNumber}
      max={maxSetNumber}
      aria-label={`Progress for ${dayAbbreviation}`}
    ></progress>
  );
};

export default DayProgessBar;
