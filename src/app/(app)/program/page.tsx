"use client";

import styles from "./page.module.css";
import dynamic from "next/dynamic";

const OverallProgess = dynamic(
  () => import("@/components/program/OverallProgress"),
  { ssr: false },
);

const Program = dynamic(() => import("@/components/program/Program"), {
  ssr: false,
});

const ProgramPage = () => {
  return (
    <main className={styles.main} role="main">
      <OverallProgess />
      <Program />
    </main>
  );
};

export default ProgramPage;
