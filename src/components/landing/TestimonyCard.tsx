import styles from "./TestimonyCard.module.css";
import { nunito, ptSans } from "@/fonts";
import { QuoteIcon, StarIcon, UserRoundCheckIcon } from "lucide-react";
import Image from "next/image";

interface TestimonyCardProps {
  body: string;
  name: string;
  avatar: string;
  duration: string;
  stars: number;
}

const TestimonyCard = ({
  body,
  name,
  avatar,
  duration,
  stars,
}: TestimonyCardProps) => {
  return (
    <div className={styles.card}>
      <section className={styles.header}>
        <div className={styles.avatarIconWrapper}>
          {avatar === "" ? (
            <UserRoundCheckIcon className={styles.userIcon} />
          ) : (
            <Image
              className={styles.avatar}
              src={avatar}
              alt={name}
              height={40}
              width={40}
            />
          )}
        </div>
        <h2 style={nunito.style}>{name}</h2>
        <h3 style={ptSans.style}>{duration}</h3>
        <div className={styles.quoteIconWrapper}>
          <QuoteIcon className={styles.quoteIcon} />
        </div>
      </section>
      <div className={styles.body}>
        <blockquote style={ptSans.style}>{body}</blockquote>
      </div>
      <div className={styles.footer}>
        <ul className={styles.rating}>
          {Array.from({ length: stars }, (_, i) => {
            return (
              <li key={i}>
                <StarIcon
                  fill="#FFFF00"
                  size={"0.75rem"}
                  className={styles.starIcon}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TestimonyCard;
