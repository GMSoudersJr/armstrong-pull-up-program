import styles from './Header.module.css';
import {nunito} from "@/fonts";
import {BicepsFlexedIcon} from "lucide-react";

export default function Header() {
  return (
    <section className={styles.headerSection}>
      <div className={styles.iconWrapper}>
        <BicepsFlexedIcon className={`${styles.icon} ${styles.leftIcon}`}/>
      </div>
      <h1 style={nunito.style} className={styles.headerText}>
        <strong>
          PULL-UP PROGRAM
        </strong>
      </h1>
      <div className={styles.iconWrapper}>
        <BicepsFlexedIcon className={`${styles.icon} ${styles.rightIcon}`}/>
      </div>
    </section>
  )
};
