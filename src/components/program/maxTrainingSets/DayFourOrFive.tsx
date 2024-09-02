import styles from './DayFourOrFive.module.css';
import MaxTrainingSets from '@/components/program/maxTrainingSets/MaxTrainingSets';
import DayHeadings from "@/components/program/DayHeadings";
import {TDayNumber} from '@/definitions';

interface DayFourOrFiveProps {
  dayNumber: TDayNumber;
}

const DayFourOrFive = ({ dayNumber }: DayFourOrFiveProps) => {

  return (
    <>
      {dayNumber === 5 ? (
        <MaxTrainingSets dayNumber={dayNumber} />
      ) : (
        <main className={styles.main}>
          <DayHeadings dayNumber={dayNumber} />
          <MaxTrainingSets dayNumber={dayNumber}/>
        </main>
      )}
    </>
  )
};

export default DayFourOrFive;

