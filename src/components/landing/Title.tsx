import {flexedArmEmoji} from '@/emojis';
import styles from './Title.module.css';
import { notoColorEmoji, nunito } from '@/fonts';

const HomePageTitle = () => {
  return (
    <h1
      className={styles.title}
      style={nunito.style}
    >
      <div
        className={styles.leftArm}
        style={notoColorEmoji.style}
      >
        {flexedArmEmoji}
      </div>
      <div className={styles.text}>
        <strong>PULL-UP PROGRAM</strong>
      </div>
      <div
        className={styles.rightArm}
        style={notoColorEmoji.style}
      >
        {flexedArmEmoji}
      </div>
    </h1>
  )
};

export default HomePageTitle;
