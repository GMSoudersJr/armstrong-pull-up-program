"use client";

import type { TWeek } from "@/definitions";
import styles from "./OverallProgess.module.css";
import { useEffect, useState } from "react";
import { getWeeklyProgress } from "@/indexedDBActions";
import { LayoutGridIcon } from "lucide-react";
import { WeeklyReportButton } from "@/components/program/dataVisualization/WeeklyReportButton";
import { DayCompareButton } from "@/components/program/dataVisualization/DayCompareButton";
import { DailyReportButton } from "@/components/program/dataVisualization/DailyReportButton";
import { createPortal } from "react-dom";
import DataVisualizationModal from "@/components/program/dataVisualization/Modal";

const DAY_HEADERS = [
  { text: "D1", dayNumber: 1 },
  { text: "D2", dayNumber: 2 },
  { text: "D3", dayNumber: 3 },
  { text: "D4", dayNumber: 4 },
  { text: "D5", dayNumber: 5 },
];

const OverallProgess = () => {
  const initialProgress: TWeek[] = [];
  const [weeklyProgress, setWeeklyProgress] = useState(initialProgress);

  const [showModal, setShowModal] = useState(false);

  const [dataVisualizationToGet, setDataVisualizationToGet] = useState({});

  function closeModal() {
    setShowModal(false);
    setDataVisualizationToGet({});
  }

  useEffect(() => {
    getWeeklyProgress()
      .then((value) => setWeeklyProgress(value))
      .catch((error) => console.warn(error));
  }, []);

  return (
    <section className={styles.overallProgressSection}>
      <button>
        <LayoutGridIcon />
      </button>
      {DAY_HEADERS.map((entry) => {
        return (
          <DayCompareButton
            text={entry.text}
            setDataVisualizationState={setDataVisualizationToGet}
            dayNumber={entry.dayNumber}
            setShowModalState={setShowModal}
            showModalState={showModal}
            key={entry.dayNumber}
          />
        );
      })}
      {weeklyProgress.map((week) => {
        return [week.number].concat(week.completedDays).map((entry, i) => {
          const id = `${week.number}-${entry}`;
          if (i === 0) {
            return (
              <WeeklyReportButton
                weekNumber={week.number}
                setDataVisualizationState={setDataVisualizationToGet}
                setShowModalState={setShowModal}
                showModalState={showModal}
                key={`W-${id}`}
              />
            );
          } else {
            return (
              <DailyReportButton
                id={id}
                setDataVisualizationState={setDataVisualizationToGet}
                setShowModalState={setShowModal}
                showModalState={showModal}
                key={id}
              />
            );
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
