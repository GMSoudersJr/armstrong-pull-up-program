import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://repyourself.app/"),
  title: {
    default: "Rep Yourself | Armstrong Pull-up Program App & Tracker",
    template: "%s | Rep Yourself",
  },
  description:
    "Rep Yourself is a free Armstrong Pull-up Program app and tracker. Follow Major Armstrong's 5-day pull-up routine, time your rest, and track your reps from 3 to 20+. Offline-capable PWA.",
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
    title: "Rep Yourself | Armstrong Pull-up Program App & Tracker",
    description:
      "Rep Yourself is a free Armstrong Pull-up Program app and tracker. Follow Major Armstrong's 5-day pull-up routine, time your rest, and track your reps from 3 to 20+. Offline-capable PWA.",
    images: [
      {
        url: "/images/opengraph-wide-1080x473.png",
        width: 1080,
        height: 473,
        alt: "Rep Yourself | Armstrong Pull-up Program",
      },
    ],
  },
  twitter: {
    creator: "@handle",
    title: "Rep Yourself | Armstrong Pull-up Program App & Tracker",
    site: "@site",
    card: "summary_large_image",
    images: ["/images/opengraph-wide-1080x473.png"],
  },
};
