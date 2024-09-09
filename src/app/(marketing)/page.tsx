import styles from "./page.module.css";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Testimonials from "@/components/landing/Testimonials";
import Overview from "@/components/landing/Overview";
import FaqAccordion from "@/components/landing/FaqAccordion";
import {TransitionLink} from "@/components/TransitionLink";
import InstallPWAButton from "@/components/InstallPWAButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Features />
      <Testimonials />
      <Overview />
      <FaqAccordion />
      <TransitionLink href='/program'>GET STARTED!</TransitionLink>
      <InstallPWAButton />
      <Footer />
    </main>
  );
};
