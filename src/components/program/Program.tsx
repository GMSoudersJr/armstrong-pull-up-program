'use client';

import { useState, useEffect } from 'react';
import styles from './Program.module.css';
import { DAYS } from '@/const';
import {PageLink} from '../PageLink';
import { getLastCompletedDay } from '@/indexedDBActions';

const Program = () => {

  const [programDayNumber, setProgramDayNumber] = useState(0);
  const lastCompletedDay = getLastCompletedDay();

  useEffect(() => {
    lastCompletedDay
    .then(value => setProgramDayNumber(value + 1))
    .catch(error => console.warn(error));
  }, []);

  const onlyDay = DAYS.filter((day) => day.number === programDayNumber);

  return (
    <>
      {!programDayNumber ? (
        <>
          <h1>
            CHOOSE YOUR DAY
          </h1>
          <div className={styles.chooseProgramDayButtonContainer}>
            {DAYS.map((day) => {
              return(
                <PageLink
                  key={day.name}
                  path={`/program/${day.number}`}
                  label={day.label}
                />
              )
            })}
          </div>
        </>
      ) : (
        <>
          {onlyDay.map(day => {
            return (
              <PageLink
                key={day.name}
                path={`/program/${day.number}`}
                label={day.label}
              />
            )
          }
          )}
        </>
      )}
    </>
  )
}

export default Program;
