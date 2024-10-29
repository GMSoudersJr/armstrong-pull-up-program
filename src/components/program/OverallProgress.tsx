"use client";

import type { TDataToGet, TWeek } from "@/definitions";
import styles from "./OverallProgess.module.css";
import { useEffect, useState } from "react";
import { getWeeklyProgress } from "@/indexedDBActions";
import { ChartNoAxesColumnIcon, LayoutGridIcon } from "lucide-react";
import { WeeklyReportButton } from "@/components/program/dataVisualization/WeeklyReportButton";
import { DayCompareButton } from "@/components/program/dataVisualization/DayCompareButton";
import { DailyReportButton } from "@/components/program/dataVisualization/DailyReportButton";
import { createPortal } from "react-dom";
import DataVisualizationModal from "@/components/program/dataVisualization/Modal";
import { ReviewLink } from "./ReviewLink";

const DAY_HEADERS = [
  { text: "D1", dayNumber: 1 },
  { text: "D2", dayNumber: 2 },
  { text: "D3", dayNumber: 3 },
  { text: "D4", dayNumber: 4 },
  { text: "D5", dayNumber: 5 },
];

const OverallProgess = () => {
  const initialProgress: TWeek[] = [];
  const initialDataToGet: TDataToGet = {};
  const [weeklyProgress, setWeeklyProgress] = useState(initialProgress);

  const [showModal, setShowModal] = useState(false);

  const [dataVisualizationToGet, setDataVisualizationToGet] =
    useState(initialDataToGet);

  function closeModal() {
    setShowModal(false);
    setDataVisualizationToGet(initialDataToGet);
  }

  useEffect(() => {
    getWeeklyProgress()
      .then((value) => setWeeklyProgress(value))
      .catch((error) => console.warn(error));
  }, []);

  return (
    <section className={styles.overallProgressSection}>
      <div className={styles.iconWrapper}>
        <LayoutGridIcon />
      </div>
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
        return [week.number].concat(week.completedDays).map((entry, i) => {
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
      {showModal &&
        createPortal(
          <DataVisualizationModal
            onClose={closeModal}
            dataVisualizationToGet={dataVisualizationToGet}
          />,
          document.body,
        )}
    </section>
  );
};

export default OverallProgess;
