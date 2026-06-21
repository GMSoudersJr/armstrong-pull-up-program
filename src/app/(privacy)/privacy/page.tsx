import type { Metadata } from "next";
import React from "react";
import PrivacyPolicy from "@/components/privacy/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Rep Yourself privacy policy. This app stores all workout data locally on your device and collects no personal information.",
  alternates: { canonical: "/privacy" },
};

function PrivacyPage() {
  return <PrivacyPolicy />;
}

export default PrivacyPage;
