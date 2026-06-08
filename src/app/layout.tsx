import type { Metadata } from "next";
import Footer from "./components/Footer";
import HomeIntro from "./components/HomeIntro";
import SiteNav from "./components/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Persimmon Quest | Pro Aging Neurotech OS",
  description:
    "A white industrial 3D showcase for pro-aging neurotech, immersive care, and aging brain research."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preload" href="/media/asset_initial_trailer.mp4" as="video" type="video/mp4" />
      </head>
      <body>
        <div className="noise-layer" />
        <HomeIntro />
        <SiteNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
