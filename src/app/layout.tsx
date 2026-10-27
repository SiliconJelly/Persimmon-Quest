import type { Metadata, Viewport } from "next";
import { Doto, Geist_Mono, Instrument_Serif } from "next/font/google";
import { BagProvider } from "./components/site/BagContext";
import Nav from "./components/site/Nav";
import SiteFooter from "./components/site/SiteFooter";
import "./globals.css";
import "./redesign.css";
import "./pq.css";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-display", display: "swap" });
// Dot matrix numerals for sensor readouts in the Quest View app screens.
const dot = Doto({ subsets: ["latin"], weight: ["600", "800"], variable: "--font-dot", display: "swap" });
const hud = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-hud", display: "swap" });

export const metadata: Metadata = {
  title: "Persimmon Quest | The long run, beautifully worn",
  description: "Sage Duo, our soft qBand EEG headband, and qPad One bring brain science into daily life, with biosensing activewear for active ageing.",
  // Pinterest domain claim. The same code sits in /pinterest-87cf3.html at the site root; either one verifies the domain.
  other: { "p:domain_verify": "87cf38651cf1920a8fc5fd24b1d6fba3" }
};

export const viewport: Viewport = { themeColor: "#f5f2ed", width: "device-width", initialScale: 1 };

// Runs before paint: keeps a dismissed announcement strip hidden.
const stripGate = `try{if(localStorage.getItem('pq-strip-founding')==='hidden')document.documentElement.dataset.strip='hidden'}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${hud.variable} ${dot.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: stripGate }} />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
      </head>
      <body>
        <a className="q-skip" href="#content">Skip to content</a>
        <BagProvider>
          <Nav />
          <div id="content" tabIndex={-1} style={{ outline: "none" }}>{children}</div>
          <SiteFooter />
        </BagProvider>
      </body>
    </html>
  );
}
