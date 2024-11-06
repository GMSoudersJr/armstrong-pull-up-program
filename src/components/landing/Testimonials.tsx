"use client";

import { Splide, SplideSlide } from "react-splide-ts";
import "react-splide-ts/css";
import { nunito } from "@/fonts";
import styles from "./Testimonials.module.css";
import TestimonyCard from "@/components/landing/TestimonyCard";
import { TESTIMONIALS } from "@/data/testimonials";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className={styles.testimonials}
      aria-labelledby="carousel-heading"
    >
      <h1 style={nunito.style} id="carousel-heading">
        Testimonials
      </h1>
      <Splide
        className={styles.splide}
        tag="section"
        options={{
          rewind: true,
          autoplay: true,
          width: "80vw",
          gap: "1rem",
        }}
      >
        {TESTIMONIALS.map((testimony, i) => {
          return (
            <SplideSlide
              className={styles.splideSlide}
              key={`${testimony.name}-${i}`}
            >
              <TestimonyCard
                body={testimony.body}
                name={testimony.name}
                avatar={testimony.avatar}
                duration={testimony.duration}
                stars={testimony.rating}
              />
            </SplideSlide>
          );
        })}
      </Splide>
    </section>
  );
};

export default Testimonials;
