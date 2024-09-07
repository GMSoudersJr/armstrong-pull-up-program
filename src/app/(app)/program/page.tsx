'use client';

import {nunito} from '@/fonts';
import styles from './page.module.css';
import dynamic from 'next/dynamic';
import {useEffect} from 'react';

const Program = dynamic(() => import('@/components/program/Program'), { ssr: false });

const ProgramPage = () => {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/service-worker.js',{
      scope: '/program',
    });
  }

  return (
    <main className={styles.main}>
      <h1 style={nunito.style} className={styles.text}>
        GET STARTED!
      </h1>
      <div className={styles.pageLinksContainer}>
        <Program />
      </div>
    </main>
  )
}

export default ProgramPage;
