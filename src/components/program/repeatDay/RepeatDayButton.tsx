import { Dispatch, SetStateAction } from "react";
import styles from "./RepeatDayButton.module.css";
import { nunito } from "@/fonts";

interface RepeatDayButtonProps {
  name?: string;
  dayNumber: number;
  setStateForMostDifficultDay: Dispatch<SetStateAction<number>>;
}

const RepeatDayButton = ({
  name,
  dayNumber,
  setStateForMostDifficultDay,
}: RepeatDayButtonProps) => {
  function handleClick() {
    setStateForMostDifficultDay(dayNumber);
  }

  return (
    <button
      type="button"
      className={`${styles.repeatDayButton} actionButton`}
      onClick={handleClick}
    >
      <h4 style={nunito.style}>{`Day ${dayNumber}`}</h4>
      <h5 style={nunito.style}>{`${name?.toUpperCase()}`}</h5>
    </button>
  );
};

export default RepeatDayButton;
