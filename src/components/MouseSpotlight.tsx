"use client";

import { useEffect, useRef, useState } from "react";

function parseRgba(input: string) {
  const match = input.match(/rgba?\(([^)]+)\)/i);
  if (!match) return null;
  const parts = match[1].split(",").map((p) => p.trim());
  const r = Number(parts[0] ?? 0);
  const g = Number(parts[1] ?? 0);
  const b = Number(parts[2] ?? 0);
  const a = parts[3] !== undefined ? Number(parts[3]) : 1;
  if ([r, g, b, a].some((v) => Number.isNaN(v))) return null;
  return { r, g, b, a };
}

function isDarkBackground(el: Element | null) {
  let current: Element | null = el;
  while (current && current !== document.documentElement) {
    const color = parseRgba(getComputedStyle(current).backgroundColor);
    if (color && color.a > 0.02) {
      const luminance = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
      return luminance < 46;
    }
    current = current.parentElement;
  }
  return true;
}

function isInteractiveTarget(el: Element | null) {
  if (!el) return false;
  const interactive = el.closest("a,button,[role='button'],input,textarea,select,label,summary");
  if (interactive) return true;
  const cursor = getComputedStyle(el).cursor;
  return cursor === "pointer";
}

export default function MouseSpotlight() {
  const [isVisible, setIsVisible] = useState(false);
  const [spotlightOn, setSpotlightOn] = useState(false);
  const [dotOn, setDotOn] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const target = document.elementFromPoint(x, y);
      const inCanvasScrubber = Boolean(target?.closest("[data-canvas-scrubber='true']"));
      const dark = isDarkBackground(target);
      const interactive = isInteractiveTarget(target);

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x, y });
        setIsVisible(true);
        setDotOn(inCanvasScrubber);
        // Hide spotlight on interactive controls to avoid hand-cursor flicker.
        setSpotlightOn(dark && !inCanvasScrubber && !interactive);
      });
    };

    const onWindowLeave = () => {
      setIsVisible(false);
      setSpotlightOn(false);
      setDotOn(false);
    };

    const onVisibility = () => {
      if (document.visibilityState !== "visible") onWindowLeave();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseleave", onWindowLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseleave", onWindowLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none fixed z-[70] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-150 ${
          spotlightOn ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: pos.x,
          top: pos.y,
          background:
            "radial-gradient(circle, rgba(244,82,45,0.45) 0%, rgba(244,82,45,0.28) 20%, rgba(255,140,90,0.18) 42%, rgba(0,0,0,0) 72%)",
          filter: "blur(3px)",
          mixBlendMode: "screen"
        }}
      />
      <div
        aria-hidden
        className={`pointer-events-none fixed z-[71] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-persimmon transition-opacity duration-75 ${
          dotOn ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: pos.x,
          top: pos.y,
          boxShadow: "0 0 14px rgba(244,82,45,0.7), 0 0 22px rgba(255,140,90,0.45)"
        }}
      />
    </>
  );
}
