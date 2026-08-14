import Link from "next/link";
import React from "react";
import styles from "./Support.module.css";

const emailAddress = "support@repyourself.app";

export default function Support() {
  return (
    <div className={styles.support}>
      <h1>Rep Yourself - Support</h1>
      <section id="introduction">
        <p>
          Need help with Rep Yourself? Below are answers to common questions. If
          you don't find what you're looking for, reach out directly and we'll
          get back to you.
        </p>
      </section>
      <ol className={styles.orderedList}>
        <li className={styles.listitem}>
          <section id="offline-data">
            <h6>Where is my data stored?</h6>
            <p>
              Rep Yourself has no user accounts and no backend server. All of
              your workout history and progress is stored locally on your
              device, and the app works fully offline.
            </p>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="backup-data">
            <h6>How do I back up or transfer my data?</h6>
            <p>
              From the app's Settings screen, use{" "}
              <strong>Download Workout History</strong> to save your workout
              history as a JSON file, which you can keep as a backup or use to
              move your data to another device.
            </p>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="reset-data">
            <h6>How do I reset my progress?</h6>
            <p>
              From the app's Settings screen, use <strong>Reset Program</strong>{" "}
              to permanently erase all locally stored workouts and progress and
              start the program over. This cannot be undone.
            </p>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="analytics-optout">
            <h6>How do I opt out of anonymous usage data?</h6>
            <p>
              From the app's Settings screen, turn off the "Share anonymous
              usage data" toggle. See the{" "}
              <Link href="/privacy">Privacy Policy</Link> for details on what is
              collected and why.
            </p>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="contact">
            <h6>Still need help?</h6>
            <p>
              Contact us at{" "}
              <Link href={`mailto:${emailAddress}`}>{emailAddress}</Link> and
              we'll get back to you as soon as we can.
            </p>
          </section>
        </li>
      </ol>
    </div>
  );
}
