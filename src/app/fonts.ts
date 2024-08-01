import {
  Pontano_Sans,
  Domine
} from 'next/font/google';

export const pontanoSans = Pontano_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-pontanoSans",
  display: "swap"
});

export const domine = Domine({
  subsets: ['latin'],
  weight: "variable",
  variable: "--font-domine",
  display: "swap"
});
