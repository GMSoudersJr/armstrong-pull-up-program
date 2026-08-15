import { Fragment, useEffect } from "react";
import Link from "next/link";
import { DownloadIcon } from "lucide-react";
import { nunito, ptSans } from "@/fonts";
import styles from "./DownloadDataModal.module.css";

interface DownloadDataModalProps {
  onClose: () => void;
  onConfirm: () => void;
  saveError?: boolean;
}

const DownloadDataModal = ({
  onClose,
  onConfirm,
  saveError,
}: DownloadDataModalProps) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      id="download-data-modal"
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-heading"
    >
      <div className={styles.dialog}>
        <DownloadIcon className={styles.icon} />
        <h2
          id="download-modal-heading"
          style={nunito.style}
          className={styles.heading}
        >
          Download Workout History
        </h2>
        <p
          id={saveError ? "download-modal-error" : undefined}
          className={styles.message}
          style={ptSans.style}
        >
          {saveError ? (
            <Fragment>
              Download failed — please try again, or email{" "}
              <Link href={"mailto:support@repyourself.app"}>
                support@repyourself.app
              </Link>
            </Fragment>
          ) : (
            "Your workout history will be saved as a JSON file. You can use this file to back up or transfer your data."
          )}
        </p>
        <div className={styles.actions}>
          <button
            id="download-modal-cancel-button"
            type="button"
            className={styles.cancelButton}
            style={nunito.style}
            onClick={onClose}
            aria-label="Cancel download"
          >
            Cancel
          </button>
          <button
            id="download-modal-confirm-button"
            type="button"
            className={styles.downloadButton}
            style={nunito.style}
            onClick={onConfirm}
            aria-label="Confirm download"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadDataModal;
