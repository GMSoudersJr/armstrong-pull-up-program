import styles from './PyramidDisplay.module.css';
import {BrickWallIcon} from 'lucide-react';

interface PyramidDisplayProps {
  repsArray: number[];
}

const PyramidDisplay = ({ repsArray }: PyramidDisplayProps) => {

  return (
    <ul className={styles.pyramidList}>
      {repsArray.map((reps, i) => {
          return (
              <li
                key={i}
                className={styles.pyramidListItem}
              >
                {Array.from({length: reps}, (x, i) => {
                  return (
                    <BrickWallIcon key={i} className={styles.icon}/>
                  )
                })}
              </li>
          )
      })}
    </ul>
  )
};

export default PyramidDisplay;
