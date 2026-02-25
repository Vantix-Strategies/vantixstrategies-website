import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
