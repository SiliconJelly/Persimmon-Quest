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
  /** Keep the video invisible until its first frame is ready, then fade it in (no poster flash). */
  fadeIn?: boolean;
  /** Play forward then back with eased turns, so a short clip becomes one long seamless move. */
  pingPong?: boolean;
};

// Muted ambient loop: plays only while on screen, honours reduced motion, and always offers pause (WCAG 2.2.2).
export default function AutoVideo({ src, poster, className, rate = 1, label, toggleClassName, showToggle = true, fadeIn = false, pingPong = false }: Props) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);
  const drive = useRef<{ start: () => void; stop: () => void }>();

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
    // Ping-pong is driven frame by frame: the position follows a cosine, so each turn eases out and back in.
    let raf = 0, last = 0, clock = 0;
    const step = (now: number) => {
      const d = v.duration;
      if (d && isFinite(d)) {
        clock += ((now - (last || now)) / 1000) * rate;
        const u = (clock % (2 * d)) / d;
        if (!v.seeking) v.currentTime = (d * (1 - Math.cos(Math.PI * u))) / 2;
      }
      last = now;
      raf = requestAnimationFrame(step);
    };
    drive.current = {
      start: () => { if (!raf) { last = 0; raf = requestAnimationFrame(step); setPlaying(true); } },
      stop: () => { cancelAnimationFrame(raf); raf = 0; setPlaying(false); }
    };
    const tryPlay = () => {
      if (!visible || userPaused.current) return;
      if (pingPong) { v.pause(); drive.current!.start(); return; }
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) tryPlay();
      else if (pingPong) drive.current!.stop();
      else { v.pause(); setPlaying(false); }
    }, { threshold: 0.15 });
    io.observe(v);
    // Start immediately when already on screen, without waiting for the first observer tick.
    const rect = v.getBoundingClientRect();
    visible = rect.top < window.innerHeight && rect.bottom > 0;
    tryPlay();
    // A play() issued before data arrives can be rejected; retry once the video can play.
    v.addEventListener("canplay", tryPlay);
    // The first frame may already be decoded before this effect runs (static HTML loads the video early),
    // so check its state now as well as listening, or a fade-in video could stay hidden.
    const mark = () => setReady(true);
    if (v.readyState >= 2) mark();
    v.addEventListener("loadeddata", mark);
    v.addEventListener("playing", mark);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadeddata", mark);
      v.removeEventListener("playing", mark);
    };
  }, [rate, pingPong]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (pingPong) {
      userPaused.current = playing;
      if (playing) drive.current?.stop(); else drive.current?.start();
      return;
    }
    if (v.paused) { userPaused.current = false; v.play().then(() => setPlaying(true)).catch(() => {}); }
    else { userPaused.current = true; v.pause(); setPlaying(false); }
  };

  return (
    <>
      <video ref={ref} className={`${className ?? ""} ${fadeIn ? "q-fadein" : ""} ${ready ? "is-ready" : ""}`} src={src} poster={poster || undefined} muted loop={!pingPong} playsInline preload={fadeIn || pingPong ? "auto" : "metadata"} aria-label={label} />
      {showToggle && (
        <button type="button" className={toggleClassName ?? "q-media-toggle"} onClick={toggle} aria-label={playing ? `Pause ${label}` : `Play ${label}`}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          {playing ? "Pause" : "Play"}
        </button>
      )}
    </>
  );
}
