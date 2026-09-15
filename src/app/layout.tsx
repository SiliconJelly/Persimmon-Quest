import type { Metadata } from "next";
import Footer from "./components/Footer";
import SiteNav from "./components/SiteNav";
import "./globals.css";
import "./redesign.css";

export const metadata: Metadata = {
  title: "Persimmon Quest | Everyday Brain Health",
  description:
    "Thoughtful neurotechnology for meaningful play, shared moments, and a better understanding of the aging brain."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <div id="site-content">
          <a className="pq-skip-link" href="#main-content">Skip to content</a>
          <SiteNav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
