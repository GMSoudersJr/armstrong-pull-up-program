import { Metadata } from 'next';
import {PageLink} from '@/components/PageLink';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Program | Armstrong Pull-up Program",
  description: "Choose which day of the program to begin."
}
const ProgramPage = () => {

  return (
    <main className={styles.main}>
      {DAYS.map((day) => {
      return (
          <PageLink
            key={day.path}
            path={day.path}
            label={day.label}
          />
      )
      })}
    </main>
  )
}

const DAYS = [
  {
    path: '/program/day-one',
    label: 'DAY ONE'
  },
  {
    path: '/program/day-two',
    label: 'DAY TWO'
  },
  {
    path: '/program/day-three',
    label: 'DAY THREE'
  },
  {
    path: '/program/day-four',
    label: 'DAY FOUR'
  },
  {
    path: '/program/day-five',
    label: 'DAY FIVE'
  },
]
export default ProgramPage;
