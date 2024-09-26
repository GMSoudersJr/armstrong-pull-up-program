"use client";

import type { TDayComplete } from "@/definitions";
import styles from "./OverallProgess.module.css";
import { useEffect, useState } from "react";
import { getOverallProgess } from "@/indexedDBActions";
import { nunito, ptSans } from "@/fonts";

const OverallProgess = () => {
  const initialProgress: TDayComplete[] = [];
  const [overallProgress, setOverallProgess] = useState(initialProgress);

  useEffect(() => {
    getOverallProgess()
      .then((value) => setOverallProgess(value))
      .catch((error) => console.warn(error));
  }, []);

  return (
    <section className={styles.overallProgressSection}>
      <ul className={styles.progressList}>
        {overallProgress.map((day) => {
          return (
            <li key={day.id} className={styles.progressListItem}>
              <details>
                <summary style={nunito.style}>
                  WK{day.weekNumber} D{day.dayNumber} - {day.dayAbbreviation} -
                  TOTAL {day.sets.reduce((a, b) => a + b)}
                </summary>
                <p style={ptSans.style}>
                  <time dateTime={day.date}>{day.date}</time>
                </p>
                {day.grips && (
                  <p style={ptSans.style}>{day.grips.join(" | ")}</p>
                )}
                <p style={ptSans.style}>Sets: {day.sets.join(", ")}</p>
              </details>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default OverallProgess;
