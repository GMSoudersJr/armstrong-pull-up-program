'use client';

import {PageLink} from '@/components/PageLink';
import styles from './page.module.css';
import { DAYS } from '@/const';
import { initializeIDB } from '@/data/indexedDB';

const ProgramPage = () => {
  initializeIDB();
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
