import styles from './DayOneOrFive.module.css';
import FiveMaxEffortSets from "@/components/program/fiveMaxEffortSets/FiveMaxEffortSets";
import DayHeadings from "@/components/program/DayHeadings";
import {TDayNumber} from '@/definitions';

interface DayOneOrFiveProps {
  dayNumber: TDayNumber;
}

const DayOneOrFive = ({ dayNumber }: DayOneOrFiveProps) => {

  return (
    <>
      {dayNumber === 5 ? (
        <FiveMaxEffortSets dayNumber={dayNumber} />
      ) : (
        <main className={styles.main}>
          <DayHeadings dayNumber={dayNumber} />
          <FiveMaxEffortSets dayNumber={dayNumber}/>
        </main>
      )}
    </>
  )
};

export default DayOneOrFive;
