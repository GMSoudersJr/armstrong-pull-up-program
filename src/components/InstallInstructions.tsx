'use client';

import styles from './InstallInstructions.module.css';
import {nunito, ptSans} from "@/fonts";
import { useEffect } from "react";
import InstallPWAButton from './InstallPWAButton';
import {
  ChromeIcon,
  CompassIcon,
  MonitorDownIcon,
  MoveDownIcon,
  PlusSquareIcon,
  ShareIcon
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>
  prompt(): Promise<void>;
}

const InstallInstructions = () => {

  let deferredPrompt: BeforeInstallPromptEvent | null;

  useEffect(() => {

    if ("BeforeInstallPromptEvent" in window) console.log("BeforeInstallPromptEvent exists");

  }, []);

  return (
    <section className={styles.installInstructionsSection}>
      <h1 style={nunito.style}>PWA INSTALLATION</h1>
      <div className={styles.intstallInstructions}>
        <div id='mostDevices'>
          <h2 style={nunito.style}>MOST DEVICES</h2>
          <ol className={styles.list}>
            <li style={ptSans.style}>
              <span className={styles.listitemSpan}>
                Open site in Chrome browser <ChromeIcon />
              </span>
            </li>
            <li style={ptSans.style}>
              <span className={styles.listitemSpan}>
                Click <MonitorDownIcon /> in address bar or
              </span>
            </li>
            <li style={ptSans.style}>
              <span className={styles.listitemSpan}>
                Click install button below <MoveDownIcon />
              </span>
            </li>
          </ol>
          <InstallPWAButton />
        </div>

        <div id='iosDevices'>
          <h2 style={nunito.style}>iOS DEVICES</h2>
          <ol className={styles.list}>
            <li style={ptSans.style}>
              <span className={styles.listitemSpan}>
                open site in Safari browser <CompassIcon />
              </span>
            </li>
            <li style={ptSans.style}>
              <span className={styles.listitemSpan}>
                Share <ShareIcon />
              </span>
            </li>
            <li style={ptSans.style}>
              <span className={styles.listitemSpan}>
                Add to Home Screen <PlusSquareIcon />
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
};

export default InstallInstructions;
