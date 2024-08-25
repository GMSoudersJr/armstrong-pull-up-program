import {nunito} from '@/fonts';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div id='/' className={styles.hero}>
      <h1 style={nunito.style}>Master Pull-Ups with Our App!</h1>
      <button
        className={styles.button}
      >
        <h1 style={nunito.style}>
          GET STARTED!
        </h1>
      </button>
    </div>
  )
};

export default Hero;
