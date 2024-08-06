import styles from '@/components/program/pyramid/MaxoutNumberButton.module.css';
import { Dispatch, SetStateAction } from 'react';

interface MaxoutNumberButtonProps {
  repCount: number;
  repsArrayState: number[];
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
  setStateForDayComplete: Dispatch<SetStateAction<boolean>>;
}

const MaxoutNumberButton = ({
  repCount,
  setStateForRepsArray,
  repsArrayState,
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
      onClick={handleClick}
    >
      {repCount}
    </button>
  )
};

export default MaxoutNumberButton;
