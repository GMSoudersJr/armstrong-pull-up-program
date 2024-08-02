import styles from './RepOutput.module.css';

interface RepOutputProps {
  reps: number[];
}
const RepOutput = ({ reps }: RepOutputProps) => {

  return (
    <ul className={styles.repOutputList}>

      {reps.map((numberOfReps, i) => {

        return (
          <li key={i} className={styles.repOutputListitem}>
            {numberOfReps}
          </li>
        )
      })}

    </ul>
  )
};

export default RepOutput;
