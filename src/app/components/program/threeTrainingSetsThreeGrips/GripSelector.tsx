import {Dispatch, SetStateAction} from "react";
import styles from './GripSelector.module.css';
import type {TGrip} from "@/app/lib/definitions";

interface GripSelectorProps {
  completedGripsState: TGrip[];
  setStateForCurrentGrip: Dispatch<SetStateAction<TGrip>>;
}

const GripSelector = ({ completedGripsState, setStateForCurrentGrip }: GripSelectorProps) => {

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement;
    const { value } = target;
    setStateForCurrentGrip(value as TGrip);
  }

  return (
    <section className={styles.gripSelectorContainer}>
      <h3 className={styles.gripSelectorLabel}>
        GRIP
      </h3>
      <ul className={styles.gripSelectorButtonList}>
      {GRIPS.map((grip) => {
        if (!grip) return;

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

const GRIPS: TGrip[] = ['pronated', 'neutral', 'wide', 'close', 'supinated'];

export default GripSelector;

