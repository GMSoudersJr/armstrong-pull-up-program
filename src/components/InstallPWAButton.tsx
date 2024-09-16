'use client';

import {DownloadIcon} from "lucide-react";
import {useEffect} from "react";
import styles from './InstallPWAButton.module.css';
import {nunito} from "@/fonts";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>
  prompt(): Promise<void>;
}

const InstallPWAButton = () => {

  let deferredPrompt: BeforeInstallPromptEvent | null;

  useEffect(() => {

    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      deferredPrompt = event as BeforeInstallPromptEvent;
    });

  }, []);

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome }  = await deferredPrompt?.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else if (outcome === 'dismissed') {
        console.log('User dismissed the install prompt')
      }
    }
  }

  return (
    <button
      type='button'
      onClick={handleInstall}
      className={styles.installButton}
    >
      <span className={styles.iconWrapper}>
        <DownloadIcon className={styles.downloadIcon}/>
      </span>
      <h5 style={nunito.style}>
        INSTALL THE APP!
      </h5>
    </button>
  )
};

export default InstallPWAButton;
