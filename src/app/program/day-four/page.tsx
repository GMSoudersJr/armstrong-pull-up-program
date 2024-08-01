import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Day Four | Armstrong Pull-up Program",
  description: "Maximum Training Sets"
}
const DayFourPage = () => {

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h1>DAY FOUR</h1>
        <h2>MAXIMUM TRAINING SETS</h2>
        <h3>60 SECONDS RECOVERY</h3>
      </div>
    </main>
  )
}

export default DayFourPage;
