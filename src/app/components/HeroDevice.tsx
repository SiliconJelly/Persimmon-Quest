"use client";

import { useRef } from "react";

export default function HeroDevice() {
  const scene = useRef<HTMLDivElement>(null);
  return (
    <div className="brain-scene" ref={scene}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const box = event.currentTarget.getBoundingClientRect();
        scene.current?.style.setProperty("--brain-x", `${((event.clientX - box.left) / box.width - .5) * 7}deg`);
        scene.current?.style.setProperty("--brain-y", `${((event.clientY - box.top) / box.height - .5) * -5}deg`);
      }}
      onPointerLeave={() => {
        scene.current?.style.setProperty("--brain-x", "0deg");
        scene.current?.style.setProperty("--brain-y", "0deg");
      }}>
      <div className="brain-render">
        <img src="/media/brain-hero.png" width="1254" height="1254" fetchPriority="high"
          alt="Sculptural white brain, a study in the complexity of human connection" />
      </div>
      <span className="brain-note brain-note--top"><i /> Personal intelligence</span>
      <span className="brain-note brain-note--bottom">Picturing 86 billion neurons<br /><strong>Starts with a quest like this</strong></span>
    </div>
  );
}
