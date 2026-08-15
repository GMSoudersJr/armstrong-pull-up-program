"use client";

import { useState } from "react";
import { nunito } from "@/fonts";
import styles from "./DownloadDataButton.module.css";
import { getOverallProgess } from "@/indexedDBActions";
import DownloadDataModal from "./DownloadDataModal";

const DownloadDataButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [saveError, setSaveError] = useState(false);

  function downloadViaAnchor(file: File) {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function handleDownload() {
    setSaveError(false);
    try {
      const data = await getOverallProgess();
      const json = JSON.stringify(data, null, 2);
      const file = new File([json], "Pull-Up-App-Backup.json", {
        type: "application/json",
      });

      if (
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] })
      ) {
        try {
          await navigator.share({ files: [file] });
        } catch (shareErr) {
          if (shareErr instanceof Error && shareErr.name === "AbortError") {
            // User cancelled the native share sheet — not a failure.
            setModalOpen(false);
            return;
          }
          // Web Share can reject even when canShare() returned true — e.g.
          // Chrome enforces stricter transient-activation rules than
          // WebKit and can reject share() once an awaited call (like the
          // IndexedDB read above) has happened first. Fall back to a
          // direct download rather than leaving the user with nothing.
          downloadViaAnchor(file);
        }
      } else {
        downloadViaAnchor(file);
      }
      setModalOpen(false);
    } catch {
      setSaveError(true);
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.button}
        id="migrate-data-button"
        onClick={() => setModalOpen(true)}
        style={nunito.style}
      >
        Download Workout History
      </button>
      {modalOpen && (
        <DownloadDataModal
          onClose={() => {
            setModalOpen(false);
            setSaveError(false);
          }}
          onConfirm={handleDownload}
          saveError={saveError}
        />
      )}
    </>
  );
};

export default DownloadDataButton;
