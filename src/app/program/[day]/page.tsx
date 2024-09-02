import { Metadata } from 'next';
import DayOneOrFive from '@/components/program/fiveMaxEffortSets/DayOneOrFive';
import DayTwoOrFive from '@/components/program/pyramid/DayTwoOrFive';
import DayThreeOrFive from '@/components/program/threeTrainingSetsThreeGrips/DayThreeOrFive';
import DayFourOrFive from '@/components/program/maxTrainingSets/DayFourOrFive';
import RepeatDay from '@/components/program/repeatDay/RepeatDay';

export const metadata: Metadata = {
  title: "Program | Armstrong Pull-up Program",
  description: "Choose which day of the program to begin."
}

const DayNumberPage = ({ params }: { params: { day: string } }) => {

  const { day } = params;
  const dayNumber = Number(day);

  return (
    <>
      {dayNumber === 1 && <DayOneOrFive dayNumber={dayNumber} />}
      {dayNumber === 2 && <DayTwoOrFive dayNumber={dayNumber} />}
      {dayNumber === 3 && <DayThreeOrFive dayNumber={dayNumber} />}
      {dayNumber === 4 && <DayFourOrFive dayNumber={dayNumber} />}
      {dayNumber === 5 && <RepeatDay dayNumber={dayNumber} />}
    </>
  )
}

export default DayNumberPage;
