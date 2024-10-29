import Link from "next/link";
import styles from "./ReviewLink.module.css";
import { nunito } from "@/fonts";

interface ReviewLinkProps {
  getData: "day" | "week" | "workout";
  index: string | number;
  text?: string;
}

export const ReviewLink = ({ getData, index, text }: ReviewLinkProps) => {
  return (
    <Link
      href={`program/review/${getData}/${index}`}
      className={styles.reviewLink}
      scroll={false}
    >
      <h6 style={nunito.style}>{text}</h6>
    </Link>
  );
};
