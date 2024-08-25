import {nunito} from '@/fonts';
import styles from './Navbar.module.css';
import Link from "next/link";

const SECTIONS = [
  {
    path: '/',
    label: 'Armstrong Pull-up program',
  },
  {
    path: '/#features',
    label: 'features'
  },
  {
    path: '/#testimonials',
    label: 'testimonials'
  },
  {
    path: '/#program',
    label: 'program'
  },
];

const LandingNavbar = () => {
  return (
    <ul className={styles.navList}>
      {SECTIONS.map((section) => {
        return (
          <li
            key={section.path}
            className={styles.navListitem}
            style={nunito.style}
          >
            <Link
              href={section.path}
              scroll={true}
            >
              {section.label.toUpperCase()}
            </Link>
          </li>
        )
      })}
    </ul>
  )
};

export default LandingNavbar;
