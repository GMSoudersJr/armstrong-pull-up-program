import {ptSans} from '@/fonts';
import styles from './MaxoutNumberButton.module.css';
import { Dispatch, SetStateAction } from 'react';

interface MaxoutNumberButtonProps {
  repCount: number;
  repsArrayState: number[];
  showTimerModalState: boolean;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
  setStateForDayComplete: Dispatch<SetStateAction<boolean>>;
}

const MaxoutNumberButton = ({
  repCount,
  setStateForRepsArray,
  repsArrayState,
  showTimerModalState,
  setStateForDayComplete
}: MaxoutNumberButtonProps) => {

  function handleClick() {

    setStateForRepsArray([
      ...repsArrayState,
      repCount
    ]);

    setStateForDayComplete(true);

  }

  return (
    <button
      className={styles.numberedButton}
      style={ptSans.style}
      onClick={handleClick}
      disabled={showTimerModalState}
    >
      {repCount}
    </button>
  )
};

export default MaxoutNumberButton;
