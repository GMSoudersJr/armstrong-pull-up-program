import Header from "@/components/program/Header"
import styles from './layout.module.css';

export default function ProgramLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className={styles.programLayout}>
      <Header />
      {children}
    </section>
  )
};
