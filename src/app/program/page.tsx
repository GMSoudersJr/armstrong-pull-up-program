'use client';

import {PageLink} from '@/components/PageLink';
import styles from './page.module.css';
import { DAYS } from '@/const';
import { initializeIDB } from '@/data/indexedDB';
import Program from '@/components/program/Program';

const ProgramPage = () => {
  initializeIDB();
  // TODO Get the next day
  return (
    <main className={styles.main}>
      <h1>
        GET STARTED!
      </h1>
      <div className={styles.pageLinksContainer}>
        <Program />
      </div>
    </main>
  )
}

export default ProgramPage;
