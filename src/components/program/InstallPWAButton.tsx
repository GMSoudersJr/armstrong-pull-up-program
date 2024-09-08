'use client';

import {DownloadIcon} from "lucide-react";

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

  window.addEventListener('beforeinstallprompt', (event: Event) => {
    event.preventDefault();
    deferredPrompt = event as BeforeInstallPromptEvent;
  });

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
    >
      <DownloadIcon />
    </button>
  )
};

export default InstallPWAButton;
