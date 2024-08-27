import {nunito} from '@/fonts';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div id='/' className={styles.hero}>
      <h1 style={nunito.style}>Master Pull-Ups with Our App!</h1>
      <button
        className={styles.button}
      >
        <h2 style={nunito.style}>
          GET STARTED!
        </h2>
      </button>
    </div>
  )
};

export default Hero;
