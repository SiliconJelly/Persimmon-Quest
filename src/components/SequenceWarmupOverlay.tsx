"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { warmupOverlay } from "@/data/content";

interface WarmupSequence {
  id: string;
  folderPath: string;
  frameCount: number;
  frameExtension: "jpg" | "png" | "webp";
}

interface SequenceWarmupOverlayProps {
  enabled?: boolean;
  sequences: WarmupSequence[];
}

function frameURL(folderPath: string, index: number, extension: string) {
  const padded = String(index + 1).padStart(3, "0");
  return `${folderPath}/ezgif-frame-${padded}.${extension}`;
}

export default function SequenceWarmupOverlay({
  enabled = false,
  sequences
}: SequenceWarmupOverlayProps) {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const totalFrames = useMemo(
    () => sequences.reduce((sum, sequence) => sum + sequence.frameCount, 0),
    [sequences]
  );

  useEffect(() => {
    if (!enabled || totalFrames === 0) {
      setReady(true);
      return;
    }

    let isCancelled = false;
    let done = 0;

    const jobs: Array<() => Promise<void>> = [];
    for (const sequence of sequences) {
      for (let i = 0; i < sequence.frameCount; i += 1) {
        jobs.push(
          () =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.decoding = "async";
              img.onload = () => {
                done += 1;
                if (!isCancelled) setProgress(Math.round((done / totalFrames) * 100));
                resolve();
              };
              img.onerror = () => {
                done += 1;
                if (!isCancelled) setProgress(Math.round((done / totalFrames) * 100));
                resolve();
              };
              img.src = frameURL(sequence.folderPath, i, sequence.frameExtension);
            })
        );
      }
    }

    const queue = [...jobs];
    const CONCURRENCY = 8;
    let active = 0;

    const scheduleNext = () => {
      if (isCancelled) return;
      while (active < CONCURRENCY && queue.length > 0) {
        const job = queue.shift();
        if (!job) continue;
        active += 1;
        const run = () => {
          job()
            .finally(() => {
              active -= 1;
              if (!isCancelled && queue.length === 0 && active === 0) {
                setReady(true);
              } else {
                scheduleNext();
              }
            })
            .catch(() => {});
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ric = (window as any).requestIdleCallback as
          | undefined
          | ((cb: () => void, opts?: { timeout: number }) => number);
        if (typeof ric === "function") ric(run, { timeout: 90 });
        else window.setTimeout(run, 20);
      }
    };

    scheduleNext();

    return () => {
      isCancelled = true;
    };
  }, [enabled, sequences, totalFrames]);

  if (!enabled || ready) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 backdrop-blur-sm">
      <div className="w-[min(90vw,30rem)] rounded-2xl border border-white/15 bg-zinc-950/80 p-6 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-persimmon">{t(warmupOverlay.eyebrow)}</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">{t(warmupOverlay.heading)}</h2>
        <p className="mt-3 text-sm text-zinc-300">{t(warmupOverlay.body)}</p>

        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full bg-persimmon transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">{progress}%</p>
      </div>
    </div>
  );
}
