import styles from '@/components/program/pyramid/PyramidDisplay.module.css';

interface PyramidDisplayProps {
  repsArray: number[];
}

const PyramidDisplay = ({ repsArray }: PyramidDisplayProps) => {

  return (
    <ul className={styles.pyramidList}>
      {repsArray.map((reps, i) => {
          return (
              <li key={i} className={styles.pyramidListItem}>
                {`🧱`.repeat(reps)}
              </li>
          )
      })}
    </ul>
  )
};

export default PyramidDisplay;
