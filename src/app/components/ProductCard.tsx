"use client";

import { Boxes, BrainCircuit, TabletSmartphone } from "lucide-react";
import { useCallback, useState } from "react";
import type { Product, ProductIconKey } from "../data";
import { ScrewFrame } from "./ui";

const productIcons: Record<ProductIconKey, typeof BrainCircuit> = {
  brain: BrainCircuit,
  tablet: TabletSmartphone,
  boxes: Boxes
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const Icon = productIcons[product.iconKey];
  const [active, setActive] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const handleTouchStart = useCallback(() => {
    setActive((current) => !current);
  }, []);

  return (
    <div className="product-card-wrap">
      <ScrewFrame className="product-card group">
        <div className="mb-5 flex items-start justify-between">
          <div className="icon-housing product-icon-housing">
            {product.iconImage ? (
              <img className="product-icon-image" src={product.iconImage} alt="" aria-hidden="true" />
            ) : (
              <Icon
                className="product-lucide-icon h-7 w-7 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                strokeWidth={1.9}
              />
            )}
          </div>
          <span className="rounded-full px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-label shadow-recessed">
            {product.id}
          </span>
        </div>

        <div
          className={`product-stage ${active ? "product-stage--active" : ""}`}
          style={{
            transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
          }}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => {
            setActive(false);
            setTilt({ x: 0, y: 0 });
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onTouchStart={handleTouchStart}
        >
          <div className="product-stage__rim" aria-hidden="true" />
          <div className="product-stage__grid" aria-hidden="true" />
          <div className="product-stage__glow" aria-hidden="true" />
          <div className="product-stage__viewport">
            <img
              className="product-stage__frame product-stage__frame--back"
              src={product.frame2}
              alt=""
              aria-hidden="true"
              style={{
                objectPosition: product.stagePosition,
                transform: `scale(${product.stageScale})`
              }}
            />
            <img
              className="product-stage__frame product-stage__frame--front"
              src={product.frame1}
              alt={`${product.name} product render`}
              style={{
                objectPosition: product.stagePosition,
                transform: `scale(${product.stageScale})`
              }}
            />
          </div>
          <div className="product-stage__shadow" aria-hidden="true" />
        </div>

        <p className="mt-7 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-accent">{product.type}</p>
        <h3 className="mt-2 text-2xl font-extrabold tracking-normal">{product.name}</h3>
        <div className="product-copy">
          <ul className="product-copy-main">
            {product.copy.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <details className="learn-more">
            <summary>Learn more</summary>
            <div className="learn-more__content">
              {product.more.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </details>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {product.stats.map((stat) => (
            <span
              className="rounded-lg px-3 py-2 font-mono text-[0.64rem] font-bold uppercase tracking-[0.06em] text-label shadow-recessed"
              key={stat}
            >
              {stat}
            </span>
          ))}
        </div>
      </ScrewFrame>
    </div>
  );
}
