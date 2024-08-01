import styles from './GetStartedLink.module.css';
import Link from "next/link";

export const GetStartedLink = () => {

  return (
    <Link
      className={styles.getStartedLink}
      href={"/getStarted"}
    >
        GET STARTED!
    </Link>
  )
};
