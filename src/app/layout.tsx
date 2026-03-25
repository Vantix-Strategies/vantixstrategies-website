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
  title: "Vantix Strategies | AI Forward Deployed Engineering",
  description: "We don't deliver strategy decks — we ship production AI systems inside your existing environment. Forward Deployed Engineers specializing in AI Orchestration, Enterprise Data Engineering, and Operational Re-engineering.",
  keywords: ["forward deployed engineering", "AI consulting", "LangChain", "RAG", "AI agents", "enterprise data engineering", "Snowflake", "operational re-engineering"],
  authors: [{ name: "Vantix Strategies" }],
  openGraph: {
    title: "Vantix Strategies | AI Forward Deployed Engineering",
    description: "Engineering Impact at the Speed of AI. We ship production systems inside your existing environment.",
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
