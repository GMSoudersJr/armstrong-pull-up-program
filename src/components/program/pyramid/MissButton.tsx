import styles from './MissButton.module.css';
import {Dispatch, SetStateAction} from "react";
import {notoColorEmoji} from '@/fonts';
import {CircleXIcon} from 'lucide-react';

interface MissButtonProps {
  setStateForShowModal: Dispatch<SetStateAction<boolean>>;
}

const MissButton = ({ setStateForShowModal }: MissButtonProps) => {

  function handleClick() {
    setStateForShowModal(true);
  }

  return (
    <button
      type='button'
      className={styles.missButton}
      style={notoColorEmoji.style}
      onClick={handleClick}>
      <CircleXIcon className={styles.icon}/>
    </button>
  )
}

export default MissButton;
