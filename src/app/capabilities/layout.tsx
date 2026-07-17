import type { Metadata } from "next";

export const metadata: Metadata = {
  // Re-declare the template so nested capability pages keep the brand suffix.
  title: {
    default: "Capabilities",
    template: "%s | Vantix Strategies",
  },
  description:
    "Three capabilities engineered into production inside your environment: custom AI orchestration, enterprise data engineering, and post-acquisition operational redesign.",
  alternates: { canonical: "/capabilities" },
  openGraph: {
    title: "Capabilities | Vantix Strategies",
    description:
      "Custom AI orchestration, enterprise data engineering, and operational redesign — built for production, not slides.",
    url: "/capabilities",
    images: ["/opengraph-image.png"],
  },
};

export default function CapabilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
