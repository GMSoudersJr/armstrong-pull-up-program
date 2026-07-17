import type { Metadata } from "next";
import styles from "./page.module.css";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Testimonials from "@/components/landing/Testimonials";
import Overview from "@/components/landing/Overview";
import FaqAccordion from "@/components/landing/FaqAccordion";
import InstallInstructions from "@/components/InstallInstructions";
import { ProgramPageLink } from "@/components/ProgramPageLink";

export const metadata: Metadata = {
  title: "Rep Yourself | Armstrong Pull-up Program App & Tracker",
  description:
    "Rep Yourself is a free Armstrong Pull-up Program app and tracker. Follow Major Armstrong's 5-day pull-up routine, time your rest, and track your reps from 3 to 20+. Offline-capable PWA.",
  alternates: { canonical: "/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Armstrong Pull-up Program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Armstrong Pull-up Program was developed by Major Charles Lewis Armstrong to prepare him to set a new world record in pull-ups. The program provides variety, overload, and regularity. Users typically achieve remarkable results in 6–8 weeks, with most reaching 20 repetitions as long as they remain consistent.",
      },
    },
    {
      "@type": "Question",
      name: "What is the morning push-up routine in the Armstrong Program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each morning, perform 3 maximum effort sets of push-ups. This strengthens the shoulder girdle and should be followed throughout the entire training period. The routine also helps alleviate soreness during the first couple of weeks.",
      },
    },
    {
      "@type": "Question",
      name: "How does the 5-day Armstrong pull-up training work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The program runs Monday through Friday (5 training days) followed by 2 rest days. Day 1 is five max effort sets. Day 2 is a pyramid. Day 3 is three training sets with three different grips. Day 4 is the maximum number of training sets possible. Day 5 repeats whichever day was hardest.",
      },
    },
    {
      "@type": "Question",
      name: "What is a training set in the Armstrong Pull-up Program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A training set has a fixed number of repetitions determined by the individual. It is calibrated on Day 3 — you must complete 9 training sets that day. If you successfully complete more than 9 sets on Day 4, increase your training set rep count by one the following week.",
      },
    },
    {
      "@type": "Question",
      name: "Can beginners or women do the Armstrong Pull-up Program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Women can adapt the program using the flexed arm hang — training sets translate to hang times. Chin-ups may be substituted for pull-ups, though Day 3 must still include 6 sets with overhand grip. Always consult a physician before starting any new physical training program.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Armstrong Pull-up Program — 5-Day Weekly Routine",
  description:
    "Build pull-up strength in 6–8 weeks with Major Armstrong's proven 5-day bodyweight calisthenics program.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Day 1 — Five Max Effort Sets",
      text: "Perform five maximum effort sets. Rest 90 seconds between each set. Focus on maximum effort, not numbers.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Day 2 — Pyramid",
      text: "Start with 1 rep, then 2, then 3, continuing until you miss a set. Perform one final maximum effort set. Rest 10 seconds for each rep in the previous set.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Day 3 — Three Training Sets, Three Grips",
      text: "Do 3 training sets normal grip, 3 sets close underhand grip, and 3 sets wide overhand grip. Rest 60 seconds between each set (9 sets total).",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Day 4 — Max Training Sets",
      text: "Perform as many training sets as possible with 60 seconds rest between sets until failure. If you complete more than 9 sets, increase your training set rep count next week.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Day 5 — Repeat Your Hardest Day",
      text: "Repeat whichever of the first four days was hardest for you. This may change week to week. Weighted pull-ups or a pull-up assist machine are also options.",
    },
  ],
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "WebApplication"],
  name: "Rep Yourself | Armstrong Pull-up Program",
  operatingSystem: "Web, Android, iOS",
  applicationCategory: "HealthApplication",
  description:
    "Free Armstrong Pull-up Program app and tracker. Follow Major Armstrong's 5-day pull-up routine, time your rest automatically, and track your progress offline.",
  url: "https://repyourself.app",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  // aggregateRating: {
  //   "@type": "AggregateRating",
  //   "ratingValue": "X.X",
  //   "ratingCount": "XX",
  // },
  // Add aggregateRating above once you have verified ratings from real users.
  // Fabricated ratings violate Google's structured data guidelines and can
  // result in a manual penalty. Only add this when you have genuine reviews
  // collected through a verifiable platform.
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <main className={styles.main}>
        <Hero />
        <Features />
        <Testimonials />
        <Overview />
        <FaqAccordion />
        <ProgramPageLink path="/program" label="Get started!" />
        <InstallInstructions />
        <Footer />
      </main>
    </>
  );
}
