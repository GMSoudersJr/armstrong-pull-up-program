import { TDayAbbreviation } from "@/definitions";
import styles from "./ActionButton.module.css";
import { CircleXIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface MissSetButtonProps {
  dayAbbreviation: TDayAbbreviation;
  onMissedSet: Dispatch<SetStateAction<boolean>>;
  showTimerModalState?: boolean;
  completedSetCount?: number;
}

const MissSetButton = ({
  dayAbbreviation,
  onMissedSet,
  showTimerModalState,
  completedSetCount,
}: MissSetButtonProps) => {
  const disabledAtPyramidBeginning =
    dayAbbreviation === "PYRA" && completedSetCount === 0;
  const disableForGripSelection =
    dayAbbreviation === "3S3G" && completedSetCount === 3;

  function handleMiss(): void {
    onMissedSet(true);
  }

  return (
    <button
      type="button"
      onClick={handleMiss}
      disabled={
        showTimerModalState ||
        disableForGripSelection ||
        disabledAtPyramidBeginning
      }
      className={`${styles.pyramidActionButton} actionButton`}
    >
      <CircleXIcon className={styles.icon} />
    </button>
  );
};

export default MissSetButton;
