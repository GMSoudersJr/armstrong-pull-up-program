"use client";

import styles from "./InstallInstructions.module.css";
import { nunito, ptSans } from "@/fonts";
import InstallPWAButton from "./InstallPWAButton";
import AppStoreBadge from "./AppStoreBadge";
import { APP_STORE_INSTALL_URL } from "@/lib/appStore";
import { GlobeIcon, MonitorDownIcon, MoveDownIcon } from "lucide-react";

const InstallInstructions = () => {
  return (
    <section className={styles.installInstructionsSection}>
      <h2 style={nunito.style}>APP INSTALLATION</h2>
      <div className={styles.intstallInstructions}>
        <div id="mostDevices">
          <h2 style={nunito.style}>MOST DEVICES</h2>
          <ol className={styles.list}>
            <li style={ptSans.style}>
              <span className={styles.listitemSpan}>
                Open site in Chrome browser <GlobeIcon />
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

        <div id="iosDevices">
          <h2 style={nunito.style}>iOS DEVICES</h2>
          <p style={ptSans.style}>Get the native app on the App Store</p>
          <AppStoreBadge href={APP_STORE_INSTALL_URL} placement="install" />
        </div>
      </div>
    </section>
  );
};

export default InstallInstructions;
