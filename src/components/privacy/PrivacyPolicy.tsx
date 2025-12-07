import Link from "next/link";
import React from "react";
import styles from "./PrivacyPolicy.module.css";

const lastUpdatedDate = "December 8th, 2025";
const mainGooglePrivacyPolicy = "https://policies.google.com/privacy";
const otherGooglePrivacyPolicy =
  "https://policies.google.com/technologies/partner-sites";
const emailAddress = "repyourself.privacy@gmail.com";

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
              your fitness goals. To improve your experience, our app uses
              anonymous analytics to understand how its features are used. This
              Privacy Policy explains what data is collected, why it is
              collected, and how you can control it. Your privacy and trust are
              our top priorities.
            </p>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="information-collection">
            <h6>What Information We Collect</h6>
            <p>
              Rep Yourself collects anonymous, non-personal data to help us
              improve the app. We do not collect personal information like your
              name or email, and we do not track or store the specific number of
              reps or sets you perform in your workouts. The anonymous
              information we collect falls into two categories:
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
            </ul>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="sharing-information">
            <h6>How We Use This Information</h6>
            <p>
              We use this anonymous and aggregated data for one purpose: to make
              Rep Yourself a better app.
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
              To provide our services and to understand how our app is used, Rep
              Yourself relies on third-party services that may collect
              information from your device. We do not share your data with any
              third parties other than those listed below, which are essential
              for the app`&apos`s functionality and improvement.
            </p>
            <ul className={styles.unorderedList}>
              <li className={styles.listitem}>
                <strong>Firebase Analytics (a Google Service) </strong>
                <p>
                  We use Firebase Analytics to collect the anonymous usage and
                  diagnostic data described in this policy. This service helps
                  us understand user behavior, identify popular features, and
                  diagnose bugs. The data sent to Firebase is aggregated and
                  does not personally identify you.
                </p>
                <p>
                  As Firebase is a Google product, its use is governed by
                  Google`&apos`s privacy practices. We strongly encourage you to
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
                </ul>
              </li>
            </ul>
          </section>
        </li>
        <li className={styles.listitem}>
          <section id="choices-opt-out">
            <h6>Your Choices and How to Opt-Out</h6>
            <p>
              You are in full control of your data. You can choose to disable
              the collection of anonymous usage data at any time. To do so,
              please navigate to the Settings screen within the Rep Yourself app
              and turn off the `&quot`Share anonymous usage data`&quot` toggle.
              This will stop any future data from being sent.
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
              upholding these rights. While our app collects only anonymous and
              non-personal usage data, we recognize your rights to:
            </p>
            <ul className={styles.unorderedList}>
              <li className={styles.listitem}>
                <strong>
                  The right to access, update, or delete the information we have
                  on you.{" "}
                </strong>
                Since the data we collect is anonymous, we cannot identify and
                retrieve data for a specific person. However, you can
                effectively delete your data by resetting the app`&apos`s
                advertising ID or by using the `&quot`Reset Program`&quot`
                function, which deletes all locally stored workout history.
              </li>
              <li className={styles.listitem}>
                <strong>The right of rectification. </strong>If you believe any
                data is inaccurate, you have the right to have it rectified.
              </li>
              <li className={styles.listitem}>
                <strong>The right to object. </strong>You have the right to
                object to our processing of your data. You can exercise this
                right by disabling analytics collection in the app`&apos`s
                Settings screen.
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
          <section id="california-privacy"></section>
          <h6>Your California Privacy Rights (CCPA/CPRA)</h6>
          <p>
            If you are a California resident, you have specific rights under the
            California Consumer Privacy Act (CCPA) and the California Privacy
            Rights Act (CPRA).
          </p>
          <ul className={styles.unorderedList}>
            <li className={styles.listitem}>
              <strong>Right to Know and Access: </strong>You have the right to
              know what categories of information we collect and the purposes
              for which we use it. This is outlined in the `&quot`Information We
              Collect`&quot` and `&quot`How We Use This Information`&quot`
              sections of this policy.
            </li>
            <li className={styles.listitem}>
              <strong>Right to Opt-Out of Sale or Sharing: </strong>Rep Yourself
              does not sell or share your personal information with third
              parties for cross-context behavioral advertising. As such, there
              is no `&quot`sale`&quot` or `&quot`sharing`&quot` to opt out of.
              We only share anonymous data with our analytics provider, Google,
              for the sole purpose of improving our own app.
            </li>
            <li className={styles.listitem}>
              <strong>
                Right to Limit Use of Sensitive Personal Information:{" "}
              </strong>
              We do not collect `&quot`Sensitive Personal Information`&quot` as
              defined by California law.
            </li>
            <li className={styles.listitem}>
              <strong>Right to Deletion: </strong>You have the right to request
              the deletion of your information. This can be accomplished by
              using the `&quot`Reset Program`&quot` function in the app`&apos`s
              settings, which will permanently delete all your stored workout
              data.
            </li>
            <li className={styles.listitem}>
              <strong>Non-Discrimination: </strong> We will not discriminate
              against you for exercising any of your CCPA/CPRA rights.
            </li>
          </ul>
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
              If you have any questions or suggestions about the Privacy Policy,
              do not hesitate to contact me.
            </p>
            <p>{emailAddress}</p>
          </section>
        </li>
      </ol>
    </div>
  );
}
