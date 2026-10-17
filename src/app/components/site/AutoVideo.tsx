"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  rate?: number;
  label: string;
  toggleClassName?: string;
  showToggle?: boolean;
};

// Muted ambient loop: plays only while on screen, honours reduced motion, and always offers pause (WCAG 2.2.2).
export default function AutoVideo({ src, poster, className, rate = 1, label, toggleClassName, showToggle = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React does not reliably reflect `muted` to the DOM, and autoplay is only allowed when muted.
    v.muted = true;
    v.defaultMuted = true;
    v.playbackRate = rate;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) userPaused.current = true;
    let visible = false;
    const tryPlay = () => {
      if (!visible || userPaused.current) return;
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) tryPlay();
      else { v.pause(); setPlaying(false); }
    }, { threshold: 0.15 });
    io.observe(v);
    // Start immediately when already on screen, without waiting for the first observer tick.
    const rect = v.getBoundingClientRect();
    visible = rect.top < window.innerHeight && rect.bottom > 0;
    tryPlay();
    // A play() issued before data arrives can be rejected; retry once the video can play.
    v.addEventListener("canplay", tryPlay);
    return () => { io.disconnect(); v.removeEventListener("canplay", tryPlay); };
  }, [rate]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { userPaused.current = false; v.play().then(() => setPlaying(true)).catch(() => {}); }
    else { userPaused.current = true; v.pause(); setPlaying(false); }
  };

  return (
    <>
      <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />
      {showToggle && (
        <button type="button" className={toggleClassName ?? "q-media-toggle"} onClick={toggle} aria-label={playing ? `Pause ${label}` : `Play ${label}`}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          {playing ? "Pause" : "Play"}
        </button>
      )}
    </>
  );
}
