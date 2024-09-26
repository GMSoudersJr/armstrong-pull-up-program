import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://armstrong-pull-up-program.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Armstrong Pull-up Program App",
    template: "%s | Armstrong Pull-up Program App",
  },
  description:
    "A progressive web app that is based on the Armstrong Pull-up Program. It increases your maximum number of pullups with a 5-day training routine.",
  applicationName: "Armstrong Pull-up Program",
  keywords: [
    "pull-ups",
    "pullups",
    "health",
    "fitness",
    "health & fitness",
    "progressive web app",
    "pull-up program",
  ],
  openGraph: {
    type: "website",
    url: "https://armstrong-pull-up-program.vercel.app/",
    siteName: "Armstrong Pull-up Program App",
    title: "Armstrong Pull-up Program App",
    description:
      "A progressive web app that is based on the Armstrong Pull-up Program. It increases your maximum number of pullups with a 5-day training routine.",
    images: [
      {
        url: "/images/opengraph-wide-1080x473.png",
        width: 1080,
        height: 473,
        alt: "Armstrong Pull-up Program",
      },
    ],
  },
  twitter: {
    creator: "@handle",
    title: "Armstrong Pull-up Program App",
    site: "@site",
    card: "summary_large_image",
    images: ["/images/opengraph-wide-1080x473.png"],
  },
};
