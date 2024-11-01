"use client";

import { CircleHelpIcon } from "lucide-react";
import styles from "./DailyHintButton.module.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import DailyHintModal from "./DailyHintModal";

interface DailyHintButtonProps {
  dayNumber: number;
}

const DailyHintButton = ({ dayNumber }: DailyHintButtonProps) => {
  const [showDailyHintModal, setShowDailyHintModal] = useState(false);

  function handleClick() {
    setShowDailyHintModal(true);
  }

  return (
    <>
      <button
        id="hint-button"
        title="Get a hint on what to do"
        type="button"
        onClick={handleClick}
        className={styles.button}
      >
        <CircleHelpIcon className={styles.icon} />
      </button>
      {showDailyHintModal &&
        createPortal(
          <DailyHintModal
            onClose={() => setShowDailyHintModal(false)}
            dayNumber={dayNumber}
          />,
          document.body,
        )}
    </>
  );
};

export default DailyHintButton;
