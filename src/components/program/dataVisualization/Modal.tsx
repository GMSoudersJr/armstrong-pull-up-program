import { TDataToGet, TDayComplete } from "@/definitions";
import styles from "./Modal.module.css";
import { nunito } from "@/fonts";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getWorkoutById, getWorkoutsByDayNumber } from "@/indexedDBActions";

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

  useEffect(() => {
    setDataToGet(dataVisualizationToGet);

    if (dataToGet.getWorkoutById) {
      const id = dataToGet.getWorkoutById;
      getWorkoutById(id)
        .then((value) => setData(value))
        .catch((error) => console.warn(error));
    }

    if (dataToGet.getWorkoutsByWeekNumber) {
      const weekNumber = dataToGet.getWorkoutsByWeekNumber;
    }

    if (dataToGet.getWorkoutsByDayNumber) {
      const dayNumber = dataToGet.getWorkoutsByDayNumber;
      getWorkoutsByDayNumber(dayNumber)
        .then((value) => {
          setData(value);
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
          {Object.keys(dataToGet)}: {Object.values(dataToGet)}
        </h2>
        <section>
          {data.map((entry) => {
            return (
              <h3 style={nunito.style} key={entry.id}>
                {entry.id}
              </h3>
            );
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
