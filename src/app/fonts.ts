import {
  Pontano_Sans,
  Stint_Ultra_Condensed,
} from 'next/font/google';

export const stintUltraCondensed = Stint_Ultra_Condensed({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-stintUltraCondensed",
  display: "swap"
});

export const pontanoSans = Pontano_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-pontanoSans",
  display: "swap"
});
