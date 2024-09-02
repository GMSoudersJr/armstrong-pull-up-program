import styles from './DayThreeOrFive.module.css';
import ThreeTrainingSetsThreeGrips from '@/components/program/threeTrainingSetsThreeGrips/ThreeTrainingSetsThreeGrips';
import DayHeadings from "@/components/program/DayHeadings";
import {TDayNumber} from '@/definitions';

interface DayThreeOrFiveProps {
  dayNumber: TDayNumber;
}

const DayThreeOrFive = ({ dayNumber }: DayThreeOrFiveProps) => {

  return (
    <>
      {dayNumber === 5 ? (
        <ThreeTrainingSetsThreeGrips dayNumber={dayNumber} />
      ) : (
        <main className={styles.main}>
          <DayHeadings dayNumber={dayNumber} />
          <ThreeTrainingSetsThreeGrips dayNumber={dayNumber}/>
        </main>
      )}
    </>
  )
};

export default DayThreeOrFive;
