import {Dispatch, SetStateAction} from "react";
import styles from './HowManyRepsModal.module.css';
import NumberedMissRepButton from "@/components/program/pyramid/NumberedMissRepButton";

interface HowManyRepsModalProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  setStateForShowModal: Dispatch<SetStateAction<boolean>>;
  repsArrayState: number[];
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
  onMissed: Dispatch<SetStateAction<boolean>>;
  setStateForShowTimerModal: Dispatch<SetStateAction<boolean>>;
  showTimerModalState: boolean;
  setRecoveryTime: Dispatch<SetStateAction<number>>;
}

const HowManyRepsModal = ({
  onClose,
  onMissed,
  setStateForShowTimerModal,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray,
  setStateForShowModal,
  showTimerModalState,
  setRecoveryTime
}: HowManyRepsModalProps) => {

  return (
    <div className={styles.modal} id="modal">
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
              setStateForShowModal={setStateForShowModal}
              onMissed={onMissed}
              setStateForshowTimerModal={setStateForShowTimerModal}
              showTimerModalState={showTimerModalState}
              setRecoveryTime={setRecoveryTime}
            />
          )
        })}
      </div>
      <button
        className={styles.closeButton}
        onClick={onClose}>
        CLOSE
      </button>
    </div>
  )
};

export default HowManyRepsModal;
