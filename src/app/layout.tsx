import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "DevStudio | AI & Software Development for Startups",
  description: "From idea to production in weeks, not months. Expert AI, web, mobile, and cloud development for startups and small businesses that need to move fast.",
  keywords: ["AI development", "startup development", "web development", "mobile apps", "cloud services", "MVP development", "quick turnaround"],
  authors: [{ name: "DevStudio" }],
  openGraph: {
    title: "DevStudio | AI & Software Development for Startups",
    description: "Launch faster. Build smarter. Expert development for ambitious teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
