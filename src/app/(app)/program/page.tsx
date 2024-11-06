"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

const PastWorkouts = dynamic(
  () => import("@/components/program/PastWorkouts"),
  { ssr: false },
);

const Program = dynamic(() => import("@/components/program/Program"), {
  ssr: false,
});

const ProgramPage = () => {
  const [updatePastWorkouts, setUpdatePastWorkouts] = useState(0);

  useEffect(() => {}, [updatePastWorkouts]);

  return (
    <main className={styles.main} role="main">
      <PastWorkouts updatePastWorkouts={updatePastWorkouts} />
      <Program setStateForUpdatePastWorkouts={setUpdatePastWorkouts} />
    </main>
  );
};

export default ProgramPage;
