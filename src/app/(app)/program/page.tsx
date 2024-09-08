'use client';

import {nunito} from '@/fonts';
import styles from './page.module.css';
import dynamic from 'next/dynamic';
import {useEffect} from 'react';

const Program = dynamic(() => import('@/components/program/Program'), { ssr: false });
const OverallProgess = dynamic(() => import('@/components/program/OverallProgress'), { ssr: false });

const ProgramPage = () => {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
      detectServiceWorkerUpdate();
    }
  }, []);

  async function registerServiceWorker(): Promise<void> {
    await navigator.serviceWorker.register('/service-worker.js',{
      scope: '/program',
    });
  }

  async function detectServiceWorkerUpdate(): Promise<void> {
    const registration = await navigator.serviceWorker.ready;

    registration.addEventListener("updatefound", () => {
      const newServiceWorker = registration.installing;
      if (newServiceWorker) {
        newServiceWorker.addEventListener("statechange", () => {
          if (newServiceWorker.state === "installed") {
            updateServiceWorker(newServiceWorker);
          }
        });
      }
    });
  };

  function updateServiceWorker(newServiceWorker: ServiceWorker) {
    newServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }


  return (
    <main className={styles.main}>
      <h1 style={nunito.style} className={styles.text}>
        GET STARTED!
      </h1>
      <OverallProgess />
      <Program />
    </main>
  )
}

export default ProgramPage;
