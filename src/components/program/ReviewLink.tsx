import Link from "next/link";
import styles from "./ReviewLink.module.css";
import { nunito } from "@/fonts";
import { useState } from "react";
import { getWorkoutById } from "@/indexedDBActions";

interface ReviewLinkProps {
  getData: "day" | "week" | "workout";
  index: string | number;
  text?: string;
}

export const ReviewLink = ({ getData, index, text }: ReviewLinkProps) => {
  const [skipped, setSkipped] = useState(false);

  if (getData === "workout") {
    getWorkoutById(index.toString())
      .then((value) => {
        setSkipped(value[0].dayAbbreviation === "SKPD");
      })
      .catch((error) => console.warn(error));
  }
  return (
    <Link
      href={`program/review/${getData}/${index}`}
      className={`${styles.reviewLink} ${text ? "" : skipped ? styles.skipped : styles.done}`}
      scroll={false}
      title={`Review ${getData} ${index}`}
      style={nunito.style}
    >
      {text}
    </Link>
  );
};
