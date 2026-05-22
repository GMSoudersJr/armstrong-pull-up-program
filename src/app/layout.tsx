import type { Metadata } from "next";
import "./globals.css";
import { defaultMetadata } from "@/app/lib/seo";

export const metadata: Metadata = defaultMetadata;

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Rep Yourself",
  url: "https://repyourself.app",
  description:
    "Rep Yourself — The Armstrong Pull-up Program App. Track pullups, follow the 5-day routine, and master calisthenics training.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList:
    "Pull-up workout tracking, Progress visualization, Offline PWA, Built-in rest timer, 5-day routine",
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
