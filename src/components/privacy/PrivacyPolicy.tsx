import Link from "next/link";
import React from "react";
import styles from "./PrivacyPolicy.module.css";

const lastUpdatedDate = "September 23rd, 2026";
const mainGooglePrivacyPolicy = "https://policies.google.com/privacy";
const otherGooglePrivacyPolicy =
  "https://policies.google.com/technologies/partner-sites";
const googleDataProcessingTerms =
  "https://business.safety.google/adsprocessorterms/";
const goatCounterPrivacyPolicy = "https://www.goatcounter.com/help/privacy";
const emailAddress = "privacy@repyourself.app";

export default function PrivacyPolicy() {
  return (
    <div className={styles.privacyPolicy}>
      <h1>Rep Yourself - Privacy Policy</h1>
      <section id="last-updated">
        <p>
          last updated: <time>{lastUpdatedDate}</time>
        </p>
      </section>
      <ol className={styles.orderedList}>
        <li className={styles.listitem}>
          <section id="introduction">
            <h6>Introduction</h6>
            <p>
              Welcome to Rep Yourself! Our commitment is to help you achieve
              your fitness goals. This Privacy Policy applies to the Rep
              Yourself iOS and Android apps and to the Rep Yourself web app at
              repyourself.app. To improve your experience, our apps use
              analytics that are not linked to your identity to understand how
              their features are used. This Privacy Policy explains what data is
              collected, why it is collected, how long it is kept, and how you
              can control it. Your privacy and trust are our top priorities.
            </p>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="information-collection">
            <h6>What Information We Collect</h6>
            <p>
              Rep Yourself collects a limited amount of usage and diagnostic
              data to help us improve the app. This data is not linked to your
              identity: we do not collect personal information like your name or
              email, and we do not collect the specific number of reps or sets
              you perform in your workouts. Your workout history is stored only
              on your device and is never sent to us.
            </p>
            <p>
              <strong>In the iOS and Android apps</strong>, the following is
              collected through Firebase Analytics:
            </p>
            <ul className={styles.unorderedList}>
              <li className={styles.listitem}>
                <strong>App Usage Information: </strong>
                We log key events to understand how you interact with the app.
                This includes actions like starting a new program, choosing a
                grip type on Day 3, starting or skipping a workout, and viewing
                your workout history.
              </li>
              <li className={styles.listitem}>
                <strong>Diagnostic Information: </strong>
                To keep the app running smoothly, we collect data about
                technical events. This includes tracking when a data migration
                from the old app fails and the general reason for the failure,
                such as an invalid file format. We also note whether permissions
                for features like notifications are granted or denied.
              </li>
              <li className={styles.listitem}>
                <strong>App Instance Identifier: </strong>
                Firebase assigns a random identifier to each installation of the
                app so that events from the same installation can be counted
                together. This identifier is not tied to your name, email, or
                any other personal information, and a new one is created if you
                uninstall and reinstall the app.
              </li>
              <li className={styles.listitem}>
                <strong>Approximate Location: </strong>
                Google Analytics derives a general location, such as your
                country or city, from a masked version of your IP address. The
                app does not use GPS or Location Services and never asks for
                location permission.
              </li>
              <li className={styles.listitem}>
                <strong>Advertising Identifier: </strong>
                The iOS app does not collect the advertising identifier (IDFA)
                and does not track you. On Android, the analytics service may
                collect your device's Android Advertising ID. It is used only
                for analytics and never for advertising or tracking. You can
                reset or delete it at any time from your device's Settings under
                Privacy → Ads.
              </li>
            </ul>
            <p>
              <strong>In the web app</strong>, the following is collected
              through GoatCounter, a privacy-friendly analytics service:
            </p>
            <ul className={styles.unorderedList}>
              <li className={styles.listitem}>
                <strong>Page and Event Counts: </strong>
                The pages you visit and a few key events, such as opening the
                app, installing it to your home screen, starting or completing a
                workout, and viewing or dismissing the beta invitation.
              </li>
              <li className={styles.listitem}>
                <strong>General Technical Information: </strong>
                Your browser and operating system name, screen size, preferred
                language, the website that referred you, and your country (plus
                state or region for visitors in the United States, Russia, and
                China), derived from your IP address.
              </li>
            </ul>
            <p>
              GoatCounter does not use cookies or store anything in your browser
              to track you, and it never stores your IP address or your
              browser's full identifying information. To avoid counting the same
              visitor twice, it keeps a random identifier in memory for up to 8
              hours, after which it is discarded. Only aggregated counts are
              stored.
            </p>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="sharing-information">
            <h6>How We Use This Information</h6>
            <p>
              We use this data for one purpose: to make Rep Yourself a better
              app. We never use it for advertising, we never use it to track you
              across other apps or websites, and we never sell it.
            </p>
            <ul className={styles.unorderedList}>
              <li className={styles.listitem}>
                <strong>To Improve Features: </strong>
                By seeing which features are used most and where users might be
                having trouble, we can focus our efforts on making the app more
                intuitive and effective. For example, if we notice many users
                skip a particular workout, we can investigate if it needs to be
                adjusted.
              </li>
              <li className={styles.listitem}>
                <strong>To Fix Bugs: </strong>
                Diagnostic information helps us quickly identify, diagnose, and
                fix bugs and crashes. Seeing patterns in migration errors, for
                instance, allows us to make the process more reliable for
                everyone.
              </li>
              <li className={styles.listitem}>
                <strong>To Make Better Decisions: </strong>
                Understanding how the app is used helps us make informed
                decisions about what new features to build and which to improve,
                ensuring we spend our time on what matters most to our users.
              </li>
            </ul>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="third-party-services">
            <h6>Third-Party Services & Data Sharing</h6>
            <p>
              To understand how our apps are used, Rep Yourself relies on the
              third-party analytics services listed below. We do not share your
              data with any third parties other than these. Each of them
              provides the same or greater protection of your data as described
              in this Privacy Policy.
            </p>
            <ul className={styles.unorderedList}>
              <li className={styles.listitem}>
                <strong>Firebase Analytics (a Google Service) </strong>
                <p>
                  The iOS and Android apps use Firebase Analytics to collect the
                  usage and diagnostic data described in this policy. Google
                  processes this data on our behalf, as our service provider,
                  under the Google Ads Data Processing Terms. We have turned off
                  sharing this data with Google to improve Google's own products
                  and services. Google may use aggregated, de-identified
                  measurement data to provide benchmarking and business
                  insights.
                </p>
                <p>
                  As Firebase is a Google product, its use is governed by
                  Google's privacy practices. We strongly encourage you to
                  review their policies to understand how they handle data.
                </p>
                <ul className={styles.unorderedList}>
                  <li className={styles.listitem}>
                    <strong>Google Privacy Policy: </strong>
                    <Link href={mainGooglePrivacyPolicy} target="_blank">
                      {mainGooglePrivacyPolicy}
                    </Link>
                  </li>
                  <li className={styles.listitem}>
                    <strong>
                      How Google uses information from sites or apps that use
                      our services:{" "}
                    </strong>
                    <Link href={otherGooglePrivacyPolicy} target="_blank">
                      {otherGooglePrivacyPolicy}
                    </Link>
                  </li>
                  <li className={styles.listitem}>
                    <strong>Google Ads Data Processing Terms: </strong>
                    <Link href={googleDataProcessingTerms} target="_blank">
                      {googleDataProcessingTerms}
                    </Link>
                  </li>
                </ul>
              </li>
              <li className={styles.listitem}>
                <strong>GoatCounter </strong>
                <p>
                  The web app uses GoatCounter to collect the page and event
                  counts described in this policy. GoatCounter does not share
                  any information with third parties.
                </p>
                <ul className={styles.unorderedList}>
                  <li className={styles.listitem}>
                    <strong>GoatCounter Privacy Policy: </strong>
                    <Link href={goatCounterPrivacyPolicy} target="_blank">
                      {goatCounterPrivacyPolicy}
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="data-retention">
            <h6>Data Retention and Deletion</h6>
            <ul className={styles.unorderedList}>
              <li className={styles.listitem}>
                <strong>Firebase Analytics: </strong>
                Event-level data and data associated with the app instance
                identifier is automatically deleted after 2 months. Aggregated
                reports, which cannot identify any individual user or
                installation, may be kept longer.
              </li>
              <li className={styles.listitem}>
                <strong>GoatCounter: </strong>
                Only aggregated counts are stored, and they cannot be linked
                back to you. They are kept for as long as they are needed to
                improve the app and are permanently deleted if our GoatCounter
                account is closed, with any backups removed within 30 days.
              </li>
              <li className={styles.listitem}>
                <strong>Your Workout Data: </strong>
                Your workout history stays on your device until you delete it,
                either by using the "Reset Program" function in the app's
                settings, by uninstalling the app, or, for the web app, by
                clearing this site's data in your browser.
              </li>
              <li className={styles.listitem}>
                <strong>Requesting Deletion: </strong>
                You can request deletion of your data at any time by emailing{" "}
                <Link href={`mailto:${emailAddress}`}>{emailAddress}</Link>.
                Because the data we collect is not linked to your identity, we
                may be unable to locate data belonging to a specific person.
                Uninstalling the app creates a new app instance identifier, so
                data collected afterward cannot be linked to data collected
                before.
              </li>
            </ul>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="choices-opt-out">
            <h6>Your Choices and How to Opt-Out</h6>
            <p>
              You are in full control of your data. In the iOS and Android apps,
              you can withdraw your consent to analytics at any time. To do so,
              please navigate to the Settings screen within the Rep Yourself app
              and turn off the "Share anonymous usage data" toggle. This will
              stop any future data from being sent.
            </p>
            <p>
              The web app does not have an in-app analytics toggle, but you can
              stop GoatCounter from counting your visits by using any content
              blocker or privacy extension that blocks GoatCounter.
            </p>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="gdpr-privacy">
            <h6>Your Rights Under GDPR</h6>
            <p>
              If you are a resident of the European Economic Area (EEA), you
              have certain data protection rights under the General Data
              Protection Regulation (GDPR). Rep Yourself is committed to
              upholding these rights. While our apps collect only usage data
              that is not linked to your identity, we recognize your rights to:
            </p>
            <ul className={styles.unorderedList}>
              <li className={styles.listitem}>
                <strong>
                  The right to access, update, or delete the information we have
                  on you.{" "}
                </strong>
                Since the data we collect is not linked to your identity, we
                cannot identify and retrieve data for a specific person.
                However, you can effectively delete your data by uninstalling
                and reinstalling the app, which resets its app instance
                identifier, or by using the "Reset Program" function, which
                deletes all locally stored workout history.
              </li>
              <li className={styles.listitem}>
                <strong>The right of rectification. </strong>If you believe any
                data is inaccurate, you have the right to have it rectified.
              </li>
              <li className={styles.listitem}>
                <strong>The right to object. </strong>You have the right to
                object to our processing of your data. You can exercise this
                right by disabling analytics collection in the app's Settings
                screen.
              </li>
              <li className={styles.listitem}>
                <strong>The right of portability. </strong>You have the right to
                be provided with a copy of your data in a structured,
                machine-readable format. Your workout history can be exported
                from the app for this purpose.
              </li>
              <li className={styles.listitem}>
                <strong>The right to withdraw consent. </strong>You have the
                right to withdraw your consent at any time where Rep Yourself
                relied on your consent to process your information. You can do
                this by toggling off analytics in the Settings screen.
              </li>
            </ul>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="california-privacy">
            <h6>Your California Privacy Rights (CCPA/CPRA)</h6>
            <p>
              If you are a California resident, you have specific rights under
              the California Consumer Privacy Act (CCPA) and the California
              Privacy Rights Act (CPRA).
            </p>
            <ul className={styles.unorderedList}>
              <li className={styles.listitem}>
                <strong>Right to Know and Access: </strong>You have the right to
                know what categories of information we collect and the purposes
                for which we use it. This is outlined in the "What Information
                We Collect" and "How We Use This Information" sections of this
                policy.
              </li>
              <li className={styles.listitem}>
                <strong>Right to Opt-Out of Sale or Sharing: </strong>Rep
                Yourself does not sell or share your personal information with
                third parties for cross-context behavioral advertising. As such,
                there is no "sale" or "sharing" to opt out of. We only share
                usage data with our analytics providers, Google (Firebase
                Analytics) and GoatCounter, for the sole purpose of improving
                our own app.
              </li>
              <li className={styles.listitem}>
                <strong>
                  Right to Limit Use of Sensitive Personal Information:{" "}
                </strong>
                We do not collect "Sensitive Personal Information" as defined by
                California law.
              </li>
              <li className={styles.listitem}>
                <strong>Right to Deletion: </strong>You have the right to
                request the deletion of your information. This can be
                accomplished by using the "Reset Program" function in the app's
                settings, which will permanently delete all your stored workout
                data. See "Data Retention and Deletion" above for more options.
              </li>
              <li className={styles.listitem}>
                <strong>Non-Discrimination: </strong> We will not discriminate
                against you for exercising any of your CCPA/CPRA rights.
              </li>
            </ul>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="privacy-policy-changes">
            <h6>Changes to This Privacy Policy</h6>
            <p>
              I may update our Privacy Policy from time to time. Thus, you are
              advised to review this page periodically for any changes. I will
              notify you of any changes by posting the new Privacy Policy on
              this page. These changes are effective immediately after they are
              posted on this page.
            </p>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="contact">
            <h6>Contact</h6>
            <p>
              If you have any questions, suggestions, or requests regarding your
              data — including access, correction, or deletion requests — do not
              hesitate to contact us at{" "}
              <Link href={`mailto:${emailAddress}`}>{emailAddress}</Link>.
            </p>
          </section>
        </li>
      </ol>
    </div>
  );
}
