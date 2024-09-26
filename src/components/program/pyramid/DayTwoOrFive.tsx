import styles from "./DayTwoOrFive.module.css";
import Pyramid from "@/components/program/pyramid/Pyramid";
import DayHeadings from "@/components/program/DayHeadings";
import { TDayNumber } from "@/definitions";

interface DayTwoOrFiveProps {
  dayNumber: TDayNumber;
}

const DayTwoOrFive = ({ dayNumber }: DayTwoOrFiveProps) => {
  return (
    <>
      {dayNumber === 5 ? (
        <Pyramid dayNumber={dayNumber} />
      ) : (
        <main className={styles.main}>
          <DayHeadings dayNumber={dayNumber} />
          <Pyramid dayNumber={dayNumber} />
        </main>
      )}
    </>
  );
};

export default DayTwoOrFive;
