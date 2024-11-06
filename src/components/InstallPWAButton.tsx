"use client";

import { DownloadIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import styles from "./InstallPWAButton.module.css";
import { nunito } from "@/fonts";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPWAButton = () => {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      deferredPrompt.current = event as BeforeInstallPromptEvent;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  async function handleInstall() {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
      const { outcome } = await deferredPrompt.current.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else if (outcome === "dismissed") {
        console.log("User dismissed the install prompt");
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleInstall}
      className={styles.installButton}
      style={nunito.style}
    >
      <span className={styles.iconWrapper}>
        <DownloadIcon className={styles.downloadIcon} />
      </span>
      <strong>INSTALL THE APP!</strong>
    </button>
  );
};

export default InstallPWAButton;
