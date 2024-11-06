"use client";

import { nunito } from "@/fonts";
import styles from "./ProgramPageLink.module.css";
import Link from "next/link";

interface ProgramPageLinkProps {
  label: string;
  path: string;
}

export const ProgramPageLink = ({ label, path }: ProgramPageLinkProps) => {
  return (
    <Link className={styles.programPageLink} style={nunito.style} href={path}>
      {label.toUpperCase()}
    </Link>
  );
};
