"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import { track } from "@/lib/track";

const PastWorkouts = dynamic(
  () => import("@/components/program/PastWorkouts"),
  { ssr: false },
);

const Program = dynamic(() => import("@/components/program/Program"), {
  ssr: false,
});

// Module-level flag prevents double-fire in React Strict Mode dev double-render
let appOpenFired = false;

const ProgramPage = () => {
  const [updatePastWorkouts, setUpdatePastWorkouts] = useState(0);

  useEffect(() => {
    if (!appOpenFired) {
      appOpenFired = true;
      track("app-open");
      if (window.location.search.includes("utm_source=homescreen")) {
        track("app-open-homescreen");
      }
    }

    // appinstalled only fires on Chromium; never on iOS — bonus signal, not a reliable count
    const handleInstalled = () => track("pwa-installed");
    window.addEventListener("appinstalled", handleInstalled);
    return () => window.removeEventListener("appinstalled", handleInstalled);
  }, []);

  useEffect(() => {}, [updatePastWorkouts]);

  return (
    <main className={styles.main} role="main">
      <PastWorkouts updatePastWorkouts={updatePastWorkouts} />
      <Program setStateForUpdatePastWorkouts={setUpdatePastWorkouts} />
    </main>
  );
};

export default ProgramPage;
