import styles from './Title.module.css';
import { nunito } from '@/fonts';

const HomePageTitle = () => {
  return (
    <h1 className={`${styles.title} ${nunito.className}`}>
      ARMSTRONG PULL-UP PROGRAM
    </h1>
  )
};

export default HomePageTitle;
