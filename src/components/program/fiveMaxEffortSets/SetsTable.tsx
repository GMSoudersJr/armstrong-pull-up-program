import {nunito, ptSans} from '@/fonts';
import styles from './SetsTable.module.css';

interface SetsTableProps {
  repsArray: number[];
}

const SetsTable = ({ repsArray }: SetsTableProps) => {

  return (
    <table className={styles.table}>
      <tbody className={styles.tableBody}>
        <tr className={styles.tableRow}>
          <th
            className={styles.tableHead}
            style={nunito.style}
          >
            SET
          </th>
          {repsArray.map((reps, i) => {
            return (
              <th
                key={`${reps} in set ${i}`}
                className={styles.tableHead}
                style={nunito.style}
              >
                {`${(i + 1)}`}
              </th>
            )
          })}
        </tr>
        <tr className={styles.tableRow}>
          <td
            className={styles.tableData}
            style={ptSans.style}
          >
            REPS
          </td>
          {repsArray.map((reps, i) => {
            return (
              <td
                key={`${reps} in set ${i}`}
                className={styles.tableData}
                style={ptSans.style}
              >
                {reps}
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}

export default SetsTable;
