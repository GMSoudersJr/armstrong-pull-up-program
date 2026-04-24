"use client";

import { useState } from "react";
import { nunito } from "@/fonts";
import { clearAllData } from "@/indexedDBActions";
import ResetProgramModal from "./ResetProgramModal";
import styles from "./ResetProgramButton.module.css";

const ResetProgramButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  async function handleConfirm() {
    await clearAllData();
    window.location.reload();
  }

  return (
    <>
      <button
        id="reset-program-button"
        type="button"
        className={styles.button}
        style={nunito.style}
        onClick={() => setModalOpen(true)}
        aria-label="Reset program"
      >
        Reset All Progress
      </button>
      {modalOpen && (
        <ResetProgramModal
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default ResetProgramButton;
