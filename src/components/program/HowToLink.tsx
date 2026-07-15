import { MailQuestionMarkIcon } from "lucide-react";
import Link from "next/link";
import styles from "./HowToLink.module.css";

interface HowToLinkProps {
  dayNumber: number;
}

const HOW_TO_SUBJECTS: Record<number, string> = {
  2: "Question about Day 2 pyramid",
  3: "Question about Day 3 grip rotation",
};

const HowToLink = ({ dayNumber }: HowToLinkProps) => {
  const subject = HOW_TO_SUBJECTS[dayNumber];

  if (!subject) return null;

  return (
    <Link
      href={`mailto:howto@repyourself.app?subject=${encodeURIComponent(subject)}`}
      title="How does this work? Email us"
      className={styles.link}
    >
      <MailQuestionMarkIcon className={styles.icon} />
    </Link>
  );
};

export default HowToLink;
