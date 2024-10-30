import Header from "@/components/program/Header";
import styles from "./layout.module.css";

export default function ProgramLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <section className={styles.programLayout}>
      <Header />
      {modal}
      {children}
    </section>
  );
}
