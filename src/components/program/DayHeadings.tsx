import {TDayNumber} from '@/definitions';
import styles from './DayHeadings.module.css';
import { DAYS } from "@/const";

interface DayHeadingsProps {
  dayNumber: TDayNumber;
  mostDifficultDay?: number;
}

const DayHeadings = ({ dayNumber, mostDifficultDay }: DayHeadingsProps) => {

  return (
    <>
      {mostDifficultDay ? (
        <div className={styles.headingsContainer}>
          <h1>{DAYS.filter((day) => day.number === dayNumber)[0].label}</h1>
          <h2>{DAYS.filter((day) => day.number === mostDifficultDay)[0].heading2}</h2>
          <h3>{DAYS.filter((day) => day.number === mostDifficultDay)[0].heading3}</h3>
        </div>
      ) : (
        <div className={styles.headingsContainer}>
          <h1>{DAYS.filter((day) => day.number === dayNumber)[0].label}</h1>
          <h2>{DAYS.filter((day) => day.number === dayNumber)[0].heading2}</h2>
          <h3>{DAYS.filter((day) => day.number === dayNumber)[0].heading3}</h3>
        </div>
      )}
    </>
  )
};

export default DayHeadings;
