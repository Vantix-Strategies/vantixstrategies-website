import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vantix Strategies is a Forward Deployed Engineering firm. We embed with your team to ship production AI systems inside your existing environment — not strategy decks.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Vantix Strategies",
    description:
      "A Forward Deployed Engineering firm that embeds with your team to ship production AI systems — not strategy decks.",
    url: "/about",
    images: ["/opengraph-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
