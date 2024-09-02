import {ptSans} from '@/fonts';
import styles from './OverviewCard.module.css';
import { nunito } from '@/fonts';
import {TCardProps} from '@/definitions';

const ProgramOverviewCard = ({
  Icon,
  heading,
  body,
}: TCardProps) => {

  return (
    <div className={styles.card}>
      <div className={`${styles.iconWrapper} iconWrapper`}>
        <Icon className={styles.icon} />
      </div>
      <h3 style={nunito.style}>{heading}</h3>
      <ul>
        {body.map((point, i) => {
          return (
            <li key={i} style={ptSans.style}>
              <p style={ptSans.style}>
                {point}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
};

export default ProgramOverviewCard;
