"use client";

import Link from "next/link";
import styles from "./BetaTesting.module.css";
import { nunito, ptSans } from "@/fonts";
import { RocketIcon } from "lucide-react";
import { track } from "@/lib/track";

const emailAddress = "appsbygerald@gmail.com";

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

const BetaTesting = () => {
  return (
    <section id="beta-testing" className={styles.betaTesting}>
      <RocketIcon className={styles.icon} />
      <h2 style={nunito.style}>NATIVE APPS ARE COMING</h2>
      <p style={ptSans.style}>
        iOS and Android apps are in development, and I&apos;m looking for beta
        testers. Email me your platform below and I&apos;ll send you an invite
        link as soon as a build is ready.
      </p>
      <div className={styles.ctaGroup}>
        <Link
          href={iosMailto}
          style={nunito.style}
          className={styles.ctaButton}
          onClick={() => track("beta-cta-click", { title: "ios" })}
        >
          JOIN iOS BETA
        </Link>
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
