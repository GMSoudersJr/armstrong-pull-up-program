import styles from "./ActionButton.module.css";
import { CircleXIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface MissSetButtonProps {
  onMissed: Dispatch<SetStateAction<boolean>>;
  showTimerModalState: boolean;
}

const MissSetButton = ({
  onMissed,
  showTimerModalState,
}: MissSetButtonProps) => {
  function handleMiss() {
    onMissed(true);
  }

  return (
    <button
      type="button"
      onClick={handleMiss}
      disabled={showTimerModalState}
      className={`${styles.pyramidActionButton} actionButton`}
    >
      <CircleXIcon className={styles.icon} />
    </button>
  );
};

export default MissSetButton;
