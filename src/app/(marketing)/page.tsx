import styles from "./page.module.css";
import {PageLink} from "@/components/PageLink";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Testimonials from "@/components/landing/Testimonials";
import Overview from "@/components/landing/Overview";
import FaqAccordion from "@/components/landing/FaqAccordion";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Features />
      <Testimonials />
      <Overview />
      <FaqAccordion />
      <PageLink
        path='/program'
        label='GET Started!'
      />
      <Footer />
    </main>
  );
};
