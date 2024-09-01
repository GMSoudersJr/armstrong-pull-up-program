import {
  Dispatch,
  SetStateAction,
  useState,
  useId,
  SyntheticEvent
} from 'react';

import styles from './TrainingSetRepsInput.module.css';
import {nunito, ptSans} from '@/fonts';

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
        <h3 style={nunito.style}>
          TRAINING SET REPS
        </h3>
      </label>
      <input
        id={repInputId}
        name='reps'
        className={styles.repInput}
        style={ptSans.style}
        type="number"
        min={0}
        max={100}
        value={reps}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      <button
        type='button'
        className={styles.repsSubmitButton}
        style={nunito.style}
        onClick={handleClick}
      >
        SUBMIT
      </button>
    </section>

  )
};

export default TrainingSetRepsInput;
