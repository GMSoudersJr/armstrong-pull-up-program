'use client';

import styles from './RepeatDay.module.css';
import { useState } from 'react';
import FiveMaxEffortSets from '@/components/program/fiveMaxEffortSets/FiveMaxEffortSets';
import Pyramid from '@/components/program/pyramid/Pyramid';
import ThreeTrainingSetsThreeGrips from '@/components/program/threeTrainingSetsThreeGrips/ThreeTrainingSetsThreeGrips';
import MaxTrainingSets from '@/components/program/maxTrainingSets/MaxTrainingSets';
import { DAYS } from '@/const';
import RepeatDayButton from '@/components/program/repeatDay/RepeatDayButton';

interface RepeatDayProps {
  dayNumber: number;
}

const RepeatDay = ({ dayNumber }: RepeatDayProps) => {

  const repeatableDays = DAYS.slice(0, 4);
  const [mostDifficultDay, setMostDifficultDay] = useState(0);

  return (
    <main className={styles.main}>
      {!mostDifficultDay ? (
        <>
          <div className={styles.headingContainer}>
            <h1>{DAYS.filter((day) => day.number === dayNumber)[0].label}</h1>
            <h2>{DAYS.filter((day) => day.number === dayNumber)[0].heading2}</h2>
            <h3>{DAYS.filter((day) => day.number === dayNumber)[0].heading3}</h3>
          </div>

          <div className={styles.repeatButtonContainer}>
            {repeatableDays.map((day, i) => {
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
          <div className={styles.headingContainer}>
            <h1>{DAYS.filter((day) => day.number === dayNumber)[0].label}</h1>
            <h2>{DAYS.filter((day) => day.number === mostDifficultDay)[0].heading2}</h2>
            <h3>{DAYS.filter((day) => day.number === mostDifficultDay)[0].heading3}</h3>
          </div>

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
