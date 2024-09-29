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
    "Achieve your pull-up goals with our app! Follow the Armstrong Pull-up Program's 5-day routine, track your progress, and stay motivated. Start your fitness journey today!",
  applicationName: "Armstrong Pull-up Program",
  keywords: [
    "pull-ups",
    "pullups",
    "health",
    "fitness",
    "health & fitness",
    "progressive web app",
    "pull-up program",
    "armstrong pull-up program",
    "Armstrong pull-up program",
    "armstrong pull up program",
    "Armstrong pull up program",
    "pull-up routine",
  ],
  openGraph: {
    type: "website",
    url: "https://armstrong-pull-up-program.vercel.app/",
    siteName: "Armstrong Pull-up Program App",
    title: "Armstrong Pull-up Program App",
    description:
      "Achieve your pull-up goals with our app! Follow the Armstrong Pull-up Program's 5-day routine, track your progress, and stay motivated. Start your fitness journey today!",
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
