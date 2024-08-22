import {brickEmoji} from '@/emojis';
import styles from './PyramidDisplay.module.css';
import {notoColorEmoji} from '@/fonts';

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
                style={notoColorEmoji.style}
              >
                {brickEmoji.repeat(reps)}
              </li>
          )
      })}
    </ul>
  )
};

export default PyramidDisplay;
