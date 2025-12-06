import styles from "./layout.module.css";

export default function PrivacyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.main}>{children}</div>;
}
