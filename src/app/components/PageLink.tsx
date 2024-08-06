import styles from './PageLink.module.css';
import Link from "next/link";

interface PageLinkProps {
  label: string;
  path: string;
}

export const PageLink = ({ label, path }: PageLinkProps) => {

  return (
    <Link
      className={styles.pageLink}
      href={path}
    >
      {label.toUpperCase()}
    </Link>
  )
};
