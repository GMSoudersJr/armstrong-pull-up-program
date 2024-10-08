import { nunito, ptSans } from "@/fonts";
import styles from "./SetsTable.module.css";

interface SetsTableProps {
  repsArray: number[];
}

const SetsTable = ({ repsArray }: SetsTableProps) => {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr className={styles.tableRow}>
          {repsArray.map((reps, i) => {
            return (
              <th
                key={`${reps} in set ${i}`}
                className={styles.tableHead}
                style={nunito.style}
              >
                {`${i + 1}`}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        <tr className={styles.tableRow}>
          {repsArray.map((reps, i) => {
            return (
              <td
                key={`${reps} in set ${i}`}
                className={styles.tableData}
                style={ptSans.style}
              >
                {reps}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default SetsTable;
