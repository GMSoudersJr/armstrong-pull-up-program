import {Dispatch, SetStateAction} from "react";
import styles from './ChooseProgramDayButton.module.css';

interface ChooseProgramDayButtonProps {
  name: string;
  dayNumber: number;
  setStateForProgramDayNumber: Dispatch<SetStateAction<number>>;
};

const ChooseProgramDayButton = ({
  name,
  dayNumber,
  setStateForProgramDayNumber
}: ChooseProgramDayButtonProps) => {

  function handleClick() {
    setStateForProgramDayNumber(dayNumber);
  }

  return (
    <button
      className={styles.chooseProgramDayButton}
      onClick={handleClick}
    >
      {`D-${dayNumber} ${name?.toUpperCase()}`}
    </button>

  )
};

export default ChooseProgramDayButton;


