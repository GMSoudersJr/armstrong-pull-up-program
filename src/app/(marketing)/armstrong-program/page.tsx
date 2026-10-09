import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { nunito, ptSans } from "@/fonts";
import LandingNavbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import AppStoreBadge from "@/components/AppStoreBadge";
import { ProgramPageLink } from "@/components/ProgramPageLink";
import { APP_STORE_FAQ_URL } from "@/lib/appStore";
import {
  ARMSTRONG_PROGRAM_SOURCE_URL,
  PROGRAM_DAYS,
  PROGRAM_DETAILS,
  PROGRAM_INTRO,
  TProgramSection,
} from "@/data/armstrongProgram";

export const metadata: Metadata = {
  title: "The Armstrong Pull-up Program: Full 5-Day Routine Explained",
  description:
    "A complete guide to Major Armstrong's pull-up program: the morning push-up routine, all five training days with rest times, how to size your training sets, and what to expect week to week.",
  alternates: { canonical: "/armstrong-program" },
};

// Days 1-5 only; the rest days aren't steps to perform.
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Armstrong Pull-up Program: 5-Day Weekly Routine",
  description:
    "Build pull-up strength with Major Armstrong's 5-day bodyweight program.",
  step: PROGRAM_DAYS.slice(0, 5).map((day, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: day.heading,
    text: day.steps?.join(" "),
  })),
};

const ProgramSection = ({ section }: { section: TProgramSection }) => {
  return (
    <section id={section.id} className={styles.section}>
      <h2 style={nunito.style}>{section.heading}</h2>
      {section.paragraphs?.map((paragraph, i) => (
        <p key={i} style={ptSans.style}>
          {paragraph}
        </p>
      ))}
      {section.steps && (
        <ul className={styles.steps}>
          {section.steps.map((step, i) => (
            <li key={i} style={ptSans.style}>
              {step}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default function ArmstrongProgramPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <LandingNavbar />
      <main className={styles.main}>
        <article className={styles.article}>
          <h1 style={nunito.style}>The Armstrong Pull-up Program</h1>
          <p className={styles.credit} style={ptSans.style}>
            Created by Major Charles Lewis Armstrong, USMC. Explained here in
            our own words. Read{" "}
            <Link
              href={ARMSTRONG_PROGRAM_SOURCE_URL}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              the original program (PDF)
            </Link>
            .
          </p>

          {PROGRAM_INTRO.map((section) => (
            <ProgramSection key={section.id} section={section} />
          ))}

          <h2 className={styles.groupHeading} style={nunito.style}>
            The weekly routine
          </h2>
          {PROGRAM_DAYS.map((section) => (
            <ProgramSection key={section.id} section={section} />
          ))}

          {PROGRAM_DETAILS.map((section) => (
            <ProgramSection key={section.id} section={section} />
          ))}

          <section className={styles.ctaSection}>
            <h2 style={nunito.style}>Start the program</h2>
            <p style={ptSans.style}>
              Rep Yourself walks you through each day, times your rest, and
              tracks your progress.
            </p>
            <div className={styles.ctas}>
              <AppStoreBadge href={APP_STORE_FAQ_URL} placement="faq" />
              <ProgramPageLink label="Start in browser" path="/program" />
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
