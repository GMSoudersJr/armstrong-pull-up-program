import {Dispatch, SetStateAction} from "react";
import { useState } from 'react';
import { createPortal } from 'react-dom';
import HowManyRepsModal from '@/components/program/pyramid/HowManyRepsModal';
import MissButton from "@/components/program/pyramid/MissButton";
import TimerModal from "../TimerModal";

interface MissModalPortalProps {
  onMissed: Dispatch<SetStateAction<boolean>>;
  repsArrayState: number[];
  setStateForReps: Dispatch<SetStateAction<number>>;
  setStateForRepsArray: Dispatch<SetStateAction<number[]>>;
}

const MissModalPortal = ({
  onMissed,
  repsArrayState,
  setStateForReps,
  setStateForRepsArray
}: MissModalPortalProps) => {

  const [showModal, setShowModal] = useState(false);

  const [showTimerModal, setShowTimerModal] = useState(false);
  const [recoveryTime, setRecoveryTime] = useState(0);

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
          repsArrayState={repsArrayState}
          setStateForReps={setStateForReps}
          setStateForRepsArray={setStateForRepsArray}
          onClose={handleClose}
          setStateForShowModal={setShowModal}
          setStateForShowTimerModal={setShowTimerModal}
          showTimerModalState={showTimerModal}
          setRecoveryTime={setRecoveryTime}
        />,
        document.body
      )}
      {showTimerModal && createPortal(
        <TimerModal
          onClose={handleClose}
          setStateForShowTimerModal={setShowTimerModal}
          recoveryTime={recoveryTime}
        />,
        document.body
      )}
    </>
  )
}

export default MissModalPortal;
