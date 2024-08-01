'use client';

import styles from './Accordion.module.css';
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import {PageLink} from '../PageLink';

interface AccordionProps {
  buttonText: string;
  panelText: string[];
  link?: string;
}

export const Accordion = ({ buttonText, panelText, link }: AccordionProps) => {

  const [active, setActive] = useState(false);

  const accordionButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function handleClick() {

    flushSync(() => {
      setActive(!active);
    });

    const accordionButton = accordionButtonRef.current;
    const panel = panelRef.current;

    if (accordionButton && panel) {
      if (panel.style.maxHeight) {
        panel.style.maxHeight = "";
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }

  }

  return (
    <>
      <button
        className={`${styles.accordion} ${active && styles.active}`}
        ref={accordionButtonRef}
        onClick={handleClick}
      >
        <h1>
          {buttonText}
        </h1>
      </button>
      <div
        ref={panelRef}
        className={`${styles.panel}`}
      >
        <ul className={styles.panelList}>
        {panelText.map((text, i) => {
          return (
            <li key={i} className={styles.panelListitem}>
              <p className={styles.panelText}>{text}</p>
            </li>
          )
        })}
          {link && (
            <li
              className={styles.panelListitem}
            >
              <PageLink
                path={`/program/${link}`}
                label='get to it!'
              />
            </li>
          )}
        </ul>
      </div>
    </>
  )
};
