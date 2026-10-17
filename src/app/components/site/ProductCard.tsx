"use client";

import Link from "next/link";
import { useState } from "react";
import { type Product, ritualById, won } from "../../catalog";

// Product tile: the worn photo first; hover reveals the studio mockup.
// Picking another colour shows the mockup in that colour (the photo is in the first colour).
export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [shade, setShade] = useState(0);
  const ritual = ritualById(product.ritual);
  const colour = product.colorways[shade];
  const hasPhoto = product.onBody !== product.cut;
  const showCut = shade > 0 || !hasPhoto;
  const href = `/shop/${product.slug}${shade > 0 ? `?colour=${colour.name.toLowerCase()}` : ""}`;

  return (
    <article className={`q-card ${showCut ? "is-cut" : ""}`} style={{ "--field": ritual.dark ? "var(--c-stone)" : ritual.field } as React.CSSProperties}>
      <div className="q-card__media">
        {hasPhoto && (
          <img className="q-card__life" src={product.onBody} alt={product.onBodyAlt} width={960} height={1200} loading={priority ? "eager" : "lazy"} />
        )}
        <img className="q-card__cut" src={colour.cut} alt={`${product.name} in ${colour.name}`} width={1000} height={1250} loading="lazy" />
      </div>
      <div className="q-card__meta">
        {product.colorways.length > 1 && (
          <div className="q-shades" role="radiogroup" aria-label={`${product.name} colour`}>
            {product.colorways.map((c, i) => (
              <button
                key={c.name}
                type="button"
                role="radio"
                aria-checked={i === shade}
                aria-label={c.name}
                title={c.name}
                className="q-shade"
                style={{ "--swatch": c.hex } as React.CSSProperties}
                onClick={() => setShade(i)}
              />
            ))}
          </div>
        )}
        <h3 className="q-card__name"><Link href={href}>{product.name}</Link></h3>
        <p className="q-card__price">{won(product.price)}</p>
      </div>
    </article>
  );
}
