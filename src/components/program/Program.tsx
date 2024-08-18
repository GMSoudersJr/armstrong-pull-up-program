'use client';

import { useState, useEffect } from 'react';
import { DAYS } from '@/const';
import {PageLink} from '../PageLink';
import { getLastCompletedDay } from '@/indexedDBActions';
import {initializeIDB} from '@/data/indexedDB';

const Program = () => {
  initializeIDB();

  const [programDayNumber, setProgramDayNumber] = useState(0);

  useEffect(() => {
    getLastCompletedDay()
    .then(value => setProgramDayNumber(value + 1))
    .catch(error => console.warn(error));
  }, [programDayNumber]);

  const currentProgramDay = DAYS.filter((day) => day.number === programDayNumber);

  return (
    <>
      {currentProgramDay.map(day => {
        return (
          <PageLink
            key={day.name}
            path={`/program/${day.number}`}
            label={day.label}
          />
        )
      })}
    </>
  )
}

export default Program;
