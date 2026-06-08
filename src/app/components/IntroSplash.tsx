"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_KEY = "pq_intro_seen";
const WORDMARK_MS = 2000;
const EXIT_MS = 900;
const VIDEO_LOAD_FALLBACK_MS = 8000;
const REDUCED_TRAILER_MS = 500;

type IntroPhase = "loading" | "trailer" | "wordmark" | "exit" | "done";

export default function IntroSplash() {
  const [phase, setPhase] = useState<IntroPhase>("loading");
  const videoRef = useRef<HTMLVideoElement>(null);
  const timersRef = useRef<number[]>([]);
  const handoffRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const finishIntro = useCallback(() => {
    sessionStorage.setItem(INTRO_KEY, "1");
    document.body.classList.remove("intro-locked");
    setPhase("done");
  }, []);

  const goToWordmark = useCallback(() => {
    if (handoffRef.current) return;
    handoffRef.current = true;
    clearTimers();
    setPhase("wordmark");
    schedule(() => setPhase("exit"), WORDMARK_MS);
    schedule(finishIntro, WORDMARK_MS + EXIT_MS);
  }, [clearTimers, finishIntro, schedule]);

  const startTrailer = useCallback(() => {
    if (handoffRef.current) return;
    setPhase("trailer");
    if (reducedMotionRef.current) {
      schedule(goToWordmark, REDUCED_TRAILER_MS);
    }
  }, [goToWordmark, schedule]);

  const handleCanPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || handoffRef.current) return;
    void video.play().then(startTrailer).catch(goToWordmark);
  }, [goToWordmark, startTrailer]);

  useEffect(() => {
    if (sessionStorage.getItem(INTRO_KEY) === "1") {
      setPhase("done");
      return;
    }

    document.body.classList.add("intro-locked");
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    schedule(goToWordmark, VIDEO_LOAD_FALLBACK_MS);

    const video = videoRef.current;
    if (video?.readyState && video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      handleCanPlay();
    }

    return () => {
      clearTimers();
      document.body.classList.remove("intro-locked");
    };
  }, [clearTimers, goToWordmark, handleCanPlay, schedule]);

  if (phase === "done") return null;

  return (
    <div className={`intro-overlay intro-overlay--${phase}`} role="presentation" aria-hidden="true">
      <div className="intro-cinema">
        <div className="intro-trailer__vignette" aria-hidden="true" />

        <div className="intro-trailer">
          <video
            ref={videoRef}
            className="intro-trailer__video"
            src="/media/asset_initial_trailer.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onCanPlay={handleCanPlay}
            onEnded={goToWordmark}
            onError={goToWordmark}
          />
        </div>

        <div className="intro-wordmark">
          <div className="intro-wordmark__halo" aria-hidden="true" />
          <img src="/media/asset_initial_popup_blip_wordmark.png" alt="" className="intro-wordmark__logo" />
        </div>
      </div>
    </div>
  );
}
