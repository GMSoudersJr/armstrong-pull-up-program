import {Dispatch, SetStateAction} from "react";
import styles from './RepeatDayButton.module.css';

interface RepeatDayButtonProps {
  name?: string;
  dayNumber: number;
  setStateForMostDifficultDay: Dispatch<SetStateAction<number>>;
};

const RepeatDayButton = ({
  name,
  dayNumber,
  setStateForMostDifficultDay
}: RepeatDayButtonProps) => {

  function handleClick() {
    setStateForMostDifficultDay(dayNumber);
  }

  return (
    <button
      className={styles.repeatDayButton}
      onClick={handleClick}
    >
      <h3>
        {`Day ${dayNumber}`}
      </h3>
      <h4>
        {`${name?.toUpperCase()}`}
      </h4>
    </button>

  )
};

export default RepeatDayButton;

