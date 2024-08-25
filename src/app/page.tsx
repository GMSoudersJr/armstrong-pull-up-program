import LandingNavbar from "@/components/homepage/Navbar";
import styles from "./page.module.css";
import HomePageTitle from "@/components/homepage/Title";
import {PageLink} from "@/components/PageLink";
import Hero from "@/components/homepage/Hero";
import Features from "@/components/homepage/Features";
import Footer from "@/components/homepage/Footer";
import Testimonials from "@/components/homepage/Testimonials";
import Pricing from "@/components/homepage/Pricing";

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
      <HomePageTitle />
      <Pricing />
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
