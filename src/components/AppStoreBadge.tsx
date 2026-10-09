"use client";

import Image from "next/image";
import styles from "./AppStoreBadge.module.css";
import { track } from "@/lib/track";

interface AppStoreBadgeProps {
  href: string;
  // GoatCounter event title, e.g. "hero" or "install"
  placement: string;
}

// Apple's official badge artwork, used unmodified per Apple's marketing
// guidelines (https://developer.apple.com/app-store/marketing/guidelines/).
const AppStoreBadge = ({ href, placement }: AppStoreBadgeProps) => {
  return (
    <a
      href={href}
      className={styles.appStoreBadge}
      onClick={() => track("app-store-click", { title: placement })}
    >
      <Image
        src="/images/badges/download-on-the-app-store.svg"
        alt="Download on the App Store"
        width={120}
        height={40}
      />
    </a>
  );
};

export default AppStoreBadge;
