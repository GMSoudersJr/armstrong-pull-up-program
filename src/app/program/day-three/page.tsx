import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Day Three | Armstrong Pull-up Program",
  description: "Three training sets with three different grips"
}
const DayThreePage = () => {

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h1>DAY THREE</h1>
        <h2>THREE TRAINING SETS WITH THREE GRIPS</h2>
        <h3>60 SECONDS RECOVERY</h3>
      </div>
    </main>
  )
}

export default DayThreePage;
