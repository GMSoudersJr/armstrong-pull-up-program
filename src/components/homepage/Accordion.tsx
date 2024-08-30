'use client';

import styles from './Accordion.module.css';
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import {nunito, ptSans} from '@/fonts';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import Icon from '../Icon';

interface AccordionProps {
  heading: string;
  body: string[];
  iconName: keyof typeof dynamicIconImports;
}

const Accordion = ({
  heading,
  body,
  iconName,
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
            className={styles.icon}
          >
            <Icon name={iconName}/>
          </div>
          <h4 style={nunito.style}>{heading}</h4>
        </div>
      </button>
      <div
        ref={panelRef}
        className={`${styles.panel}`}
      >
        <ul className={styles.panelList}>
        {body.map((text, i) => {
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
        </ul>
      </div>
    </>
  )
};

export default Accordion;