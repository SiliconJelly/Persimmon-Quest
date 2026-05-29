import type { Metadata } from "next";
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
