import styles from './TestimonyCard.module.css';
import Icon from "@/components/Icon";
import {nunito, ptSans} from '@/fonts';
import Image from "next/image";

interface TestimonyCardProps {
  body: string;
  name: string;
  avatar: string;
  duration: string;
  stars: number;
};

const TestimonyCard = ({
  body,
  name,
  avatar,
  duration,
  stars
}: TestimonyCardProps) => {

  return (
    <div className={styles.card}>
      <section className={styles.header}>
        {avatar === '' ? (
          <Icon
            className={styles.avatar}
            name='user-round-check'
            size={'3rem'}
          />
        ) : (
          <Image
            className={ styles.avatar }
            src={avatar}
            alt={name}
            height={40}
            width={40}
          />
        )}
        <h3 style={nunito.style}>{name}</h3>
        <h6 style={ptSans.style}>{duration}</h6>
        <div className={styles.icon}>
          <Icon
            name="quote"
            size={'3rem'}
            color='#87CEEB'
            strokeWidth={1.5}
          />
        </div>
      </section>
      <div className={styles.body}>
        <blockquote>{body}</blockquote>
        <ul className={styles.rating}>
          {Array.from({length: stars}, () => <Icon name='star' fill='#FFFF00' size={'0.75rem'}/>)}
        </ul>
      </div>
    </div>
  )
};

export default TestimonyCard;
