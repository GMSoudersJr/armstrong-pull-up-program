import {
  Dispatch,
  SetStateAction,
  useState,
  useId,
  SyntheticEvent,
} from "react";

import styles from "./TrainingSetRepsInput.module.css";
import { nunito, ptSans } from "@/fonts";
import { MinusIcon, PlusIcon } from "lucide-react";

interface TrainingSetRepsInputProps {
  setStateForTrainingSetReps: Dispatch<SetStateAction<number>>;
}

const TrainingSetRepsInput = ({
  setStateForTrainingSetReps,
}: TrainingSetRepsInputProps) => {
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

  function handleDecrement(event: React.MouseEvent<HTMLButtonElement>) {
    const { value } = event.currentTarget;
    const number = Number(value);
    setReps(number);
  }

  function handleIncrement(event: React.MouseEvent<HTMLButtonElement>) {
    const { value } = event.currentTarget;
    const number = Number(value);
    setReps(number);
  }

  function handleSubmit() {
    setStateForTrainingSetReps(reps);
  }

  return (
    <section className={styles.repInputContainer}>
      <label className={styles.repInputLabel} htmlFor={repInputId}>
        <h3 style={nunito.style}>TRAINING SET REPS</h3>
      </label>
      <div className={styles.numericInputContainer}>
        <div className={styles.spanInput}>
          <button
            id="decrement-button"
            type="button"
            onClick={handleDecrement}
            className={`${styles.button} ${styles.decrement} actionButton`}
            disabled={reps <= 0}
            value={reps - 1}
          >
            <MinusIcon />
          </button>
          <input
            id={repInputId}
            name="reps"
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
            id="increment-button"
            type="button"
            onClick={handleIncrement}
            className={`${styles.button} ${styles.increment} actionButton`}
            disabled={reps >= 100}
            value={reps + 1}
          >
            <PlusIcon />
          </button>
        </div>
        <button
          id="submit-button"
          type="button"
          className={styles.repsSubmitButton}
          style={nunito.style}
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>
    </section>
  );
};

export default TrainingSetRepsInput;
