import { Metadata } from 'next';
import styles from './page.module.css';
import { DAYS } from '@/const';
import { PageLink } from '@/components/PageLink';

export const metadata: Metadata = {
  title: "Day Five | Armstrong Pull-up Program",
  description: "Repeat most difficult day (1 - 4)"
}
const DayFivePage = () => {

  const repeatableDays = DAYS.slice(0, 4);

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h1>DAY FIVE</h1>
        <h2>REPEAT THE MOST DIFFICULT DAY (1 - 4)</h2>
        <h3>CHOOSE A DAY BELOW</h3>
      </div>
      <section className={styles.pageLinkSection}>
        {repeatableDays.map((day) => {
        return (
          <PageLink
            key={day.path}
            path={day.path}
            label={day.label}
          />
        )
        })}
      </section>
    </main>
  )
}

export default DayFivePage;
