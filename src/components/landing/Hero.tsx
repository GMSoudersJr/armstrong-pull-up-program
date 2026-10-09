import Image from "next/image";
import { nunito } from "@/fonts";
import styles from "./Hero.module.css";
import PullupSVG from "@/components/PullupSVG";
import LandingNavbar from "@/components/landing/Navbar";
import AppStoreBadge from "@/components/AppStoreBadge";
import { ProgramPageLink } from "@/components/ProgramPageLink";
import { APP_STORE_HERO_URL } from "@/lib/appStore";

const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <LandingNavbar />
      <div className={styles.heroLeft}>
        <h1 style={nunito.style}>The free Armstrong Pull-up Program app</h1>
        <h2 style={nunito.style}>
          The 5-day routine a Marine used to set a pull-up world record.
          Offline, no account.
        </h2>
        <div className={styles.heroBody}>
          <div className={styles.ctas}>
            <AppStoreBadge href={APP_STORE_HERO_URL} placement="hero" />
            <ProgramPageLink label="Start in browser" path="/program" />
          </div>
          <Image
            className={styles.screenshot}
            src="/images/ios-dashboard.png"
            alt="Rep Yourself iOS app dashboard showing workout history"
            width={660}
            height={1434}
            sizes="11rem"
            priority
          />
        </div>
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
