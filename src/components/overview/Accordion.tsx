'use client';

import styles from './Accordion.module.css';
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import {PageLink} from '../PageLink';
import {notoColorEmoji, nunito, ptSans} from '@/fonts';

interface AccordionProps {
  buttonText: string;
  panelText: string[];
  link?: string;
  emoji: string;
}

export const Accordion = ({
  buttonText,
  panelText,
  link,
  emoji
}: AccordionProps) => {

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
        <div className={styles.buttonText}>
          <div
            className={styles.emoji}
            style={notoColorEmoji.style}
          >
            {emoji}
          </div>
          <h1 style={nunito.style}>{buttonText}</h1>
        </div>
      </button>
      <div
        ref={panelRef}
        className={`${styles.panel}`}
      >
        <ul className={styles.panelList}>
        {panelText.map((text, i) => {
          return (
            <li key={i} className={styles.panelListitem}>
              <p
                className={styles.panelText}
                style={ptSans.style}
              >
                {text}
              </p>
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
