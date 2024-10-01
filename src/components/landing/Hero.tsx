import { nunito } from "@/fonts";
import styles from "./Hero.module.css";
import PullupSVG from "@/components/PullupSVG";
import LandingNavbar from "@/components/landing/Navbar";
import { PageLink } from "@/components/PageLink";

const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <LandingNavbar />
      <div className={styles.heroLeft}>
        <h1 style={nunito.style}>Master Pull-Ups with Our App!</h1>
        <h3 style={nunito.style}>
          Use the Armstrong Pull-up Program to achieve your pull-up goals!
        </h3>
        <PageLink label="learn more" path="/#features" />
      </div>

      <div className={styles.heroRight}>
        <div className={styles.svgWrapper}>
          <PullupSVG />
        </div>
      </div>
    </section>
  );
};

export default Hero;
