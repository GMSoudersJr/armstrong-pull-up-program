import {nunito} from '@/fonts';
import styles from './Overview.module.css';
import OverviewCard from '@/components/homepage/OverviewCard';
import {TCardProps} from '@/definitions';
import {ScaleIcon, ShapesIcon, Tally5Icon} from 'lucide-react';

const ProgramOverview = () => {

  return (
    <section id='overview' className={styles.overviewContainer}>
      <h1 style={nunito.style}>Overview</h1>
      <ul className={styles.overviewList}>
        {OVERVIEW_POINTS.map((point, key) => {
          return (
            <li key={key} className={styles.overviewListitem}>
              <OverviewCard
                Icon={point.Icon}
                heading={point.heading}
                body={point.body}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ProgramOverview;

const OVERVIEW_POINTS: TCardProps[] = [
  {
    Icon: Tally5Icon,
    heading: 'DAILY',
    body: [
      'Weekday => Workout!',
      'Weekend => Rest!',
      'Days and weeks fly by!',
    ]
  },
  {
    Icon: ScaleIcon,
    heading: 'BALANCE',
    body: [
      'Wake up => Push-ups',
      'Later on => Pull-ups',
      'Full upper body workout!',
    ]
  },
  {
    Icon: ShapesIcon,
    heading: 'VARIETY',
    body: [
      '4 different daily workouts!',
      'Repeat hardest on 5th day!',
      'Any grip you like!',
    ]
  },
];
