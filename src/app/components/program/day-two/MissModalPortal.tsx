import {Dispatch, SetStateAction} from "react";
import { useState } from 'react';
import { createPortal } from 'react-dom';
import HowManyRepsModal from '@/components/program/day-two/HowManyRepsModal';

interface MissModalPortalProps {
  repsState: number;
  repsArrayState: number[];
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;

}

const MissModalPortal = ({
  repsState,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray
}: MissModalPortalProps) => {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}>
        MISS
      </button>
      {showModal && createPortal(
        <HowManyRepsModal
          repsState={repsState}
          repsArrayState={repsArrayState}
          setStateForReps={setStateForReps}
          setStateForRepsArray={setStateForRepsArray}
          onClose={() => setShowModal(false)}
        />,
        document.body
      )}
    </>
  )
}

export default MissModalPortal;
