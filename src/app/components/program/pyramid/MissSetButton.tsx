import {crossMarkButtonEmoji} from "@/emojis";
import { Dispatch, SetStateAction } from "react";

interface MissSetButtonProps {
  onMissed: Dispatch<SetStateAction<boolean>>;
};

const MissSetButton = ({ onMissed }: MissSetButtonProps) => {

  function handleMiss() {
    onMissed(true);
  }

  return (
    <button onClick={handleMiss}>
      {crossMarkButtonEmoji}
    </button>
  )
};

export default MissSetButton;
