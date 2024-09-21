'use client';

import { Splide, SplideSlide } from 'react-splide-ts';
import 'react-splide-ts/css';
import {nunito} from '@/fonts';
import styles from './Testimonials.module.css';
import TestimonyCard from '@/components/landing/TestimonyCard';

const Testimonials = () => {
  return (
    <section id='testimonials' className={styles.testimonials}>
      <h1 style={nunito.style}>Testimonials</h1>
        <Splide
          className={styles.splide}
          tag='section'
          aria-label="User Testimonials"
          options={{
            rewind: true,
            autoplay: true,
            width: '80vw',
            gap: '1rem',
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
                duration={testimony.programDuration}
                stars={testimony.stars}
              />
            </SplideSlide>
          )
        })}
        </Splide>
    </section>
  )
};

export default Testimonials;

const TESTIMONIALS = [
  {
    body: 'Took me from 3 to 27 pullups',
    name: 'Gerald S.',
    avatar: '',
    programDuration: '5 months',
    stars: 5,
  },
  {
    body: 'Now I can do 5 muscle-ups',
    name: 'Gerald M.',
    avatar: '',
    programDuration: '5 months',
    stars: 4,
  },
  {
    body: 'Taught me early morning discipline',
    name: 'G.S.',
    avatar: '',
    programDuration: '4 weeks',
    stars: 3,
  },
  {
    body: 'Who knew pull-ups could be so fun?',
    name: 'Melvin S.',
    avatar: '',
    programDuration: '3 months',
    stars: 1,
  },
];
