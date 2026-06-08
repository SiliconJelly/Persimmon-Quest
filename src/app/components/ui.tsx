import type { ReactNode } from "react";

export function ScrewFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`screw-frame ${className}`}>{children}</div>;
}

export function LedLabel({
  children,
  tone = "green"
}: {
  children: ReactNode;
  tone?: "green" | "orange" | "red" | "blue";
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-label shadow-recessed">
      <span className={`status-led status-led--${tone}`} />
      {children}
    </span>
  );
}

export function SectionHeader({
  label,
  labelIcon,
  title,
  description,
  centered = false
}: {
  label: ReactNode;
  labelIcon?: ReactNode;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto mb-10 max-w-3xl text-center" : "mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"}>
      <div className={centered ? undefined : undefined}>
        <p className={`section-label ${centered ? "justify-center" : ""}`}>
          {labelIcon}
          {label}
        </p>
        <h2 className={`mt-4 max-w-3xl text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl ${centered ? "" : ""}`}>
          {title}
        </h2>
        {description && centered ? (
          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-label">{description}</p>
        ) : null}
      </div>
      {description && !centered ? (
        <p className="max-w-md text-base font-medium leading-7 text-label lg:max-w-lg">{description}</p>
      ) : null}
    </div>
  );
}
