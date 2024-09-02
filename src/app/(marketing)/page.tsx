import styles from "./page.module.css";
import {PageLink} from "@/components/PageLink";
import Hero from "@/components/homepage/Hero";
import Features from "@/components/homepage/Features";
import Footer from "@/components/homepage/Footer";
import Testimonials from "@/components/homepage/Testimonials";
import Overview from "@/components/homepage/Overview";
import FaqAccordion from "@/components/homepage/FAQ";

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
        label='program'
      />
      <Footer />
    </main>
  );
};
