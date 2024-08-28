import styles from './FaqAccordion.module.css';
import { FAQ } from "@/data/faq";
import {nunito} from '@/fonts';
import Accordion from '@/components/homepage/Accordion';

const FaqAccordion = () => {

  return (
    <section id="faq" className={styles.faq}>
      <h2 style={nunito.style}>
        FAQ
      </h2>
      <ul className={styles.faqList}>
      {FAQ.map((faq) => {
        return (
          <li key={faq.id}>
            <Accordion
              iconName={faq.iconName}
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
