"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import CanvasScrubber from "@/components/CanvasScrubber";
import NarrativeOverlay from "@/components/NarrativeOverlay";
import { Product } from "@/data/ecosystem";

interface ProductSectionProps {
  product: Product;
}

export default function ProductSection({ product }: ProductSectionProps) {
  const sections = [product.section1, product.section2, product.section3];
  const scrollVh = Math.max(400, Math.min(620, Math.round(product.frameCount * 2)));
  const reduceMotion = useReducedMotion();
  const reduceMotionBool = Boolean(reduceMotion);
  const [preloadProgress, setPreloadProgress] = useState(0);

  const [armed, setArmed] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reduceMotionBool) {
      setArmed(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "300px"
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotionBool]);

  return (
    <section ref={sectionRef} id={product.id} className="relative w-full">
      <div className="relative">
        <CanvasScrubber
          folderPath={product.folderPath}
          frameCount={product.frameCount}
          extension={product.frameExtension}
          scrollVh={scrollVh}
          armed={armed || reduceMotionBool}
          reducedMotion={reduceMotionBool}
          preloadMode="full"
          onPreloadProgress={setPreloadProgress}
        />
        <NarrativeOverlay
          productName={product.name}
          subName={product.subName}
          description={product.description}
          sections={sections}
          stats={product.stats}
          features={product.features}
        />
      </div>

      <div className="mx-auto -mt-24 mb-16 max-w-7xl px-6 md:px-10">
        <div className="rounded-2xl border border-white/10 bg-black/45 p-6 backdrop-blur-xl md:flex md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-persimmon">Commercial Model</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{product.buyNowSection.price}</h3>
            <p className="mt-1 text-sm text-zinc-300">{product.buyNowSection.unit}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-400">
              Sequence warmup {preloadProgress}%
            </p>
          </div>
          <p className="mt-4 max-w-xl text-sm text-zinc-300 md:mt-0">{product.buyNowSection.compliance}</p>
        </div>
      </div>
    </section>
  );
}
