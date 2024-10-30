"use client";

import { useState, useEffect } from "react";
import { DAYS } from "@/const";
import { PageLink } from "../PageLink";
import { getLastCompletedDay } from "@/indexedDBActions";
import { initializeIDB } from "@/data/indexedDB";
import { nunito } from "@/fonts";

const Program = () => {
  initializeIDB();

  const [programDayNumber, setProgramDayNumber] = useState(0);

  useEffect(() => {
    getLastCompletedDay()
      .then((value) => setProgramDayNumber(value + 1))
      .catch((error) => console.warn(error));
  }, [programDayNumber]);

  const currentProgramDay = DAYS.filter(
    (day) => day.number === programDayNumber,
  );

  return (
    <>
      <h2 style={nunito.style}>YOUR WORKOUT</h2>
      {currentProgramDay.map((day) => {
        return <PageLink key={day.name} path={day.path} label={day.label} />;
      })}
    </>
  );
};

export default Program;
