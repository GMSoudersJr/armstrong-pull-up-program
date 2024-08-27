import {nunito} from '@/fonts';
import styles from './Features.module.css';
import FeatureCard from '@/components/homepage/FeatureCard';
import type { TFeature } from '@/definitions';

const FEATURES: TFeature[] = [
  {
    iconName: 'database',
    heading: 'Local First',
    text: 'Your data stays on your phone. Offline availability.',
  },
  {
    iconName: 'hourglass',
    heading: 'Build-in Timer',
    text: 'Proper rest between sets is important.',
  },
  {
    iconName: 'notepad-text',
    heading: 'Track Progress',
    text: 'Keep track of your max as it increases.',
  },
];

const Features = () => {
  return (
    <section id='features' className={styles.features}>
      <h1 style={nunito.style}>Features</h1>
      <ul className={styles.featuresList}>
      {FEATURES.map((feature) => {
        return (
          <li key={feature.heading} className={styles.featuresListitem}>
            <FeatureCard
              iconName={feature.iconName}
              heading={feature.heading}
              text={feature.text}
            />
          </li>
        )
      })}
      </ul>
    </section>
  )
};

export default Features;
