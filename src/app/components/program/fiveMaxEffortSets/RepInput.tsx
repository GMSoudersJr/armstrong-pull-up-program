import {
  Dispatch,
  SetStateAction,
  useState,
  useId,
  SyntheticEvent
} from 'react';
import styles from './RepInput.module.css';

interface RepInputProps {
  onChange: Dispatch<SetStateAction<number>>;
  onEnter: Dispatch<SetStateAction<number[]>>;
  repsArrayState: number[];
  setStateForShowTimerModal: Dispatch<SetStateAction<boolean>>;
  showTimerModalState: boolean;
}

const RepInput = ({
  onChange,
  onEnter,
  repsArrayState,
  setStateForShowTimerModal,
  showTimerModalState
}: RepInputProps) => {
  const repInputId = useId();

  const [reps, setReps] = useState(0);

  function handleChange(event: SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    const number = Number(value);
    setReps(number);
    onChange(number);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    const { key } = event;
    if (key === "Enter") {
      onEnter(
        [
          ...repsArrayState,
          reps
        ]
      );
      setStateForShowTimerModal(true);
    }
  }

  return (
    <section className={styles.repInputContainer}>
      <label className={styles.repInputLabel} htmlFor={repInputId}>
        <h4>
          REPS
        </h4>
      </label>
      <input
        id={repInputId}
        name='reps'
        className={styles.repInput}
        type="number"
        min={0}
        max={100}
        value={reps}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        disabled={showTimerModalState}
      />
    </section>
  )
};

export default RepInput;
