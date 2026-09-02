"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BetaInviteBanner.module.css";
import { nunito, ptSans } from "@/fonts";
import { XIcon } from "lucide-react";
import { dbInitialized } from "@/data/indexedDB";
import {
  getBetaInviteState,
  setBetaInviteState,
  getLastCompletedDay,
} from "@/indexedDBActions";
import { TBetaInvite } from "@/definitions";
import { track } from "@/lib/track";

const emailAddress = "appsbygerald@gmail.com";
const MAX_TIMES_SHOWN = 3;
const MIN_DAYS_BETWEEN_SHOWS = 4;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
// Matches the CSS transition duration in BetaInviteBanner.module.css --
// keeps the component mounted for the length of the fade-out instead of
// snapping straight to unmounted.
const DISMISS_ANIMATION_MS = 200;

const iosMailto = `mailto:${emailAddress}?subject=${encodeURIComponent(
  "iOS Beta Interest",
)}&body=${encodeURIComponent(
  "Hey Gerald,\n\nI'd like to try the Rep Yourself iOS beta. My email for a TestFlight invite is:\n",
)}`;

const androidMailto = `mailto:${emailAddress}?subject=${encodeURIComponent(
  "Android Beta Interest",
)}&body=${encodeURIComponent(
  "Hey Gerald,\n\nI'd like to try the Rep Yourself Android beta. My email for a Play Store invite is:\n",
)}`;

const BetaInviteBanner = () => {
  const [visible, setVisible] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const dismissTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    dbInitialized
      .then(() => Promise.all([getBetaInviteState(), getLastCompletedDay()]))
      .then(([existing, lastCompletedDay]) => {
        if (!isMounted) return;

        // Don't show a beta-testing pitch to someone who hasn't completed a
        // single day yet -- on a brand-new install this would push the
        // "GET STARTED"/"TODAY'S WORKOUT" first-run CTA below the fold
        // before they've done a single rep.
        if (lastCompletedDay < 1) return;

        const state: TBetaInvite = existing ?? {
          id: "beta-invite",
          timesShown: 0,
          lastShownAt: null,
          dismissedPermanently: false,
        };

        const daysSinceLastShown =
          state.lastShownAt === null
            ? Infinity
            : (Date.now() - state.lastShownAt) / MS_PER_DAY;

        const shouldShow =
          !state.dismissedPermanently &&
          state.timesShown < MAX_TIMES_SHOWN &&
          daysSinceLastShown >= MIN_DAYS_BETWEEN_SHOWS;

        if (!shouldShow) return;

        setVisible(true);
        track("beta-banner-shown");
        setBetaInviteState({
          ...state,
          timesShown: state.timesShown + 1,
          lastShownAt: Date.now(),
        }).catch((err) => console.warn(err));
      })
      .catch((err) => console.warn(err));

    return () => {
      isMounted = false;
    };
  }, []);

  function dismissPermanently() {
    getBetaInviteState()
      .then((existing) => {
        const state: TBetaInvite = existing ?? {
          id: "beta-invite",
          timesShown: MAX_TIMES_SHOWN,
          lastShownAt: Date.now(),
          dismissedPermanently: false,
        };
        return setBetaInviteState({ ...state, dismissedPermanently: true });
      })
      .catch((err) => console.warn(err));
  }

  function startDismissAnimation() {
    setDismissing(true);
    dismissTimeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, DISMISS_ANIMATION_MS);
  }

  function handleDismiss() {
    track("beta-banner-dismissed");
    dismissPermanently();
    startDismissAnimation();
  }

  function handleCtaClick(platform: "ios" | "android") {
    track("beta-cta-click", { title: `${platform}-banner` });
    dismissPermanently();
    startDismissAnimation();
  }

  if (!visible) return null;

  return (
    <div
      id="beta-invite-banner"
      className={`${styles.banner} ${dismissing ? styles.dismissing : ""}`}
      role="complementary"
      aria-label="Beta testing invite"
    >
      <p style={ptSans.style}>
        Want early access? Join the iOS or Android beta.
      </p>
      <div className={styles.ctaGroup}>
        <a
          href={iosMailto}
          style={nunito.style}
          className={styles.ctaButton}
          onClick={() => handleCtaClick("ios")}
        >
          iOS
        </a>
        <a
          href={androidMailto}
          style={nunito.style}
          className={styles.ctaButton}
          onClick={() => handleCtaClick("android")}
        >
          Android
        </a>
      </div>
      <button
        id="beta-invite-banner-close-button"
        type="button"
        className={styles.closeButton}
        onClick={handleDismiss}
        aria-label="Dismiss beta invite"
      >
        <XIcon className={styles.icon} />
      </button>
    </div>
  );
};

export default BetaInviteBanner;
