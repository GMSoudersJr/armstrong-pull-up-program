"use client";

import { useEffect, useState } from "react";
import { nunito } from "@/fonts";
import styles from "./DownloadDataButton.module.css";
import { getOverallProgess } from "@/indexedDBActions";
import { isSafari } from "@/utils";

const DownloadDataButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!isSafari()) {
      setShowButton(true);
    }
  }, []);

  async function handleDownload() {
    const data = await getOverallProgess();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "Pull-Up-App-Backup.json"; // Friendly filename
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (!showButton) return;

  return (
    <button
      type="button"
      className={styles.button}
      id="migrate-data-button"
      onClick={handleDownload}
      style={nunito.style}
    >
      Download Workout History
    </button>
  );
};

export default DownloadDataButton;
