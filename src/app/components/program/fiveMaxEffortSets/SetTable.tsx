import styles from '@/components/program/fiveMaxEffortSets/SetTable.module.css';

interface SetTableProps {
  repsArray: number[];
}

const SetTable = ({ repsArray }: SetTableProps) => {

  return (
    <table className={styles.table}>
      <tbody className={styles.tableBody}>
        <tr className={styles.tableRow}>
          {repsArray.map((reps, i) => {
            return (
              <th key={`${reps} in set ${i}`} className={styles.tableHead}>
                {`SET ${(i + 1)}`}
              </th>
            )
          })}
        </tr>
        <tr className={styles.tableRow}>
          {repsArray.map((reps) => {
            return (
              <td className={styles.tableData}>{reps}</td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}

export default SetTable;
