import {nunito} from '@/fonts';
import styles from './ProgramOverview.module.css';
import ProgramOverviewCard from '@/components/homepage/ProgramOverviewCard';
import { TProgramOverview } from '@/definitions';

const ProgramOverview = () => {

  return (
    <section id='program' className={styles.programOverviewContainer}>
      <h1 style={nunito.style}>Program Overview</h1>
      <ul className={styles.programOverviewList}>
        {PROGRAM_OVERVIEW_POINTS.map((point, key) => {
          return (
            <li key={key} className={styles.programOverviewListitem}>
              <ProgramOverviewCard
                iconName={point.iconName}
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

const PROGRAM_OVERVIEW_POINTS: TProgramOverview[] = [
  {
    iconName: 'tally-5',
    heading: 'DAILY',
    body: [
      'Weekday => Workout!',
      'Weekend => Rest!',
      'Days and weeks fly by!',
    ]
  },
  {
    iconName: 'scale',
    heading: 'BALANCE',
    body: [
      'Wake up => Push-ups',
      'Later on => Pull-ups',
      'Full upper body workout!',
    ]
  },
  {
    iconName: 'shapes',
    heading: 'VARIETY',
    body: [
      '4 different daily workouts!',
      'Repeat hardest on 5th day!',
      'Any grip you like!',
    ]
  },
];
