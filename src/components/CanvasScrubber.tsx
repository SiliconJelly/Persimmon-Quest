"use client";

import { useEffect, useRef } from "react";
import { getGSAP } from "@/lib/gsap";

interface CanvasScrubberProps {
  folderPath: string;
  frameCount: number;
  extension: "jpg" | "png" | "webp";
  scrollVh?: number;
  armed?: boolean;
  reducedMotion?: boolean;
  prefetchRadius?: number;
  maxCacheSize?: number;
  preloadMode?: "window" | "full";
  onPreloadProgress?: (progress: number) => void;
}

function frameURL(folderPath: string, index: number, extension: string) {
  const padded = String(index + 1).padStart(3, "0");
  return `${folderPath}/ezgif-frame-${padded}.${extension}`;
}

function pickAdaptiveDpr({
  reducedMotion,
  viewportWidth
}: {
  reducedMotion: boolean;
  viewportWidth: number;
}) {
  const nativeDpr = window.devicePixelRatio || 1;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  let cap = 1.5;
  if (viewportWidth >= 1280 && cores >= 8 && mem >= 8) cap = 2;
  else if (viewportWidth >= 1024 && cores >= 6 && mem >= 4) cap = 1.75;
  if (viewportWidth < 768 || cores <= 4 || mem <= 3) cap = 1.25;
  if (reducedMotion) cap = Math.min(cap, 1.25);

  return Math.min(nativeDpr, cap);
}

