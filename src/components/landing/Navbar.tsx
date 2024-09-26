import { nunito } from "@/fonts";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { BicepsFlexedIcon } from "lucide-react";

const SECTIONS = [
  {
    path: "/#home",
    label: "Armstrong Pull-up program",
  },
  {
    path: "/#features",
    label: "features",
  },
  {
    path: "/#testimonials",
    label: "testimonials",
  },
  {
    path: "/#overview",
    label: "overview",
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
              <Link href={section.path} scroll={true}>
                {section.path === "/#home" ? (
                  <BicepsFlexedIcon size={"0.698rem"} />
                ) : (
                  section.label.toUpperCase()
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LandingNavbar;
