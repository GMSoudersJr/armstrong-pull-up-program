import type { Metadata } from "next";
import styles from "./page.module.css";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import BetaTesting from "@/components/landing/BetaTesting";
import Footer from "@/components/landing/Footer";
import Testimonials from "@/components/landing/Testimonials";
import Overview from "@/components/landing/Overview";
import FaqAccordion from "@/components/landing/FaqAccordion";
import InstallInstructions from "@/components/InstallInstructions";
import { ProgramPageLink } from "@/components/ProgramPageLink";
import { FAQ } from "@/data/faq";

export const metadata: Metadata = {
  // absolute: skip the root layout's "%s | Rep Yourself" template, which
  // would append the brand a second time.
  title: { absolute: "Rep Yourself | Armstrong Pull-up Program App & Tracker" },
  description:
    "Rep Yourself is a free Armstrong Pull-up Program app and tracker. Follow Major Armstrong's 5-day pull-up routine, time your rest, and track your reps from 3 to 20+. Offline-capable PWA.",
  alternates: { canonical: "/" },
};

// Built from the same data the FAQ accordion renders, so the structured
// data always matches what's visible on the page.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((faq) => ({
    "@type": "Question",
    name: faq.heading,
    acceptedAnswer: { "@type": "Answer", text: faq.body.join(" ") },
  })),
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
      <main className={styles.main}>
        <Hero />
        <Features />
        <Testimonials />
        <Overview />
        <FaqAccordion />
        <ProgramPageLink path="/program" label="Get started!" />
        <InstallInstructions />
        <BetaTesting />
        <Footer />
      </main>
    </>
  );
}
