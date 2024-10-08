import { TDayNumber } from "@/definitions";
import styles from "./DayHeadings.module.css";
import { DAYS } from "@/const";
import { nunito } from "@/fonts";
import DailyHintButton from "@/components/program/DailyHintButton";

interface DayHeadingsProps {
  dayNumber: TDayNumber;
  mostDifficultDay?: number;
}

const DayHeadings = ({ dayNumber, mostDifficultDay }: DayHeadingsProps) => {
  return (
    <>
      {mostDifficultDay ? (
        <div className={styles.headingsContainer}>
          <h1 style={nunito.style}>
            {DAYS.filter((day) => day.number === dayNumber)[0].label}
          </h1>
          <h2 style={nunito.style}>
            {DAYS.filter((day) => day.number === mostDifficultDay)[0].heading2}
          </h2>
          <h3 style={nunito.style}>
            {DAYS.filter((day) => day.number === mostDifficultDay)[0].heading3}
          </h3>
          <DailyHintButton dayNumber={mostDifficultDay} />
        </div>
      ) : (
        <div className={styles.headingsContainer}>
          <h1 style={nunito.style}>
            {DAYS.filter((day) => day.number === dayNumber)[0].label}
          </h1>
          <h2 style={nunito.style}>
            {DAYS.filter((day) => day.number === dayNumber)[0].heading2}
          </h2>
          <h3 style={nunito.style}>
            {DAYS.filter((day) => day.number === dayNumber)[0].heading3}
          </h3>
          <DailyHintButton dayNumber={dayNumber} />
        </div>
      )}
    </>
  );
};

export default DayHeadings;
