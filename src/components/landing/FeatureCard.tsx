import styles from "./FeatureCard.module.css";
import { nunito, ptSans } from "@/fonts";
import { LucideIcon } from "lucide-react";
import type { TCardProps } from "@/definitions";

interface FeatureCardProps extends TCardProps {
  Icon: LucideIcon;
  heading: string;
  body: string[];
}

const FeatureCard = ({ heading, body, Icon }: FeatureCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>
      <h3 style={nunito.style}>{heading}</h3>
      <ul>
        {body.map((sentence, i) => {
          return (
            <li key={`${sentence}-${i}`}>
              <p style={ptSans.style}>{sentence}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FeatureCard;
