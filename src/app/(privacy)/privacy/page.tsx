import type { Metadata } from "next";
import React from "react";
import PrivacyPolicy from "@/components/privacy/PrivacyPolicy";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
};

function PrivacyPage() {
  return <PrivacyPolicy />;
}

export default PrivacyPage;
