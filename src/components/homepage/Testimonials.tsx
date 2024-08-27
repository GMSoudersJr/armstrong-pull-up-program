import {nunito} from '@/fonts';
import styles from './Testimonials.module.css';
import TestimonyCard from './TestimonyCard';

const TESTIMONIALS = [
  {
    body: 'Took me from 3 to 27 pullups',
    name: 'Gerald S.',
    avatar: '',
    programDuration: '5 months',
    stars: 5,
  },
  {
    body: 'It got me to do 5 muscle ups',
    name: 'Gerald M.',
    avatar: '',
    programDuration: '5 months',
    stars: 4,
  },
  {
    body: 'Taught me early morning discipline',
    name: 'Jay S.',
    avatar: '',
    programDuration: '5 months',
    stars: 3,
  },
  {
    body: 'I never thought pull-ups could be fun',
    name: 'Mevlin S.',
    avatar: '',
    programDuration: '5 months',
    stars: 1,
  },
];

const Testimonials = () => {
  return (
    <section id='testimonials' className={styles.testimonials}>
      <h1 style={nunito.style}>TESTIMONIALS</h1>
      <ul className={styles.testimonyList}>
        {TESTIMONIALS.map((testimony, i) => {
          return (
            <li key={`${testimony.name}-${i}`} className={styles.testimonyListitem}>
              <TestimonyCard
                body={testimony.body}
                name={testimony.name}
                avatar={testimony.avatar}
                duration={testimony.programDuration}
                stars={testimony.stars}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
};

export default Testimonials;

