import {Dispatch, SetStateAction} from "react";
import styles from './GripSelector.module.css';
import type {TGrip} from "@/app/lib/definitions";
import {leftFacingFistEmoji, raisedBackOfHand, raisedFist, rightFacingFistEmoji} from "@/emojis";

interface GripSelectorProps {
  completedGripsState: TGrip[];
  setStateForCurrentGrip: Dispatch<SetStateAction<TGrip>>;
}

type TGripButtonData = {
  name: TGrip;
  emoji: string[];
}
const GRIP_BUTTON_DATA: TGripButtonData[] = [ 
  {
    name: 'wide',
    emoji: [raisedBackOfHand, raisedBackOfHand]
  },
  {
    name: 'pronated',
    emoji: [raisedBackOfHand, raisedBackOfHand]
  },
  {
    name: 'neutral',
    emoji: [rightFacingFistEmoji, leftFacingFistEmoji]
  },
  {
    name: 'supinated',
    emoji: [raisedFist, raisedFist]
  },
  {
    name: 'close',
    emoji: [raisedFist, raisedFist]
  }
];

const GripSelector = ({ completedGripsState, setStateForCurrentGrip }: GripSelectorProps) => {

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { value } = event.currentTarget;
    setStateForCurrentGrip(value as TGrip);
  }

  return (
    <section className={styles.gripSelectorContainer}>
      <h3 className={styles.gripSelectorLabel}>
        SELECT GRIP
      </h3>
      <ul className={styles.gripSelectorButtonList}>
      {GRIP_BUTTON_DATA.map((grip) => {
        if (!grip) return;
        const leftEmojiClassName = `leftEmoji-${grip.name}`;
        const rightEmojiClassName = `rightEmoji-${grip.name}`;
        return (
          <li
            key={grip.name}
            className={styles.gripSelectorButtonListitem}
          >
            <button
              className={styles.gripSelectorButton}
              onClick={handleClick}
              value={grip.name}
              disabled={completedGripsState.includes(grip.name)}
            >
              <div
                className={`${styles.emoji} ${styles[leftEmojiClassName]}`}
              >
                {grip.emoji.at(0)}
              </div>
              <div
                className={`${styles.gripName}`}
              >
                {grip.name.toUpperCase()}
              </div>
              <div
                className={`${styles.emoji} ${styles[rightEmojiClassName]}`}
              >
                {grip.emoji.at(1)}
              </div>
            </button>
          </li>
        )
      })}
      </ul>
    </section>
  )
};

export default GripSelector;

