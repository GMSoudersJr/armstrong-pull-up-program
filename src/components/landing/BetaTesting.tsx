"use client";

import Link from "next/link";
import styles from "./BetaTesting.module.css";
import { nunito, ptSans } from "@/fonts";
import { RocketIcon } from "lucide-react";
import { track } from "@/lib/track";

const emailAddress = "appsbygerald@gmail.com";

const androidMailto = `mailto:${emailAddress}?subject=${encodeURIComponent(
  "Android Beta Interest",
)}&body=${encodeURIComponent(
  "Hey Gerald,\n\nI'd like to try the Rep Yourself Android beta. My email for a Play Store invite is:\n",
)}`;

const BetaTesting = () => {
  return (
    <section id="beta-testing" className={styles.betaTesting}>
      <RocketIcon className={styles.icon} />
      <h2 style={nunito.style}>ANDROID APP COMING SOON</h2>
      <p style={ptSans.style}>
        The Android app is coming soon to Google Play. Want early access? Email
        me below and I&apos;ll send you a beta invite as soon as a build is
        ready.
      </p>
      <div className={styles.ctaGroup}>
        <Link
          href={androidMailto}
          style={nunito.style}
          className={styles.ctaButton}
          onClick={() => track("beta-cta-click", { title: "android" })}
        >
          JOIN ANDROID BETA
        </Link>
      </div>
    </section>
  );
};

export default BetaTesting;
