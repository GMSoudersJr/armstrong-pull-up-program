"use client";

import styles from "./Program.module.css";
import { useState, useEffect } from "react";
import { DAYS } from "@/const";
import { PageLink } from "../PageLink";
import { track } from "@/lib/track";
import { getLastCompletedDay } from "@/indexedDBActions";
import { dbInitialized } from "@/data/indexedDB";
import { nunito } from "@/fonts";
import SkipDayButton from "./SkipDayButton";
import { Dispatch, SetStateAction } from "react";

const heading = "TODAY'S WORKOUT";

interface ProgramProps {
  setStateForUpdatePastWorkouts: Dispatch<SetStateAction<number>>;
}

const Program = ({ setStateForUpdatePastWorkouts }: ProgramProps) => {
  const [programDayNumber, setProgramDayNumber] = useState(0);

  useEffect(() => {
    let isMounted = true;

    // iOS PWAs launched cold from the home screen can hang on
    // indexedDB.open() before ever calling onsuccess/onerror. Without this
    // fallback, programDayNumber stays 0 forever and no day/skip buttons
    // ever render, leaving the user with nothing to tap.
    const fallbackTimer = setTimeout(() => {
      if (isMounted) {
        setProgramDayNumber(1);
        setStateForUpdatePastWorkouts(1);
      }
    }, 3000);

    dbInitialized
      .then(() => getLastCompletedDay())
      .then((value) => {
        clearTimeout(fallbackTimer);
        if (isMounted) {
          setProgramDayNumber(value + 1);
          setStateForUpdatePastWorkouts(value + 1);
        }
      })
      .catch((error) => {
        console.warn(error);
        clearTimeout(fallbackTimer);
        if (isMounted) {
          setProgramDayNumber(1);
          setStateForUpdatePastWorkouts(1);
        }
      });

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
    };
  }, [setStateForUpdatePastWorkouts]);

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
              setStateForUpdatePastWorkouts={setStateForUpdatePastWorkouts}
            />
            <PageLink
              path={day.path}
              label={day.label}
              onClick={() => track("workout-start")}
            />
          </section>
        );
      })}
    </section>
  );
};

export default Program;
