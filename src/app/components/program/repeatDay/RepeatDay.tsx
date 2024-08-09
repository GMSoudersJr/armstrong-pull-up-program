'use client';

import styles from './RepeatDay.module.css';
import { useState } from 'react';
import FiveMaxEffortSets from '@/components/program/fiveMaxEffortSets/FiveMaxEffortSets';
import Pyramid from '@/components/program/pyramid/Pyramid';
import ThreeTrainingSetsThreeGrips from '@/components/program/threeTrainingSetsThreeGrips/ThreeTrainingSetsThreeGrips';
import MaxTrainingSets from '@/components/program/maxTrainingSets/MaxTrainingSets';
import { DAYS } from '@/const';
import RepeatDayButton from '@/components/program/repeatDay/RepeatDayButton';

const RepeatDay = () => {

  const repeatableDays = DAYS.slice(0, 4);
  const [mostDifficultDay, setMostDifficultDay] = useState(0);

  return (
    <div className={styles.repeatDayContainer}>

      {!mostDifficultDay ? (
        <section className={styles.repeatButtonContainer}>
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
        </section>

      ) : (
        <div className={styles.mostDifficultDayContainer}>
          <h2>
            {repeatableDays.filter((day) => {
              return day.number === mostDifficultDay
            })[0].name.toUpperCase()}
          </h2>

          {mostDifficultDay === 1 && <FiveMaxEffortSets />}
          {mostDifficultDay === 2 && <Pyramid />}
          {mostDifficultDay === 3 && <ThreeTrainingSetsThreeGrips />}
          {mostDifficultDay === 4 && <MaxTrainingSets />}

        </div>

      )}
    </div>
  );
};

export default RepeatDay;
