import { Metadata } from 'next';
import styles from './page.module.css';
import { DAYS } from '@/const';
import FiveMaxEffortSets from '@/components/program/fiveMaxEffortSets/FiveMaxEffortSets';
import Pyramid from '@/components/program/pyramid/Pyramid';
import ThreeTrainingSetsThreeGrips from '@/components/program/threeTrainingSetsThreeGrips/ThreeTrainingSetsThreeGrips';
import MaxTrainingSets from '@/components/program/maxTrainingSets/MaxTrainingSets';
import RepeatDay from '@/components/program/repeatDay/RepeatDay';

export const metadata: Metadata = {
  title: "Program | Armstrong Pull-up Program",
  description: "Choose which day of the program to begin."
}

const DayNumberPage = ({ params }: { params: { day: string } }) => {

  console.log("dayNumber", params);
  const { day } = params;
  const dayNumber = Number(day);

  return (
    <>
      {dayNumber === 1 && <FiveMaxEffortSets dayNumber={dayNumber} />}
      {dayNumber === 2 && <Pyramid dayNumber={dayNumber} />}
      {dayNumber === 3 && <ThreeTrainingSetsThreeGrips dayNumber={dayNumber} />}
      {dayNumber === 4 && <MaxTrainingSets dayNumber={dayNumber} />}
      {dayNumber === 5 && <RepeatDay dayNumber={dayNumber} />}
    </>
  )
}

export default DayNumberPage;
