"use client";

import { usePathname } from "next/navigation";
import IntroSplash from "./IntroSplash";

export default function HomeIntro() {
  const pathname = usePathname();
  if (pathname !== "/") {
    return null;
  }
  return <IntroSplash />;
}
