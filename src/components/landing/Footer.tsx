import Link from "next/link";
import { socials } from "@/lib/socials";
import styles from "./Footer.module.css";
import { CopyrightIcon } from "lucide-react";
import { nunito, ptSans } from "@/fonts";
import Image from "next/image";
import PullupSVG from "../PullupSVG";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <PullupSVG />
      <section className={styles.otherLinks}>
        <Link
          href={
            "https://www.savannahstate.edu/cost/nrotc/documents/Inform2010-thearmstrongworkout_Enclosure15_5-2-10.pdf"
          }
          target="_blank"
        >
          <h5 style={nunito.style}>PDF SOURCE MATERIAL</h5>
        </Link>
        <Link href={"https://card-workout-tau.vercel.app/"} target="_blank">
          <h5 style={nunito.style}>SUIT YOURSELF</h5>
        </Link>
      </section>
      <section className={styles.socials}>
        {socials.map((social) => {
          return (
            <Link href={social.href} key={social.id}>
              <Image
                alt={social.alt}
                src={social.iconUrlLight}
                height={24}
                width={24}
              />
            </Link>
          );
        })}
      </section>
      <section className={styles.copyright}>
        <CopyrightIcon />
        <p style={ptSans.style}>2024 by Gerald Souders</p>
      </section>
    </footer>
  );
};

export default Footer;
