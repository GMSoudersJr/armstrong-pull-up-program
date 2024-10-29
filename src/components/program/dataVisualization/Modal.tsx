import { TDataToGet, TDayComplete } from "@/definitions";
import styles from "./Modal.module.css";
import { nunito } from "@/fonts";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getWorkoutById,
  getWorkoutsByDayNumber,
  getWorkoutsbyWeekNumber,
} from "@/indexedDBActions";
import DayOneSVG from "./DayOneSVG";
import DayTwoSVG from "./DayTwoSVG";
import DayThreeSVG from "./DayThreeSVG";
import DayFourSVG from "./DayFourSVG";

interface ModalProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  dataVisualizationToGet: TDataToGet;
}

const DataVisualizationModal = ({
  onClose,
  dataVisualizationToGet,
}: ModalProps) => {
  const initialData: TDayComplete[] = [];
  const [dataToGet, setDataToGet] = useState(dataVisualizationToGet);
  const [data, setData] = useState(initialData);
  const [heading, setHeading] = useState("");

  useEffect(() => {
    setDataToGet(dataVisualizationToGet);

    if (dataToGet.getWorkoutById) {
      const id = dataToGet.getWorkoutById;
      getWorkoutById(id)
        .then((value) => {
          setData(value);
          setHeading(`W${value[0].weekNumber}-D${value[0].dayNumber} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
        });
    }

    if (dataToGet.getWorkoutsByWeekNumber) {
      const weekNumber = dataToGet.getWorkoutsByWeekNumber;
      getWorkoutsbyWeekNumber(weekNumber)
        .then((value) => {
          setData(value);
          setHeading(`W${weekNumber} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
        });
    }

    if (dataToGet.getWorkoutsByDayNumber) {
      const dayNumber = dataToGet.getWorkoutsByDayNumber;
      getWorkoutsByDayNumber(dayNumber)
        .then((value) => {
          setData(value);
          setHeading(`D${dayNumber} REVIEW`);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }, [dataToGet]);

  return (
    <div id="data-visualization-modal" className={styles.modal}>
      <div
        id="data-visualization-modal-content"
        className={styles.modalContent}
      >
        <h1 className={styles.headerText} style={nunito.style}>
          {heading}
        </h1>
        <ul id="d3-section" className={styles.dataVisualizationSection}>
          {data.map((entry) => {
            if (entry.dayAbbreviation === "5MES")
              return (
                <li key={entry.id}>
                  <DayOneSVG data={entry} />
                </li>
              );
            if (entry.dayAbbreviation === "PYRA")
              return (
                <li key={entry.id}>
                  <DayTwoSVG data={entry} />
                </li>
              );
            if (entry.dayAbbreviation === "3S3G")
              return (
                <li key={entry.id}>
                  <DayThreeSVG data={entry} />
                </li>
              );
            if (entry.dayAbbreviation === "MXTS")
              return (
                <li key={entry.id}>
                  <DayFourSVG data={entry} />
                </li>
              );
          })}
        </ul>
        <button
          id="daily-hint-modal-close-button"
          type="button"
          className={styles.closeButton}
          onClick={onClose}
        >
          <XIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default DataVisualizationModal;
