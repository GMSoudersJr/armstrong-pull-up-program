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
          setHeading(`W${value[0].weekNumber}-D${value[0].dayNumber} REPORT`);
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
          setHeading(`WEEK ${weekNumber} REPORT`);
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
          setHeading(`DAY ${dayNumber} REPORT`);
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
        <h2 className={styles.headerText} style={nunito.style}>
          {heading}
        </h2>
        <section id="d3-section" className={styles.dataVisualizationSection}>
          {data.map((entry) => {
            return <DayOneSVG data={entry} key={entry.id} />;
          })}
        </section>
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
