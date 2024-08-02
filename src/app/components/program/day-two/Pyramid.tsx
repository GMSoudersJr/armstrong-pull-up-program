import styles from '@/components/program/day-two/Pyramid.module.css';

interface PyramidProps {
  repsArray: number[];
}

const Pyramid = ({ repsArray }: PyramidProps) => {

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

export default Pyramid;
