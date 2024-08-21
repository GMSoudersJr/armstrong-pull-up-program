import {
  notoColorEmoji,
  nunito,
  ptSans
} from "@/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Armstrong Pull-up Program",
  description: "A program to increase your pull-ups!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${nunito.variable}
          ${ptSans.variable}
          ${notoColorEmoji.variable}
        `}
      >
        {children}
      </body>
    </html>
  );
}
