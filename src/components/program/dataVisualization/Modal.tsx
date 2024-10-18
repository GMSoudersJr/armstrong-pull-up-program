import styles from "./Modal.module.css";
import { nunito } from "@/fonts";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface ModalProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  dataVisualizationToGet: {};
}

const DataVisualizationModal = ({
  onClose,
  dataVisualizationToGet,
}: ModalProps) => {
  const [dataToGet, setDataToGet] = useState(dataVisualizationToGet);

  useEffect(() => {
    setDataToGet(dataVisualizationToGet);
  });

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
          <h3 style={nunito.style}>Data Visual Shit</h3>
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
