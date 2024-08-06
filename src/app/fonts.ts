import {
  Pontano_Sans,
  Domine,
  Noto_Color_Emoji
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

export const notoColorEmoji = Noto_Color_Emoji({
  weight: '400',
  subsets: ['emoji'],
  variable: "--font-notoColorEmoji",
});
