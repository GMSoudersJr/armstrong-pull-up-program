import LandingNavbar from "@/components/homepage/Navbar";
import styles from "./page.module.css";
import {PageLink} from "@/components/PageLink";
import Hero from "@/components/homepage/Hero";
import Features from "@/components/homepage/Features";
import Footer from "@/components/homepage/Footer";
import Testimonials from "@/components/homepage/Testimonials";
import ProgramOverview from "@/components/homepage/ProgramOverview";
import FaqAccordion from "@/components/homepage/FAQ";

export default function Home() {
  return (
    <main className={styles.main}>
      <LandingNavbar />
      <Hero />
      <Features />
      <Testimonials />
      <ProgramOverview />
      <PageLink
        path='/program'
        label='program'
      />
      <Footer />
    </main>
  );
};
