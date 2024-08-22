import styles from './ActionButton.module.css';
import {crossMarkButtonEmoji} from "@/emojis";
import {notoColorEmoji} from '@/fonts';
import { Dispatch, SetStateAction } from "react";

interface MissSetButtonProps {
  onMissed: Dispatch<SetStateAction<boolean>>;
  showTimerModalState: boolean;
};

const MissSetButton = ({
  onMissed,
  showTimerModalState
}: MissSetButtonProps) => {

  function handleMiss() {
    onMissed(true);
  }

  return (
    <button
      onClick={handleMiss}
      disabled={showTimerModalState}
      className={styles.pyramidActionButton}
      style={notoColorEmoji.style}
    >
      {crossMarkButtonEmoji}
    </button>
  )
};

export default MissSetButton;
