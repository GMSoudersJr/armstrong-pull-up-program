import { Metadata } from 'next';
import styles from './page.module.css';
import MaxTrainingSetsInfo from '@/components/program/day-four/MaxTrainingSetsInfo';

export const metadata: Metadata = {
  title: "Day Four | Armstrong Pull-up Program",
  description: "Maximum Training Sets"
}
const DayFourPage = () => {

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h1>DAY FOUR</h1>
        <h2>MAXIMUM (9+) TRAINING SETS</h2>
        <h3>60 SECONDS RECOVERY</h3>
      </div>
      <div>
        <MaxTrainingSetsInfo />
      </div>
    </main>
  )
}

export default DayFourPage;
