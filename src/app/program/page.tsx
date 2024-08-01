import {PageLink} from '@/components/PageLink';
import styles from './page.module.css';
import Link from "next/link";

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
