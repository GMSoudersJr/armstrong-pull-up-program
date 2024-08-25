import {nunito} from '@/fonts';
import styles from './Pricing.module.css';
import PricingCard from '@/components/homepage/PricingCard';

const Pricing = () => {
  // A background-image
  // Card container
  // Cards

  return (
    <section id='pricing' className={styles.pricingContainer}>
      <h1 style={nunito.style}>Simple and Affordable</h1>
      <ul className={styles.pricingCardList}>
        {PRICING_CARD_DATA.map((card, key) => {
          return (
            <li key={key} className={styles.pricingCardListItem}>
              <PricingCard
                period={card.period}
                rate={card.rate}
                savings={card.savings}
                bonuses={card.bonuses}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Pricing;

const PRICING_CARD_DATA = [
  {
    period: 'daily',
    rate: 1,
    savings: '100%',
    bonuses: [
      'Routine',
    ],
  },
  {
    period: 'weekly',
    rate: 5,
    savings: '100%',
    bonuses: [
      'Routine',
      'Persistence',
    ],
  },
  {
    period: 'monthly',
    rate: 20,
    savings: '100%',
    bonuses: [
      'Routine',
      'Persistence',
      'Results',
    ],
  },
  {
    period: 'yearly',
    rate: 260,
    savings: '100%',
    bonuses: [
      'Routine',
      'Persistence',
      'Results',
      'Confidence',
    ],
  },
];
