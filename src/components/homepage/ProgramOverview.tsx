import {nunito} from '@/fonts';
import styles from './ProgramOverview.module.css';
import ProgramOverviewCard from '@/components/homepage/ProgramOverviewCard';
import {TCardProps} from '@/definitions';
import {ScaleIcon, ShapesIcon, Tally5Icon} from 'lucide-react';

const ProgramOverview = () => {

  return (
    <section id='program' className={styles.programOverviewContainer}>
      <h1 style={nunito.style}>Program Overview</h1>
      <ul className={styles.programOverviewList}>
        {PROGRAM_OVERVIEW_POINTS.map((point, key) => {
          return (
            <li key={key} className={styles.programOverviewListitem}>
              <ProgramOverviewCard
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

const PROGRAM_OVERVIEW_POINTS: TCardProps[] = [
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
