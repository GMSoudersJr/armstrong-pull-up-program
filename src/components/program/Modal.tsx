"use client";

import { useRouter } from "next/navigation";
import styles from "./Modal.module.css";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className={styles.modal}>
      <button
        onClick={() => {
          router.back();
        }}
      >
        Close modal
      </button>
      <p>hello</p>
      <div>{children}</div>
    </div>
  );
}
