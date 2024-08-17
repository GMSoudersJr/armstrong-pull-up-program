import { Metadata } from 'next';
import styles from './page.module.css';
import RepeatDay from '@/components/program/repeatDay/RepeatDay';

export const metadata: Metadata = {
  title: "Day Five | Armstrong Pull-up Program",
  description: "Repeat most difficult day (1 - 4)"
}
const DayFivePage = () => {

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h1>DAY FIVE</h1>
        <h2>REPEAT THE MOST DIFFICULT DAY (1 - 4)</h2>
        <h3>CHOOSE A DAY BELOW</h3>
      </div>
      <section className={styles.pageLinkSection}>
        <RepeatDay />
      </section>
    </main>
  )
}

export default DayFivePage;
