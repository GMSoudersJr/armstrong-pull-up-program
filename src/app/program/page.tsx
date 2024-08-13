import { Metadata } from 'next';
import {PageLink} from '@/components/PageLink';
import styles from './page.module.css';
import { DAYS } from '@/const';

export const metadata: Metadata = {
  title: "Program | Armstrong Pull-up Program",
  description: "Choose which day of the program to begin."
}
const ProgramPage = () => {

  return (
    <main className={styles.main}>
      <h1>
        GET STARTED!
      </h1>
      <div className={styles.pageLinksContainer}>
      {DAYS.map((day) => {
      return (
          <PageLink
            key={day.path}
            path={`/program/${day.number}`}
            label={day.label}
          />
      )
      })}
      </div>
    </main>
  )
}

export default ProgramPage;
