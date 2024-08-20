'use client';

import styles from './page.module.css';
import dynamic from 'next/dynamic';

const Program = dynamic(() => import('@/components/program/Program'), { ssr: false });

const ProgramPage = () => {

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
