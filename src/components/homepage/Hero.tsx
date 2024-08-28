import {nunito} from '@/fonts';
import styles from './Hero.module.css';
import PullupSVG from '@/components/PullupSVG';

const Hero = () => {
  return (
    <div id='/' className={styles.hero}>
      <section className={styles.heroLeft}>
        <h1 style={nunito.style}>Master Pull-Ups with Our App!</h1>
        <h3 style={nunito.style}>
          Use the Armstrong Pull-up Program to achieve your pull-up goals!
        </h3>
        <button
          className={styles.button}
        >
          <h3 style={nunito.style}>
            GET STARTED!
          </h3>
        </button>
      </section>

      <section className={styles.heroRight}>
        <PullupSVG />
      </section>
    </div>
  )
};

export default Hero;
