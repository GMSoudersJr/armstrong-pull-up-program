'use client';

import styles from './InstallInstructions.module.css';
import {nunito, ptSans} from "@/fonts";
import InstallPWAButton from './InstallPWAButton';
import {
  ChromeIcon,
  CompassIcon,
  DockIcon,
  MonitorDownIcon,
  MoveDownIcon,
  PlusSquareIcon,
  ShareIcon
} from 'lucide-react';

const InstallInstructions = () => {

  return (
    <section className={styles.installInstructionsSection}>
      <h1 style={nunito.style}>APP INSTALLATION</h1>
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
                Add to Home Screen <PlusSquareIcon /> or
              </span>
            </li>
            <li style={ptSans.style}>
              <span className={styles.listitemSpan}>
                Add to Dock <DockIcon />
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
};

export default InstallInstructions;
