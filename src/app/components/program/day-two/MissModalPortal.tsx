import {Dispatch, SetStateAction} from "react";
import styles from './MissModalPortal.module.css';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import HowManyRepsModal from '@/components/program/day-two/HowManyRepsModal';
import MissButton from "./MissButton";

interface MissModalPortalProps {
  onMissed: Dispatch<SetStateAction<boolean>>;
  repsState: number;
  repsArrayState: number[];
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
}

const MissModalPortal = ({
  onMissed,
  repsState,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray
}: MissModalPortalProps) => {

  const [showModal, setShowModal] = useState(false);

  function handleClick() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
    onMissed(false);
  }

  return (
    <>
      <MissButton setStateForShowModal={setShowModal} />
      {showModal && createPortal(
        <HowManyRepsModal
          onMissed={onMissed}
          repsState={repsState}
          repsArrayState={repsArrayState}
          setStateForReps={setStateForReps}
          setStateForRepsArray={setStateForRepsArray}
          onClose={handleClose}
          setStateForShowModal={setShowModal}
        />,
        document.body
      )}
    </>
  )
}

export default MissModalPortal;
