import LandingNavbar from "@/components/homepage/Navbar";
import styles from "./page.module.css";
import {PageLink} from "@/components/PageLink";
import Hero from "@/components/homepage/Hero";
import Features from "@/components/homepage/Features";
import Footer from "@/components/homepage/Footer";
import Testimonials from "@/components/homepage/Testimonials";
import ProgramOverview from "@/components/homepage/ProgramOverview";

const PAGES = [
  {
    label: 'overview',
    path: '/overview'
  },
  {
    label: 'program',
    path: '/program'
  }
];

export default function Home() {
  return (
    <main className={styles.main}>
      <LandingNavbar />
      <Hero />
      <Features />
      <Testimonials />
      <ProgramOverview />
      <div className={styles.pageLinkFlex}>
        {PAGES.map((page) => {
          return (
            <PageLink
              key={page.path}
              path={page.path}
              label={page.label}
            />
          );
        })}

      </div>
      <Footer />
    </main>
  );
};
