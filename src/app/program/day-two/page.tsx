import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Day Two | Armstrong Pull-up Program",
  description: "Pyramid"
}
const DayTwoPage = () => {

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h1>DAY TWO</h1>
        <h2>PYRAMID</h2>
        <h3>10-SECOND RECOVERY PER REP</h3>
      </div>
    </main>
  )
}

export default DayTwoPage;
