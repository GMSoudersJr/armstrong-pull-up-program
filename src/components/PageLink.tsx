import { nunito } from "@/fonts";
import styles from "./PageLink.module.css";
import Link from "next/link";

interface PageLinkProps {
  label: string;
  path: string;
  onClick?: () => void;
}

export const PageLink = ({ label, path, onClick }: PageLinkProps) => {
  return (
    <Link
      className={`${styles.pageLink}`}
      style={nunito.style}
      href={path}
      onClick={onClick}
    >
      {label.toUpperCase()}
    </Link>
  );
};
