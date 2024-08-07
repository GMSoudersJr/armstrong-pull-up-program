import { Metadata } from 'next';
import styles from './page.module.css';
import FiveMaxEffortSets from '@/components/program/fiveMaxEffortSets/FiveMaxEffortSets';

export const metadata: Metadata = {
  title: "Day One | Armstrong Pull-up Program",
  description: "Five maximum effort sets"
}
const DayOnePage = () => {

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h1>DAY ONE</h1>
        <h2>5 MAXIMUM EFFORT SETS</h2>
        <h3>90 SECONDS RECOVERY</h3>
      </div>
      <div className={styles.repInfoContainer}>
        <FiveMaxEffortSets />
      </div>
    </main>
  )
}

export default DayOnePage;
