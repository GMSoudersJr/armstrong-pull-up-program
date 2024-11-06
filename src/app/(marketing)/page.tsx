import styles from "./page.module.css";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Testimonials from "@/components/landing/Testimonials";
import Overview from "@/components/landing/Overview";
import FaqAccordion from "@/components/landing/FaqAccordion";
import InstallInstructions from "@/components/InstallInstructions";
import { ProgramPageLink } from "@/components/ProgramPageLink";

export default function Home() {
  return (
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
  );
}
