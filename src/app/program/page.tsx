import { Metadata } from 'next';
import {PageLink} from '@/components/PageLink';
import styles from './page.module.css';
import { DAYS } from '@/const';
import Program from '@/components/program/Program';

export const metadata: Metadata = {
  title: "Program | Armstrong Pull-up Program",
  description: "Choose which day of the program to begin."
}
const ProgramPage = () => {

  return (
    <main className={styles.main}>
      <Program />
    </main>
  )
}

export default ProgramPage;
