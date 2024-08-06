import {Dispatch, SetStateAction} from "react";
import styles from '@/components/program/threeTrainingSetsThreeGrips/GripSelector.module.css';

interface GripSelectorProps {
  completedGripsState: string[];
  setStateForCurrentGrip: Dispatch<SetStateAction<string>>;
}

const GripSelector = ({ completedGripsState, setStateForCurrentGrip }: GripSelectorProps) => {

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement;
    const { value } = target;
    setStateForCurrentGrip(value);
  }

  return (
    <section className={styles.gripSelectorContainer}>
      <h3 className={styles.gripSelectorLabel}>
        GRIP
      </h3>
      <ul className={styles.gripSelectorButtonList}>
      {GRIPS.map((grip) => {
        return (
          <li
            key={grip}
            className={styles.gripSelectorButtonListitem}
          >
            <button
              className={styles.gripSelectorButton}
              onClick={handleClick}
              value={grip}
              disabled={completedGripsState.includes(grip)}
            >
              {grip.toUpperCase()}
            </button>
          </li>
        )
      })}
      </ul>
    </section>

  )
};

const GRIPS = ['neutral', 'wide', 'close'];

export default GripSelector;

