"use client";

import { useRouter } from "next/navigation";
import styles from "./Modal.module.css";
import { ScrollIcon, XIcon } from "lucide-react";
import { nunito } from "@/fonts";

interface ModalProps {
  children: React.ReactNode;
  heading: string;
}

export function Modal({ children, heading }: ModalProps) {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return (
    <div id="modal" className={styles.modal}>
      <header className={styles.headerSection}>
        <div className={styles.iconWrapper}>
          <ScrollIcon className={styles.icon} />
        </div>
        <h2 style={nunito.style}>
          <strong>{heading}</strong>
        </h2>
        <button
          id="data-visualization-modal-close-button"
          type="button"
          className={styles.closeButton}
          onClick={handleClick}
        >
          <XIcon className={styles.icon} />
        </button>
      </header>
      <section className={styles.content}>{children}</section>
    </div>
  );
}
