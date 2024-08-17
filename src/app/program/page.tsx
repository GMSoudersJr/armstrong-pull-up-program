'use client';

import styles from './page.module.css';
import { initializeIDB } from '@/data/indexedDB/index';
import Program from '@/components/program/Program';

const ProgramPage = () => {
  initializeIDB();
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
