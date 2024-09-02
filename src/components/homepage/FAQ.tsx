'use client';

import styles from './FaqAccordion.module.css';
import { FAQ } from "@/data/faq";
import {nunito} from '@/fonts';
import dynamic from 'next/dynamic';

const Accordion = dynamic(() => import('@/components/homepage/Accordion'));

const FaqAccordion = () => {

  return (
    <section id="faq" className={styles.faq}>
      <h3 style={nunito.style}>
        FAQ
      </h3>
      <ul className={styles.faqList}>
      {FAQ.map((faq) => {
        return (
          <li key={faq.id}>
            <Accordion
              day={faq.day}
              id={faq.id}
              Icon={faq.Icon}
              heading={faq.heading}
              body={faq.body}
            />
          </li>
        )
      })}
      </ul>
    </section>
  )
};

export default FaqAccordion;
