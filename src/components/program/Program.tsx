"use client";

import styles from "./Program.module.css";
import { useState, useEffect } from "react";
import { DAYS } from "@/const";
import { PageLink } from "../PageLink";
import { getLastCompletedDay } from "@/indexedDBActions";
import { initializeIDB } from "@/data/indexedDB";
import { nunito } from "@/fonts";
import SkipDayButton from "./SkipDayButton";
import { Dispatch, SetStateAction } from "react";

const heading = "TODAY'S WORKOUT";

interface ProgramProps {
  setStateForUpdatePastWorkouts: Dispatch<SetStateAction<number>>;
}

const Program = ({ setStateForUpdatePastWorkouts }: ProgramProps) => {
  initializeIDB();

  const [programDayNumber, setProgramDayNumber] = useState(0);

  useEffect(() => {
    getLastCompletedDay()
      .then((value) => {
        setProgramDayNumber(value + 1);
        setStateForUpdatePastWorkouts(value + 1);
      })
      .catch((error) => console.warn(error));
  }, [programDayNumber, setStateForUpdatePastWorkouts]);

  const currentProgramDay = DAYS.filter(
    (day) => day.number === programDayNumber,
  );

  return (
    <section className={styles.sectionContainer}>
      <h2 style={nunito.style}>{heading}</h2>
      {currentProgramDay.map((day) => {
        return (
          <section className={styles.workoutDecisionSection} key={day.name}>
            <SkipDayButton
              dayNumber={day.number}
              setStateForProgramDayNumber={setProgramDayNumber}
            />
            <PageLink path={day.path} label={day.label} />
          </section>
        );
      })}
    </section>
  );
};

export default Program;
