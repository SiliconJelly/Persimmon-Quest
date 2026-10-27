"use client";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Audience, type Product, EDIT_FOR_RITUAL, editById, products } from "../catalog";
import ProductCard from "../components/site/ProductCard";
import { SHOP_TABS, tabFromParams, type TabId } from "./tabs";

const apparel: Product["category"][] = ["Tops", "Bottoms", "Outerwear"];

function inTab(p: Product, tab: TabId) {
  if (tab === "all") return true;
  if (tab === "activewear") return apparel.indexOf(p.category) > -1;
  if (tab === "women" || tab === "men") return apparel.indexOf(p.category) > -1 && (p.gender === tab || p.gender === "unisex");
  if (tab === "shoes") return p.category === "Shoes";
  if (tab === "accessories") return p.category === "Accessories";
  return p.category === "Duet";
}

// "All" reads as a catalogue: one shelf per kind of piece, in the order people shop them.
const SHELVES: { title: string; test: (p: Product) => boolean; audience?: Audience }[] = [
  { title: "Women", test: (p) => p.gender === "women", audience: "women" },
  { title: "Men", test: (p) => p.gender === "men", audience: "men" },
  { title: "Outerwear for both", test: (p) => p.category === "Outerwear" },
  { title: "Footwear", test: (p) => p.category === "Shoes" },
  { title: "Accessories", test: (p) => p.category === "Accessories" },
  { title: "qBand & qPad", test: (p) => p.category === "Duet" }
];

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "low", label: "Price, low to high" },
  { id: "high", label: "Price, high to low" }
] as const;

export default function ShopGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tab = tabFromParams(params);
  const sort = params.get("sort") ?? "featured";
  // A homepage edit narrows the shop to a hand picked set; older ?ritual= links open the matching edit.
  const ritual = params.get("ritual");
  const edit = editById(params.get("edit") ?? (ritual ? EDIT_FOR_RITUAL[ritual] ?? "" : ""));
  const audience: Audience | undefined = tab === "women" || tab === "men" ? tab : undefined;

  const go = (next: URLSearchParams) => {
    const r = next.get("ritual");
    if (r && !next.get("edit") && EDIT_FOR_RITUAL[r]) next.set("edit", EDIT_FOR_RITUAL[r]);
    ["gender", "category", "ritual"].forEach((k) => next.delete(k));
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (key === "edit") next.delete("ritual");
    if (value) next.set(key, value); else next.delete(key);
    go(next);
  };

  let list = products.filter((p) => inTab(p, tab) && (!edit || edit.slugs.indexOf(p.slug) > -1));
  if (edit && sort === "featured") list = edit.slugs.map((s) => list.find((p) => p.slug === s)).filter((p): p is Product => !!p);
  if (sort === "low") list = list.slice().sort((a, b) => a.price - b.price);
  if (sort === "high") list = list.slice().sort((a, b) => b.price - a.price);
  const colours = list.reduce((n, p) => n + p.colorways.length, 0);
  const shelved = tab === "all" && sort === "featured" && !edit;

  return (
    <>
      <div className="q-shopbar">
        <nav className="q-shoptabs" aria-label="Shop categories">
          {SHOP_TABS.map((t) => (
            <button key={t.id} type="button" aria-pressed={tab === t.id} onClick={() => setParam("c", t.id === "all" ? null : t.id)}>{t.label}</button>
          ))}
        </nav>
        <label className="q-sort">
          <span className="q-sr">Sort</span>
          <select value={sort} onChange={(e) => setParam("sort", e.target.value === "featured" ? null : e.target.value)}>
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>
      </div>
      <div className="q-shopmeta">
        <p aria-live="polite">{list.length} {list.length === 1 ? "piece" : "pieces"} · {colours} colours</p>
        {edit && (
          <button type="button" className="q-tag" onClick={() => setParam("edit", null)}>
            {edit.label} <X size={14} aria-hidden="true" /><span className="q-sr">Remove filter</span>
          </button>
        )}
      </div>
      {shelved ? (
        SHELVES.map((s) => {
          const shelf = list.filter(s.test);
          return shelf.length ? (
            <section key={s.title} className="q-shelf" aria-labelledby={`shelf-${s.title}`}>
              <h2 id={`shelf-${s.title}`} className="q-shelf__title">{s.title} <span>{shelf.length}</span></h2>
              <div className="q-grid q-grid--shop">
                {shelf.map((p, i) => <ProductCard key={p.slug} product={p} audience={s.audience} priority={s.title === "Women" && i < 3} />)}
              </div>
            </section>
          ) : null;
        })
      ) : list.length ? (
        <div className="q-grid q-grid--shop">
          {list.map((p, i) => <ProductCard key={p.slug} product={p} audience={audience} priority={i < 3} />)}
        </div>
      ) : (
        <div className="q-shopempty">
          <p className="q-h3">Nothing here yet.</p>
          <button type="button" className="q-btn q-btn--ghost" onClick={() => router.replace(pathname, { scroll: false })}>See everything</button>
        </div>
      )}
    </>
  );
}
