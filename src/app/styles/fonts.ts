import { Noto_Color_Emoji, Nunito, PT_Sans } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-nunito",
  display: "swap",
});

export const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ptSans",
  display: "swap",
});

export const notoColorEmoji = Noto_Color_Emoji({
  weight: "400",
  subsets: ["emoji"],
  variable: "--font-notoColorEmoji",
});
