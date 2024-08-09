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

      ) : (
        <div className={styles.mostDifficultDayContainer}>
          <div className={styles.heading}>
            <h1>
              {repeatableDays.filter((day) => {
                return day.number === mostDifficultDay
              })[0].label.toUpperCase()}
            </h1>
            <h2>
              {repeatableDays.filter((day) => {
                return day.number === mostDifficultDay
              })[0].heading2.toUpperCase()}
            </h2>
            <h3>
              {repeatableDays.filter((day) => {
                return day.number === mostDifficultDay
              })[0].heading3.toUpperCase()}
            </h3>
          </div>
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
