import type { Metadata } from "next";
import React from "react";
import Support from "@/components/support/Support";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Rep Yourself, the Armstrong Pull-up Program tracker. Find answers to common questions or contact us directly.",
  alternates: { canonical: "/support" },
};

function SupportPage() {
  return <Support />;
}

export default SupportPage;
