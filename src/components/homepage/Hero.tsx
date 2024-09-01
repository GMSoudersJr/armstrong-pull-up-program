import {nunito} from '@/fonts';
import styles from './Hero.module.css';
import PullupSVG from '@/components/PullupSVG';
import LandingNavbar from './Navbar';

const Hero = () => {
  return (
    <section id='home' className={styles.hero}>
      <LandingNavbar />
      <div className={styles.heroLeft}>
        <h1 style={nunito.style}>Master Pull-Ups with Our App!</h1>
        <h3 style={nunito.style}>
          Use the Armstrong Pull-up Program to achieve your pull-up goals!
        </h3>
        <button
          type='button'
          className={styles.button}
        >
          <h3 style={nunito.style}>
            GET STARTED!
          </h3>
        </button>
      </div>

      <div className={styles.heroRight}>
        <PullupSVG />
      </div>
    </section>
  )
};

export default Hero;
