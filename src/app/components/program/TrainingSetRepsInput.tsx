import {
  Dispatch,
  SetStateAction,
  useState,
  useId,
  SyntheticEvent
} from 'react';

import styles from './TrainingSetRepsInput.module.css';

interface TrainingSetRepsInputProps {
  setStateForTrainingSetReps: Dispatch<SetStateAction<number>>;
}

const TrainingSetRepsInput = ({ setStateForTrainingSetReps }: TrainingSetRepsInputProps) => {

  const repInputId = useId();
  const [reps, setReps] = useState(0);

  function handleChange(event: SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    const number = Number(value);
    setReps(number);
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    const { key } = event;
    if (key === "Enter") {
      setStateForTrainingSetReps(reps);
    }
  }

  function handleClick() {
    setStateForTrainingSetReps(reps);
  };

  return (
    <section className={styles.repInputContainer}>
      <label className={styles.repInputLabel} htmlFor={repInputId}>
        <h3>
          TRAINING SET REPS
        </h3>
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
      />
      <button
        className={styles.repsSubmitButton}
        onClick={handleClick}
      >
        SUBMIT
      </button>
    </section>

  )
};

export default TrainingSetRepsInput;
