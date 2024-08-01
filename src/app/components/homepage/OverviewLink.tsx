import styles from './OverviewLink.module.css';
import Link from "next/link";

export const OverviewLink = () => {

  return (
    <Link
      className={styles.overviewLink}
      href={"/overview"}
    >
      OVERVIEW
    </Link>
  )
};
