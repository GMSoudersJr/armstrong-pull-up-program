"use client";

import type { TWeek } from "@/definitions";
import styles from "./OverallProgess.module.css";
import { useEffect, useState } from "react";
import { getWeeklyProgress } from "@/indexedDBActions";
import { CalendarArrowDownIcon, CalendarArrowUpIcon } from "lucide-react";
import { ReviewLink } from "./ReviewLink";
import { nunito } from "@/fonts";

const DAY_HEADERS = [
  { text: "D1", dayNumber: 1 },
  { text: "D2", dayNumber: 2 },
  { text: "D3", dayNumber: 3 },
  { text: "D4", dayNumber: 4 },
  { text: "D5", dayNumber: 5 },
];

const PastWorkouts = () => {
  const initialProgress: TWeek[] = [];
  const [weeklyProgress, setWeeklyProgress] = useState(initialProgress);
  const [latest, setLatest] = useState(false);
  const [fullWeek, setFullWeek] = useState(false);

  function handleClick() {
    setLatest(!latest);
    setWeeklyProgress(weeklyProgress.reverse());
  }

  useEffect(() => {
    getWeeklyProgress()
      .then((value) => {
        setWeeklyProgress(value);
        setFullWeek(value.slice(-1)[0].lastCompletedDay === 5);
      })
      .catch((error) => console.warn(error));
  }, []);

  return (
    <>
      <h2 style={nunito.style} className={styles.heading}>
        {weeklyProgress.length > 0 ? "PAST WORKOUTS" : "GET STARTED"}
      </h2>
      <section className={styles.pastWorkouts}>
        {weeklyProgress.length > 0 ? (
          <>
            <button
              type="button"
              className={`${styles.iconWrapper} ${styles.button}`}
              onClick={handleClick}
              disabled={!fullWeek}
              title="Toggle week order"
            >
              {latest ? <CalendarArrowUpIcon /> : <CalendarArrowDownIcon />}
            </button>
            {DAY_HEADERS.map((entry) => {
              return (
                <ReviewLink
                  getData="day"
                  index={entry.dayNumber}
                  text={`D${entry.dayNumber}`}
                  key={entry.dayNumber}
                />
              );
            })}
            {weeklyProgress.map((week) => {
              return [week.number]
                .concat(week.completedDays)
                .map((entry, i) => {
                  const id = `${week.number}-${entry}`;
                  if (i === 0) {
                    return (
                      <ReviewLink
                        getData="week"
                        index={week.number}
                        text={`W${week.number}`}
                        key={`W-${id}`}
                      />
                    );
                  } else {
                    return <ReviewLink getData="workout" index={id} key={id} />;
                  }
                });
            })}
          </>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default PastWorkouts;
