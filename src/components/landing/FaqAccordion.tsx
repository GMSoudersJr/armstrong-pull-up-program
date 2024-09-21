'use client';

import styles from './FaqAccordion.module.css';
import { FAQ } from "@/data/faq";
import {nunito} from '@/fonts';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Accordion = dynamic(() => import('@/components/landing/Accordion'));

const FaqAccordion = () => {

  return (
    <section id="faq" className={styles.faq}>
      <h3 style={nunito.style}>
        FAQ
      </h3>
      <Link
        href={'https://www.savannahstate.edu/cost/nrotc/documents/Inform2010-thearmstrongworkout_Enclosure15_5-2-10.pdf'}
        referrerPolicy='no-referrer'
      >
        https://www.savannahstate.edu/cost/nrotc/documents/Inform2010-thearmstrongworkout_Enclosure15_5-2-10.pdf
      </Link>
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
