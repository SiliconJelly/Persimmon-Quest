"use client";

import { useEffect, useRef } from "react";
import { signalSample, type SignalMood } from "./simulation";

export default function SignalCanvas({ running, mood, expanded = false }: { running: boolean; mood: SignalMood; expanded?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const seconds = useRef(0);
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const context = element.getContext("2d");
    if (!context) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = performance.now();
    const colors = ["#e6a779", "#afc0a0", "#a5bfb9", "#d7c5a3"];

    function draw(now: number) {
      if (!element || !context) return;
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (running && !media.matches && !document.hidden) seconds.current += delta;
      const width = element.clientWidth;
      const height = element.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (element.width !== Math.round(width * dpr) || element.height !== Math.round(height * dpr)) {
        element.width = Math.round(width * dpr);
        element.height = Math.round(height * dpr);
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      const left = 38;
      const plotWidth = Math.max(1, width - left - 10);
      const rowHeight = height / 4;
      context.strokeStyle = "#ffffff0c";
      context.lineWidth = 1;
      for (let x = left; x <= width; x += plotWidth / 8) {
        context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
      }
      for (let channel = 0; channel < 4; channel++) {
        const baseline = rowHeight * (channel + .5);
        context.strokeStyle = "#ffffff10";
        context.beginPath(); context.moveTo(left, baseline); context.lineTo(width, baseline); context.stroke();
        context.fillStyle = "#89968e";
        context.font = "10px system-ui";
        context.fillText(`0${channel + 1}`, 6, baseline + 4);
        context.strokeStyle = colors[channel];
        context.lineWidth = 1.1;
        context.beginPath();
        const points = Math.min(700, Math.ceil(plotWidth));
        for (let point = 0; point <= points; point++) {
          const x = left + point / points * plotWidth;
          const t = seconds.current - 4 + point / points * 4;
          const y = baseline - signalSample(channel, t, mood) * rowHeight / 76;
          if (point === 0) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.stroke();
      }
    }
    function animate(now: number) { draw(now); frame = requestAnimationFrame(animate); }
    function update() {
      cancelAnimationFrame(frame);
      previous = performance.now();
      draw(previous);
      if (running && !media.matches) frame = requestAnimationFrame(animate);
    }
    const observer = new ResizeObserver(() => draw(performance.now()));
    observer.observe(element);
    media.addEventListener("change", update);
    update();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); media.removeEventListener("change", update); };
  }, [running, mood, expanded]);

  return <canvas ref={canvas} className={`session-signal-canvas ${expanded ? "is-expanded" : ""}`} role="img" aria-label={`Four illustrative EEG channels in the ${mood} scenario. All signals are synthetic, not measurements of you.`}>Synthetic EEG waveform preview</canvas>;
}
