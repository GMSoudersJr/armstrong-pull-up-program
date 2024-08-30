import {nunito} from '@/fonts';
import styles from './Navbar.module.css';
import Link from "next/link";
import Icon from '../Icon';

const SECTIONS = [
  {
    path: '/#home',
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
    <nav className={styles.navbar}>
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
                {section.path === '/#home' ? (
                  <Icon
                    size={'0.698rem'}
                    name='biceps-flexed'
                  />
                ) : (
                  section.label.toUpperCase()
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
};

export default LandingNavbar;
