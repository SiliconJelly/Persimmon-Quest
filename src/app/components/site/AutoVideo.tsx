"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  /** A still shown until the film plays, and kept when a phone holds back autoplay (Low Power Mode, data saver). */
  poster: string;
  /** A lighter cut for phones, framed the way the page crops the film there (scripts/studio/webfilm.py). */
  phone?: string;
  /** When the phone cut applies; defaults to phone widths. */
  phoneMedia?: string;
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
export default function AutoVideo({ src, poster, phone, phoneMedia = "(max-width: 767px)", className, rate = 1, label, toggleClassName, showToggle = true, fadeIn = false, pingPong = false }: Props) {
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
    // Standing still, the poster is the picture, so nothing waits to fade in
    if (reduce) { userPaused.current = true; setReady(true); }
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
    // When a phone refuses to play on its own (Low Power Mode, data saver), show the poster and try again on the
    // viewer's next tap or keypress, which a phone always lets start a muted film
    const retry = () => { off(); tryPlay(); };
    const off = () => { window.removeEventListener("touchend", retry); window.removeEventListener("click", retry); window.removeEventListener("keydown", retry); };
    const refused = () => {
      setPlaying(false); setReady(true);
      off();
      window.addEventListener("touchend", retry, { passive: true });
      window.addEventListener("click", retry);
      window.addEventListener("keydown", retry);
    };
    const tryPlay = () => {
      if (!visible || userPaused.current) return;
      if (pingPong) {
        // iPhones load no video data until something plays, so one muted play unlocks the frames scrubbing needs
        if (v.readyState < 2) { v.play().then(() => { v.pause(); drive.current!.start(); }).catch(refused); return; }
        v.pause(); drive.current!.start(); return;
      }
      v.play().then(() => setPlaying(true)).catch(refused);
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
      off();
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
      <video ref={ref} className={`${className ?? ""} ${fadeIn ? "q-fadein" : ""} ${ready ? "is-ready" : ""}`} poster={poster || undefined} muted loop={!pingPong} playsInline preload={fadeIn || pingPong ? "auto" : "metadata"} aria-label={label}>
        {phone && <source src={phone} media={phoneMedia} type="video/mp4" />}
        <source src={src} type="video/mp4" />
      </video>
      {showToggle && (
        <button type="button" className={toggleClassName ?? "q-media-toggle"} onClick={toggle} aria-label={playing ? `Pause ${label}` : `Play ${label}`}>
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          {playing ? "Pause" : "Play"}
        </button>
      )}
    </>
  );
}