export default function CanvasScrubber({
  folderPath,
  frameCount,
  extension,
  scrollVh = 400,
  armed = true,
  reducedMotion = false,
  prefetchRadius = 7,
  maxCacheSize = 42,
  preloadMode = "window",
  onPreloadProgress
}: CanvasScrubberProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeFrameRef = useRef(0);
  const lastAvailableFrameRef = useRef(0);
  const previousFrameRef = useRef(0);
  const hasRenderedStableFrameRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const drawQueuedRef = useRef(false);
  const prefetchQueuedRef = useRef(false);
  const scrollIdleTimerRef = useRef<number | null>(null);
  const isActivelyScrollingRef = useRef(false);
  const selectedTierPathRef = useRef<string | null>(null);
  const loadingRef = useRef<Set<number>>(new Set());
  const fullyWarmedRef = useRef(false);
  const lastDirectionRef = useRef<1 | -1 | 0>(0);
  const reversalBoostUntilRef = useRef(0);
  const lastFrameDeltaRef = useRef(0);
  const lastReportedProgressRef = useRef(-1);
  const sourceReadyRef = useRef(false);
  const sourcePathRef = useRef<string | null>(null);
  const sourceExtensionRef = useRef<"jpg" | "png" | "webp" | null>(null);
  const sourceResolvingRef = useRef(false);

  const cacheRef = useRef<Map<number, HTMLImageElement>>(new Map());

  const renderSizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !wrapper || !viewport) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!selectedTierPathRef.current) {
      selectedTierPathRef.current = `${folderPath}_1x`;
    }

    const resolveSource = (onResolved?: () => void) => {
      if (sourceReadyRef.current) {
        if (onResolved) onResolved();
        return;
      }
      if (sourceResolvingRef.current) return;
      sourceResolvingRef.current = true;

      const primaryFolderPath = selectedTierPathRef.current ?? folderPath;
      const fallbackFolderPath = folderPath;
      const pathCandidates =
        primaryFolderPath === fallbackFolderPath
          ? [fallbackFolderPath]
          : [primaryFolderPath, fallbackFolderPath];
      const extensionCandidates =
        extension === "webp" ? (["webp", "jpg", "png"] as const) : ([extension] as const);
      const candidates: Array<{ path: string; ext: "jpg" | "png" | "webp" }> = [];
      for (const path of pathCandidates) {
        for (const ext of extensionCandidates) {
          candidates.push({ path, ext });
        }
      }

      const probe = (idx: number) => {
        if (idx >= candidates.length) {
          sourcePathRef.current = folderPath;
          sourceExtensionRef.current = extension;
          sourceReadyRef.current = true;
          sourceResolvingRef.current = false;
          if (onResolved) onResolved();
          return;
        }

        const candidate = candidates[idx];
        const test = new Image();
        test.decoding = "async";
        test.onload = () => {
          sourcePathRef.current = candidate.path;
          sourceExtensionRef.current = candidate.ext;
          sourceReadyRef.current = true;
          sourceResolvingRef.current = false;
          if (onResolved) onResolved();
        };
        test.onerror = () => probe(idx + 1);
        test.src = frameURL(candidate.path, 0, candidate.ext);
      };

      probe(0);
    };

    const drawImageCover = (img: HTMLImageElement, width: number, height: number) => {
      const canvasRatio = width / height;
      const imageRatio = img.naturalWidth / img.naturalHeight;

      let sx = 0;
      let sy = 0;
      let sw = img.naturalWidth;
      let sh = img.naturalHeight;

      if (imageRatio > canvasRatio) {
        sw = img.naturalHeight * canvasRatio;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / canvasRatio;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
    };

    const getNearestCachedFrame = (target: number) => {
      if (cacheRef.current.has(target)) return { nearest: target, minDist: 0 };

      let nearest: number | null = null;
      let minDist = Number.POSITIVE_INFINITY;
      for (const idx of cacheRef.current.keys()) {
        const dist = Math.abs(idx - target);
        if (dist < minDist) {
          minDist = dist;
          nearest = idx;
        }
      }

      return { nearest, minDist };
    };

    // Initial sizing (and smoothing) happens immediately; heavy frame work is deferred by `armed`.
    const applyCanvasSize = () => {
      const width = viewport.clientWidth || window.innerWidth;
      const height = viewport.clientHeight || window.innerHeight;
      const dpr = pickAdaptiveDpr({
        reducedMotion,
        viewportWidth: width
      });

      renderSizeRef.current = { width, height, dpr };

      const backingWidth = Math.max(1, Math.floor(width * dpr));
      const backingHeight = Math.max(1, Math.floor(height * dpr));

      if (canvas.width !== backingWidth) canvas.width = backingWidth;
      if (canvas.height !== backingHeight) canvas.height = backingHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    applyCanvasSize();

    ctx.imageSmoothingEnabled = true;
    // Some browsers ignore imageSmoothingQuality; keep this best-effort.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ctx as any).imageSmoothingQuality = "high";

    let gsapTween: any = null;

    const preloadFrame = (index: number, onReady?: () => void) => {
      if (index < 0 || index >= frameCount) return;
      if (!sourceReadyRef.current) return;
      if (cacheRef.current.has(index) || loadingRef.current.has(index)) return;
      loadingRef.current.add(index);

      const img = new Image();
      img.decoding = "async";
      const resolvedPath = sourcePathRef.current ?? folderPath;
      const resolvedExtension = sourceExtensionRef.current ?? extension;
      img.onerror = () => {
        loadingRef.current.delete(index);
      };
      img.src = frameURL(resolvedPath, index, resolvedExtension);

      img.onload = () => {
        loadingRef.current.delete(index);
        cacheRef.current.set(index, img);
        lastAvailableFrameRef.current = index;

        if (typeof onReady === "function") onReady();

        // LRU eviction in window mode. In full mode we keep all warmed frames for smooth reverse scrubbing.
        if (!fullyWarmedRef.current || preloadMode === "window") {
          while (cacheRef.current.size > maxCacheSize) {
            const oldestKey = cacheRef.current.keys().next().value as number | undefined;
            if (typeof oldestKey !== "number") break;
            cacheRef.current.delete(oldestKey);
          }
        }

        // If this frame is the currently requested one, draw ASAP.
        if (index === activeFrameRef.current) {
          queueDraw();
        }
      };
    };

    const drawFrame = (index: number) => {
      const { width, height, dpr } = renderSizeRef.current;
      const image = cacheRef.current.get(index);
      if (!image || image.naturalWidth === 0) return;
      const previous = cacheRef.current.get(previousFrameRef.current);

      // Keep coordinates in CSS pixels; we scale the context by DPR.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      if (
        isActivelyScrollingRef.current &&
        Math.abs(lastFrameDeltaRef.current) <= 2 &&
        previous &&
        previousFrameRef.current !== index &&
        previous.naturalWidth > 0
      ) {
        ctx.globalAlpha = 0.35;
        drawImageCover(previous, width, height);
      }

      ctx.globalAlpha = 1;
      drawImageCover(image, width, height);
      previousFrameRef.current = index;
      hasRenderedStableFrameRef.current = true;
    };

    const queueDraw = () => {
      if (drawQueuedRef.current) return;
      drawQueuedRef.current = true;

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        drawQueuedRef.current = false;
        const target = activeFrameRef.current;
        if (cacheRef.current.has(target)) {
          drawFrame(target);
          return;
        }

        // Deterministic fallback to avoid first-entry random-frame flashes.
        if (!hasRenderedStableFrameRef.current && cacheRef.current.has(0)) {
          drawFrame(0);
          return;
        }

        const { nearest, minDist } = getNearestCachedFrame(target);
        if (nearest !== null) {
          const allowDistance = hasRenderedStableFrameRef.current ? Number.POSITIVE_INFINITY : Math.max(6, prefetchRadius);
          if (minDist <= allowDistance) {
            drawFrame(nearest);
            return;
          }
        }

        // Too far from target on initial entry: skip a draw this tick to avoid visible jump.
      });
    };

    const schedulePrefetch = (center: number) => {
      if (!sourceReadyRef.current) return;
      if (prefetchQueuedRef.current) return;
      prefetchQueuedRef.current = true;

      const schedule = (cb: () => void) => {
        // requestIdleCallback is great for keeping scroll smooth; fallback otherwise.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ric = (window as any).requestIdleCallback as
          | undefined
          | ((callback: () => void, options?: { timeout: number }) => number);

        if (typeof ric === "function") {
          ric(cb, { timeout: 80 });
          return;
        }

        window.setTimeout(cb, 40);
      };

      schedule(() => {
        prefetchQueuedRef.current = false;

        const effectiveRadius =
          Date.now() < reversalBoostUntilRef.current ? Math.max(prefetchRadius, 20) : prefetchRadius;
        let loaded = 0;
        const maxToLoad = Math.min(24, effectiveRadius * 2 + 1); // throttle per batch
        for (let r = 0; r <= effectiveRadius; r += 1) {
          const a = center + r;
          const b = center - r;
          if (loaded < maxToLoad) {
            preloadFrame(a);
            loaded += 1;
          }
          if (loaded < maxToLoad) {
            preloadFrame(b);
            loaded += 1;
          }
          if (loaded >= maxToLoad) break;
        }
      });
    };

    const reportProgress = (loadedFrames: number) => {
      if (!onPreloadProgress) return;
      const progress = Math.min(100, Math.round((loadedFrames / frameCount) * 100));
      if (progress !== lastReportedProgressRef.current) {
        lastReportedProgressRef.current = progress;
        onPreloadProgress(progress);
      }
    };

    const warmAllFrames = () => {
      if (preloadMode !== "full" || fullyWarmedRef.current) return;
      if (!sourceReadyRef.current) return;

      const pending: number[] = [];
      for (let i = 0; i < frameCount; i += 1) {
        if (!cacheRef.current.has(i) && !loadingRef.current.has(i)) pending.push(i);
      }
      if (pending.length === 0) {
        fullyWarmedRef.current = true;
        reportProgress(frameCount);
        return;
      }

      let loadedFrames = cacheRef.current.size;
      reportProgress(loadedFrames);

      const batchLoop = () => {
        const schedule = (cb: () => void) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const ric = (window as any).requestIdleCallback as
            | undefined
            | ((callback: () => void, options?: { timeout: number }) => number);
          if (typeof ric === "function") {
            ric(cb, { timeout: 80 });
          } else {
            window.setTimeout(cb, 40);
          }
        };

        schedule(() => {
          if (!armed) return;
          const BATCH = 12;
          for (let i = 0; i < BATCH && pending.length > 0; i += 1) {
            const next = pending.shift();
            if (typeof next !== "number") break;
            preloadFrame(next, () => {
              loadedFrames += 1;
              reportProgress(loadedFrames);
            });
          }

          if (pending.length > 0) {
            batchLoop();
          } else {
            fullyWarmedRef.current = true;
            reportProgress(frameCount);
          }
        });
      };

      batchLoop();
    };

    const handleResize = () => {
      applyCanvasSize();
      queueDraw();
    };

    window.addEventListener("resize", handleResize);

    // Reduced motion: render a single representative frame only (frame 0).
    if (reducedMotion) {
      resolveSource(() => {
        preloadFrame(0);
      });
      // Draw as soon as frame 0 arrives.
      const t = window.setInterval(() => {
        if (cacheRef.current.has(0)) {
          drawFrame(0);
          window.clearInterval(t);
        }
      }, 60);

      return () => {
        window.clearInterval(t);
        window.removeEventListener("resize", handleResize);
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      };
    }

    // If we're not armed yet, do nothing heavy until the section is near the viewport.
    if (!armed) {
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    resolveSource(() => {
      // Start with frame 0 to avoid an initial empty canvas.
      preloadFrame(0);
      activeFrameRef.current = 0;
      previousFrameRef.current = 0;
      queueDraw();
      schedulePrefetch(0);
      warmAllFrames();
    });

    const { gsap, ScrollTrigger } = getGSAP();
    const state = { frame: 0 };

    gsapTween = gsap.to(state, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      },
      onUpdate: () => {
        // Never advance target frames before we have painted the first stable frame.
        // This prevents a first-entry flash of a non-zero/random frame.
        if (!hasRenderedStableFrameRef.current) {
          return;
        }

        isActivelyScrollingRef.current = true;
        if (scrollIdleTimerRef.current !== null) window.clearTimeout(scrollIdleTimerRef.current);
        scrollIdleTimerRef.current = window.setTimeout(() => {
          isActivelyScrollingRef.current = false;
        }, 90);

        const nextFrame = Math.round(state.frame);
        if (nextFrame !== activeFrameRef.current) {
          const delta = nextFrame - activeFrameRef.current;
          lastFrameDeltaRef.current = delta;
          const direction: 1 | -1 | 0 = delta > 0 ? 1 : delta < 0 ? -1 : 0;
          if (direction !== 0 && lastDirectionRef.current !== 0 && direction !== lastDirectionRef.current) {
            reversalBoostUntilRef.current = Date.now() + 220;
          }
          if (direction !== 0) lastDirectionRef.current = direction;

          activeFrameRef.current = nextFrame;
          queueDraw();
          schedulePrefetch(nextFrame);
        }
      }
    });

    // Ensure ScrollTrigger calculates positions correctly after mount.
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (gsapTween) gsapTween.kill();
      if (scrollIdleTimerRef.current !== null) window.clearTimeout(scrollIdleTimerRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      drawQueuedRef.current = false;
      prefetchQueuedRef.current = false;
      loadingRef.current.clear();
      cacheRef.current.clear();
      fullyWarmedRef.current = false;
      hasRenderedStableFrameRef.current = false;
      lastDirectionRef.current = 0;
      reversalBoostUntilRef.current = 0;
      lastFrameDeltaRef.current = 0;
      lastReportedProgressRef.current = -1;
      sourceReadyRef.current = false;
      sourcePathRef.current = null;
      sourceExtensionRef.current = null;
      sourceResolvingRef.current = false;
    };
  }, [
    armed,
    extension,
    folderPath,
    frameCount,
    maxCacheSize,
    onPreloadProgress,
    preloadMode,
    prefetchRadius,
    reducedMotion
  ]);

  return (
    <section
      ref={wrapperRef}
      data-canvas-scrubber="true"
      className="relative w-full cursor-none"
      style={{ height: `${scrollVh}vh` }}
    >
      <div ref={viewportRef} className="sticky top-0 h-screen w-full overflow-hidden bg-onyx">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </section>
  );
}
