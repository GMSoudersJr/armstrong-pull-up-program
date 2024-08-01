import styles from "./page.module.css";
import {HomePageTitle} from "@/components/homepage/Title";
import {GetStartedLink} from "./components/homepage/GetStartedLink";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.titleSection}>
        <HomePageTitle />
      </div>
      <div className={styles.testimonialsSection}>
        <div className={styles.beforeAndAfterGrid}>

        </div>
      </div>
      <div className={styles.getStartedFlex}>
        <GetStartedLink />
      </div>
    </main>
  );
}
