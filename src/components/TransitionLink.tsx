"use client";

import { nunito } from "@/fonts";
import styles from "./TransitionLink.module.css";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  href: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const TransitionLink = ({
  children,
  href,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();

  async function handleTransition(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    const body = document.querySelector("body");

    body?.classList.add("page-transition");

    await sleep(500);

    router.push(href);

    await sleep(500);

    body?.classList.remove("page-transition");
  }

  return (
    <Link
      className={styles.transitionLink}
      style={nunito.style}
      href={href}
      onClick={handleTransition}
    >
      {children}
    </Link>
  );
};
