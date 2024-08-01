import styles from "./page.module.css";
import {HomePageTitle} from "@/components/homepage/Title";
import {OverviewLink} from "@/components/homepage/OverviewLink";

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
        <OverviewLink />
      </div>
    </main>
  );
}
