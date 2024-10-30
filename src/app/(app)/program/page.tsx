"use client";

import styles from "./page.module.css";
import dynamic from "next/dynamic";

const Program = dynamic(() => import("@/components/program/Program"), {
  ssr: false,
});
const OverallProgess = dynamic(
  () => import("@/components/program/OverallProgress"),
  { ssr: false },
);

const ProgramPage = () => {
  /*
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
      detectServiceWorkerUpdate();
    }
  }, []);

  async function registerServiceWorker(): Promise<void> {
    await navigator.serviceWorker.register('/sw.js',{
      scope: '/program',
    });
  }

  async function detectServiceWorkerUpdate(): Promise<void> {
    const registration = await navigator.serviceWorker.ready;

    console.log("Detecting Service Worker Update...");

    registration.addEventListener("updatefound", () => {
      const newServiceWorker = registration.installing;
      if (newServiceWorker) {
        newServiceWorker.addEventListener("statechange", () => {
          console.log("SW Update found");
          if (newServiceWorker.state === "installed") {
            updateServiceWorker(newServiceWorker);
          }
        });
      }
    });
  };

  function updateServiceWorker(newServiceWorker: ServiceWorker) {
    console.log("Updating the service worker!")
    newServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }

   */

  return (
    <main className={styles.main}>
      <OverallProgess />
      <Program />
    </main>
  );
};

export default ProgramPage;
