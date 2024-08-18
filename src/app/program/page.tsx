import styles from './page.module.css';
import Program from '@/components/program/Program';

const ProgramPage = () => {

  return (
    <main className={styles.main}>
      <h1>
        GET STARTED!
      </h1>
      <div className={styles.pageLinksContainer}>
        <Program />
      </div>
    </main>
  )
}

export default ProgramPage;
