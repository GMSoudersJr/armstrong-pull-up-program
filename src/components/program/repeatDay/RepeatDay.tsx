'use client';

import styles from './RepeatDay.module.css';
import { useState } from 'react';
import { DAYS } from '@/const';
import RepeatDayButton from '@/components/program/repeatDay/RepeatDayButton';
import {TDayNumber} from '@/definitions';
import DayHeadings from '../DayHeadings';
import DayOneOrFive from '../fiveMaxEffortSets/DayOneOrFive';
import DayTwoOrFive from '../pyramid/DayTwoOrFive';
import DayThreeOrFive from '../threeTrainingSetsThreeGrips/DayThreeOrFive';
import DayFourOrFive from '../maxTrainingSets/DayFourOrFive';

interface RepeatDayProps {
  dayNumber: TDayNumber;
}

const RepeatDay = ({ dayNumber }: RepeatDayProps) => {

  const REPEATABLE_DAYS = DAYS.slice(0, 4);
  const [mostDifficultDay, setMostDifficultDay] = useState(0);

  return (
    <main className={styles.main}>
      {!mostDifficultDay ? (
        <>
          <DayHeadings dayNumber={dayNumber} />
          <div className={styles.repeatButtonContainer}>
            {REPEATABLE_DAYS.map((day, i) => {
              return (
                <RepeatDayButton
                  key={day.path}
                  name={day.name}
                  setStateForMostDifficultDay={setMostDifficultDay}
                  dayNumber={i + 1}
                />
              )
            })}
          </div>
        </>
      ) : (
        <>
          <DayHeadings
            dayNumber={dayNumber}
            mostDifficultDay={mostDifficultDay}
          />
          <div className={styles.mostDifficultDayContainer}>
            {mostDifficultDay === 1 && <DayOneOrFive dayNumber={dayNumber}/>}
            {mostDifficultDay === 2 && <DayTwoOrFive dayNumber={dayNumber}/>}
            {mostDifficultDay === 3 && <DayThreeOrFive dayNumber={dayNumber}/>}
            {mostDifficultDay === 4 && <DayFourOrFive dayNumber={dayNumber}/>}
          </div>
        </>

      )}
    </main>
  );
};

export default RepeatDay;
