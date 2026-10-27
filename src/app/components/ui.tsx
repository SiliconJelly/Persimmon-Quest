import type { ReactNode } from "react";

export function ScrewFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`screw-frame ${className}`}>{children}</div>;
}
