import {Dispatch, SetStateAction} from "react";
import styles from './HowManyRepsModal.module.css';
import NumberedMissRepButton from "./NumberedMissRepButton";

interface HowManyRepsModalProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  repsState: number;
  repsArrayState: number[];
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
}

const HowManyRepsModal = ({
  onClose,
  repsState,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray
}: HowManyRepsModalProps) => {

  return (
    <div className={styles.modal}>
      <h3>How many reps did you do?</h3>
      <div className={styles.repsButtonContainer}>
        {repsArrayState.map((reps, i) => {
          return (
            <NumberedMissRepButton
              key={i}
              repCount={reps}
              repsArrayState={repsArrayState}
              setStateForReps={setStateForReps}
              setStateForRepsArray={setStateForRepsArray}
            />
          )
        })}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  )
};

export default HowManyRepsModal;
