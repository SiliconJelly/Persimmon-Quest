"use client";

import { useCallback, useState } from "react";
import { LedLabel, ScrewFrame } from "./ui";

const SCREEN_IMAGES = [
  "/media/asset_interface_bg.jpeg",
  "/media/asset_persimmon_man.jpeg",
  "/media/asset_bibble.jpeg"
] as const;

export default function HeroDevice() {
  const [activeIndex, setActiveIndex] = useState(SCREEN_IMAGES.length - 1);
  const [engaged, setEngaged] = useState(false);
  const [glitching, setGlitching] = useState(false);

  const advanceScreen = useCallback(() => {
    setEngaged(true);
    setGlitching(true);
    window.setTimeout(() => setGlitching(false), 680);
    setActiveIndex((current) => (current + 1) % SCREEN_IMAGES.length);
  }, []);

  const resetScreen = useCallback(() => {
    setEngaged(false);
    setGlitching(false);
  }, []);

  return (
    <ScrewFrame className="hero-device">
      <div className="device-rack">
        <div className="device-bezel">
          <div
            className={`device-screen ${engaged ? "device-screen--engaged" : ""} ${glitching ? "device-screen--glitch" : ""}`}
            onMouseEnter={advanceScreen}
            onMouseLeave={resetScreen}
            onTouchStart={advanceScreen}
          >
            <div className="screen-media" aria-hidden="true">
              {SCREEN_IMAGES.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={`screen-media__image ${index === activeIndex ? "screen-media__image--active" : ""}`}
                />
              ))}
            </div>
            <div className="scanlines" />
            <div className="screen-topline">
              <LedLabel tone="orange">PQ CORE</LedLabel>
              <span>08:24:16</span>
            </div>
            <div className="body-scan" />
            <div className="screen-grid">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="device-controls">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="rack-foot rack-foot--left" />
        <div className="rack-foot rack-foot--right" />
      </div>
    </ScrewFrame>
  );
}
