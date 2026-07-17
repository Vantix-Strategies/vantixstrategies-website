import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Value Calculator",
  description:
    "Estimate the annual value of AI orchestration, data engineering, and operational redesign for your organization using auditable, benchmark-based assumptions.",
  alternates: { canonical: "/value-calculator" },
  openGraph: {
    title: "AI Value Calculator | Vantix Strategies",
    description:
      "Estimate the annual value of AI orchestration, data engineering, and operational redesign using auditable, benchmark-based assumptions.",
    url: "/value-calculator",
    images: ["/opengraph-image.png"],
  },
};

export default function ValueCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
