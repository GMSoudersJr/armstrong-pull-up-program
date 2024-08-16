'use client';

import { useState } from 'react';
import styles from './Program.module.css';
import FiveMaxEffortSets from '@/components/program/fiveMaxEffortSets/FiveMaxEffortSets';
import Pyramid from '@/components/program/pyramid/Pyramid';
import ThreeTrainingSetsThreeGrips from '@/components/program/threeTrainingSetsThreeGrips/ThreeTrainingSetsThreeGrips';
import MaxTrainingSets from '@/components/program/maxTrainingSets/MaxTrainingSets';
import { DAYS } from '@/const';
import ChooseProgramDayButton from '@/components/program/ChooseProgramDayButton';
import RepeatDay from './repeatDay/RepeatDay';
import IDB from '@/data/indexedDB';

const Program = () => {

  const [programDayNumber, setProgramDayNumber] = useState(0);
  IDB();

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
                <ChooseProgramDayButton
                  key={day.name}
                  name={day.name}
                  dayNumber={day.number}
                  setStateForProgramDayNumber={setProgramDayNumber}
                />
              )
            })}
          </div>
        </>
      ) : (
        <>
          <div className={styles.headingContainer}>
            <h1>{DAYS.filter((day) => day.number === programDayNumber)[0].label}</h1>
            <h2>{DAYS.filter((day) => day.number === programDayNumber)[0].heading2}</h2>
            <h3>{DAYS.filter((day) => day.number === programDayNumber)[0].heading3}</h3>
          </div>
          {programDayNumber === 1 && <FiveMaxEffortSets />}
          {programDayNumber === 2 && <Pyramid />}
          {programDayNumber === 3 && <ThreeTrainingSetsThreeGrips />}
          {programDayNumber === 4 && <MaxTrainingSets />}
          {programDayNumber === 5 && <RepeatDay />}
        </>
      )}
    </>
  )
}

export default Program;
