import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://repyourself.app/"),
  title: {
    default: "Rep Yourself • The Armstrong Pull-up Program App",
    template: "%s | Rep Yourself",
  },
  description:
    "Rep Yourself — master pull-ups with the Armstrong Pull-up Program. Follow the 5-day routine, track your progress, and build real calisthenics strength. Free, offline-capable PWA.",
  applicationName: "Rep Yourself",
  keywords: [
    "armstrong pull-up program",
    "Armstrong pull-up program",
    "armstrong pull up program",
    "Armstrong pull up program",
    "pull-ups",
    "pullups",
    "pull-up training",
    "pull-up progression",
    "calisthenics",
    "bodyweight workout",
    "bodyweight training",
    "upper body strength",
    "fitness tracker",
    "workout app",
    "health & fitness",
    "progressive web app",
    "pull-up routine",
  ],
  openGraph: {
    type: "website",
    url: "https://repyourself.app/",
    siteName: "Rep Yourself",
    title: "Rep Yourself — The Armstrong Pull-up Program App",
    description:
      "Rep Yourself — master pull-ups with the Armstrong Pull-up Program. Follow the 5-day routine, track your progress, and build real calisthenics strength. Free, offline-capable PWA.",
    images: [
      {
        url: "/images/opengraph-wide-1080x473.png",
        width: 1080,
        height: 473,
        alt: "Rep Yourself — Armstrong Pull-up Program",
      },
    ],
  },
  twitter: {
    creator: "@handle",
    title: "Rep Yourself — The Armstrong Pull-up Program App",
    site: "@site",
    card: "summary_large_image",
    images: ["/images/opengraph-wide-1080x473.png"],
  },
};
