import { nunito } from "@/fonts";
import styles from "./PageLink.module.css";
import Link from "next/link";

interface PageLinkProps {
  label: string;
  path: string;
}

export const PageLink = ({ label, path }: PageLinkProps) => {
  return (
    <Link className={`${styles.pageLink}`} style={nunito.style} href={path}>
      {label.toUpperCase()}
    </Link>
  );
};
