import styles from "./page.module.css";
import {HomePageTitle} from "@/components/homepage/Title";
import {PageLink} from "@/components/PageLink";

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
      <div className={styles.pageLinkFlex}>
        <PageLink
          path="/overview"
          label="overview"
        />

        <PageLink
          path="/program"
          label="program"
        />

      </div>
    </main>
  );
}
