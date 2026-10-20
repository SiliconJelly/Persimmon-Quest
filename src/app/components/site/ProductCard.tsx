"use client";

import Link from "next/link";
import { useState } from "react";
import { type Audience, type Product, audienceFor, cardShots, won } from "../../catalog";

// Product tile. Every picture shares one studio sweep, so the worn photo can dissolve into the piece alone on hover.
// Each colour has its own worn photo: picking a swatch changes the whole picture, not just a tint.
export default function ProductCard({ product, audience, priority = false }: { product: Product; audience?: Audience; priority?: boolean }) {
  const [shade, setShade] = useState(0);
  const [picked, setPicked] = useState(false);
  const who = audienceFor(product, audience);
  const colour = product.colorways[shade];
  const { main, alt } = cardShots(product, colour, who);

  const query = new URLSearchParams();
  if (shade > 0) query.set("colour", colour.name.toLowerCase());
  if (product.gender === "unisex" && who !== audienceFor(product)) query.set("on", who);
  const href = `/shop/${product.slug}${query.toString() ? `?${query}` : ""}`;

  // Warm the next colour's photo as soon as a swatch is pointed at
  const preload = (i: number) => { const img = new Image(); img.src = cardShots(product, product.colorways[i], who).main.src; };

  return (
    <article className={`q-card ${picked ? "is-picked" : ""}`}>
      <div className="q-card__media">
        <img key={main.src} className="q-card__main" src={main.src} alt={main.alt} width={800} height={1000} loading={priority ? "eager" : "lazy"} />
        {alt && <img key={alt.src} className="q-card__alt" src={alt.src} alt="" aria-hidden="true" width={800} height={1000} loading="lazy" />}
      </div>
      <div className="q-card__meta">
        <h3 className="q-card__name"><Link href={href}>{product.name}</Link></h3>
        <p className="q-card__price">{won(product.price)}</p>
      </div>
      {product.usage && <p className="q-card__usage">{product.usage}</p>}
      {product.colorways.length > 1 && (
        <div className="q-card__colours">
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
                onPointerEnter={() => preload(i)}
                onFocus={() => preload(i)}
                onClick={() => { setShade(i); setPicked(true); }}
              />
            ))}
          </div>
          <span className="q-card__colour" aria-hidden="true">{colour.name}</span>
        </div>
      )}
    </article>
  );
}
