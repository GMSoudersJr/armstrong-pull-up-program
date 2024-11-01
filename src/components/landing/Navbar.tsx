import { nunito } from "@/fonts";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { BicepsFlexedIcon } from "lucide-react";

const NAV_LINKS = [
  {
    path: "/#home",
    label: "Armstrong Pull-up program",
    sr_only: "home",
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
        {NAV_LINKS.map((navLink) => {
          return (
            <li
              key={navLink.path}
              className={styles.navListitem}
              style={nunito.style}
            >
              <Link href={navLink.path} scroll={true} title={navLink.label}>
                {navLink.path === "/#home" ? (
                  <>
                    <BicepsFlexedIcon size={"0.698rem"} />
                  </>
                ) : (
                  navLink.label.toUpperCase()
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
