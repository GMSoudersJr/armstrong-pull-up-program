import {crossMarkButtonEmoji} from '@/emojis';
import styles from '@/components/program/pyramid/MissButton.module.css';
import {Dispatch, SetStateAction} from "react";

interface MissButtonProps {
  setStateForShowModal: Dispatch<SetStateAction<boolean>>;
}

const MissButton = ({ setStateForShowModal }: MissButtonProps) => {

  function handleClick() {
    setStateForShowModal(true);
  }

  return (
    <button
      className={styles.missButton}
      onClick={handleClick}>
      {crossMarkButtonEmoji}
    </button>
  )
}

export default MissButton;
