import styles from "./page.module.css";
import HomePageTitle from "@/components/homepage/Title";
import {PageLink} from "@/components/PageLink";

const PAGES = [
  {
    label: 'overview',
    path: '/overview'
  },
  {
    label: 'program',
    path: '/program'
  }
];

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.titleSection}>
        <HomePageTitle />
      </div>

      <div className={styles.pageLinkFlex}>
        {PAGES.map((page) => {
          return (
            <PageLink
              key={page.path}
              path={page.path}
              label={page.label}
            />
          );
        })}

      </div>
    </main>
  );
};
