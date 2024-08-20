'use client';

import styles from './RepeatDay.module.css';
import { useState } from 'react';
import FiveMaxEffortSets from '@/components/program/fiveMaxEffortSets/FiveMaxEffortSets';
import Pyramid from '@/components/program/pyramid/Pyramid';
import ThreeTrainingSetsThreeGrips from '@/components/program/threeTrainingSetsThreeGrips/ThreeTrainingSetsThreeGrips';
import MaxTrainingSets from '@/components/program/maxTrainingSets/MaxTrainingSets';
import { DAYS } from '@/const';
import RepeatDayButton from '@/components/program/repeatDay/RepeatDayButton';
import {TDayNumber} from '@/definitions';
import DayHeadings from '../DayHeadings';

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
            {mostDifficultDay === 1 && <FiveMaxEffortSets dayNumber={dayNumber}/>}
            {mostDifficultDay === 2 && <Pyramid dayNumber={dayNumber}/>}
            {mostDifficultDay === 3 && <ThreeTrainingSetsThreeGrips dayNumber={dayNumber}/>}
            {mostDifficultDay === 4 && <MaxTrainingSets dayNumber={dayNumber}/>}
          </div>
        </>

      )}
    </main>
  );
};

export default RepeatDay;
