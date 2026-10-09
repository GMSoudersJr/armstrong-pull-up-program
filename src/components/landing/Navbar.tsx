import { nunito } from "@/fonts";
import styles from "./Navbar.module.css";
import Link from "next/link";
import BrandMark from "@/components/BrandMark";

const NAV_LINKS = [
  {
    path: "/#home",
    label: "Rep Yourself",
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
              <Link href={navLink.path} scroll={true}>
                {navLink.path === "/#home" ? (
                  <>
                    <BrandMark className={styles.brandMark} />
                    <span className="visibly-hidden">Rep Yourself home</span>
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
