import {ptSans} from '@/fonts';
import styles from './PricingCard.module.css';

interface PricingCardProps {
  period: string;
  rate: number
  savings: string;
  bonuses: string[];
};

const PricingCard = ({
  period,
  rate,
  savings,
  bonuses,
}: PricingCardProps) => {

  return (
    <div className={styles.pricingCard}>
      <h1 className={styles.period}>{period}</h1>
      <div>
        <h2 style={ptSans.style}>
          {rate}x
        </h2>
      </div>
      <div>
        <h3>
          {savings}
        </h3>
      </div>
      <ul>
        {bonuses.map((bonus) => {
          return (
            <li>
              {bonus}
            </li>
          )
        })}
      </ul>

    </div>
  )
};

export default PricingCard;
