import { nunito, ptSans } from "@/fonts";
import styles from "./Testimonials.module.css";
import TestimonyCard from "@/components/landing/TestimonyCard";
import { TESTIMONIALS } from "@/data/testimonials";

const Testimonials = () => {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <h2 style={nunito.style}>Testimonials</h2>
      <ul className={styles.testimonialList}>
        {TESTIMONIALS.map((testimony, i) => {
          return (
            <li key={`${testimony.name}-${i}`}>
              <TestimonyCard
                body={testimony.body}
                name={testimony.name}
                avatar={testimony.avatar}
                duration={testimony.duration}
                stars={testimony.rating}
              />
            </li>
          );
        })}
      </ul>
      <figure className={styles.founderNote}>
        <blockquote style={ptSans.style}>
          I built Rep Yourself after the Armstrong program took me from 3 to 27
          pull-ups. I wanted a simple, free way to follow it.
        </blockquote>
        <figcaption style={nunito.style}>Gerald, developer</figcaption>
      </figure>
    </section>
  );
};

export default Testimonials;
