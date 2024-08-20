import styles from './SetsTable.module.css';

interface SetsTableProps {
  repsArray: number[];
}

const SetsTable = ({ repsArray }: SetsTableProps) => {

  return (
    <table className={styles.table}>
      <tbody className={styles.tableBody}>
        <tr className={styles.tableRow}>
          <th className={styles.tableHead}>SET</th>
          {repsArray.map((reps, i) => {
            return (
              <th key={`${reps} in set ${i}`} className={styles.tableHead}>
                {`${(i + 1)}`}
              </th>
            )
          })}
        </tr>
        <tr className={styles.tableRow}>
          <td className={styles.tableData}>REPS</td>
          {repsArray.map((reps, i) => {
            return (
              <td key={`${reps} in set ${i}`} className={styles.tableData}>{reps}</td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}

export default SetsTable;
