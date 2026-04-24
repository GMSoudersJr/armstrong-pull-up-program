"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") router.back();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div id="modal" className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-heading">
      <header className={styles.headerSection}>
        <div className={styles.iconWrapper}>
          <ScrollIcon className={styles.icon} />
        </div>
        <h2 id="modal-heading" style={nunito.style}>
          <strong>{heading}</strong>
        </h2>
        <button
          id="data-visualization-modal-close-button"
          title="Close modal"
          aria-label="Close modal"
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
