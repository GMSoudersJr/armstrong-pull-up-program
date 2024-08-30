import {nunito} from '@/fonts';
import styles from './Features.module.css';
import FeatureCard from '@/components/homepage/FeatureCard';
import {DatabaseIcon, HourglassIcon, NotepadTextIcon} from 'lucide-react';
import type { TCardProps } from '@/definitions';

const FEATURES: TCardProps[] = [
  {
    Icon: DatabaseIcon,
    heading: 'Local First',
    body: ['Your data stays on your phone. Offline availability.'],
  },
  {
    Icon: HourglassIcon,
    heading: 'Built-in Timer',
    body: ['Proper rest between sets is important.'],
  },
  {
    Icon: NotepadTextIcon,
    heading: 'Track Progress',
    body: ['Keep track of your max as it increases.'],
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
              Icon={feature.Icon}
              heading={feature.heading}
              body={feature.body}
            />
          </li>
        )
      })}
      </ul>
    </section>
  )
};

export default Features;
