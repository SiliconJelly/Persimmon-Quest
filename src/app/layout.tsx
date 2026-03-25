import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const notoJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-jp",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Persimmon Quest | AI-Powered Eldercare Infrastructure",
  description:
    "Three products. One care continuum. An intelligent geriatric data pipeline for nursing homes worldwide."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoJP.variable} font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
