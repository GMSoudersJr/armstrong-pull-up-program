import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { defaultMetadata } from "@/app/lib/seo";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          data-goatcounter="https://armstrong-pull-up-program.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
