import { nunito } from "@/fonts";
import styles from "./Hero.module.css";
import PullupSVG from "@/components/PullupSVG";
import LandingNavbar from "@/components/landing/Navbar";
import { ProgramPageLink } from "@/components/ProgramPageLink";

const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <LandingNavbar />
      <div className={styles.heroLeft}>
        <h1 style={nunito.style}>
          Rep Yourself: The Armstrong Pull-up Program App
        </h1>
        <h2 style={nunito.style}>
          Master pull-ups with the Armstrong Pull-up Program.
        </h2>
        <ProgramPageLink label="learn more" path="/#features" />
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
