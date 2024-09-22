import styles from './Header.module.css';
import {nunito} from "@/fonts";
import {BicepsFlexedIcon} from "lucide-react";
import Link from 'next/link';

export default function Header() {
  return (
    <section className={styles.headerSection}>
      <div className={styles.iconWrapper}>
        <BicepsFlexedIcon className={`${styles.icon} ${styles.leftIcon}`}/>
      </div>
      <h2 style={nunito.style}>
        <strong>
          <Link href={'/'}>
            PULL-UP PROGRAM
          </Link>
        </strong>
      </h2>
      <div className={styles.iconWrapper}>
        <BicepsFlexedIcon className={`${styles.icon} ${styles.rightIcon}`}/>
      </div>
    </section>
  )
};
