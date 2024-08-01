import styles from './RepOutput.module.css';

interface RepOutputProps {
  reps: number[];
}
const RepOutput = ({ reps }: RepOutputProps) => {

  return (
    <ul className={styles.repOutput}>
      {reps.map((numberOfReps, i) => {
        return (
          <li key={i}>
            {numberOfReps}
          </li>
        )
      })}

    </ul>
  )
};

export default RepOutput;


