import styles from "./layout.module.css";

export default function SupportPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.main}>{children}</div>;
}
