import {nunito} from '@/fonts';
import styles from './Features.module.css';
import FeatureCard from '@/components/landing/FeatureCard';
import {DatabaseIcon, HourglassIcon, NotepadTextIcon} from 'lucide-react';
import type { TCardProps } from '@/definitions';

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

const FEATURES: TCardProps[] = [
  {
    Icon: DatabaseIcon,
    heading: 'Local First',
    body: [
      'Your data stays on your phone.',
      'Offline availability coming soon.'
    ],
  },
  {
    Icon: HourglassIcon,
    heading: 'Built-in Timer',
    body: [
      'Get proper rest between sets.',
      'Know exactly when to continue.'
    ],
  },
  {
    Icon: NotepadTextIcon,
    heading: 'Track Progress',
    body: [
      'See where you started.',
      "Realize how far you've come.",
    ],
  },
];
