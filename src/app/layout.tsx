import type { Metadata } from "next";
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
        <script
          data-goatcounter="https://armstrong-pull-up-program.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></script>
        {children}
      </body>
    </html>
  );
}
