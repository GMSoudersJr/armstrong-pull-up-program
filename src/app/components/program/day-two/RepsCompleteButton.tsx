import {Dispatch, SetStateAction} from "react";

interface RepsCompleteButtonProps {
  repsState: number;
  repsArrayState: number[];
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;

}

const RepsCompleteButton = ({
  repsState,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray
}: RepsCompleteButtonProps) => {

  function handleClick() {
    setStateForRepsArray(
      [
        ...repsArrayState,
        repsState
      ]
    );
    setStateForReps(repsState => repsState + 1);
  }

  return (
    <button
      onClick={handleClick}
    >
      DONE
    </button>
  )
};

export default RepsCompleteButton;
