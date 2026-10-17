"use client";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Product, products, ritualById, type RitualId } from "../catalog";
import ProductCard from "../components/site/ProductCard";
import { SHOP_TABS, tabFromParams, type TabId } from "./tabs";

const apparel: Product["category"][] = ["Tops", "Bottoms", "Outerwear", "Sets"];

function inTab(p: Product, tab: TabId) {
  if (tab === "all") return true;
  if (tab === "women" || tab === "men") return apparel.indexOf(p.category) > -1 && (p.gender === tab || p.gender === "unisex");
  if (tab === "shoes") return p.category === "Shoes";
  if (tab === "accessories") return p.category === "Accessories";
  return p.category === "Duet";
}

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
  // Older links can still narrow the shop to one routine; shown as a removable tag.
  const ritual = params.get("ritual") as RitualId | null;

  const go = (next: URLSearchParams) => {
    ["gender", "category"].forEach((k) => next.delete(k));
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value); else next.delete(key);
    go(next);
  };

  let list = products.filter((p) => inTab(p, tab) && (!ritual || p.ritual === ritual));
  if (sort === "low") list = list.slice().sort((a, b) => a.price - b.price);
  if (sort === "high") list = list.slice().sort((a, b) => b.price - a.price);
  const colours = list.reduce((n, p) => n + p.colorways.length, 0);

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
        {ritual && (
          <button type="button" className="q-tag" onClick={() => setParam("ritual", null)}>
            {ritualById(ritual)?.name ?? ritual} <X size={14} aria-hidden="true" /><span className="q-sr">Remove filter</span>
          </button>
        )}
      </div>
      {list.length ? (
        <div className="q-grid q-grid--shop">
          {list.map((p, i) => <ProductCard key={p.slug} product={p} priority={i < 3} />)}
        </div>
      ) : (
        <div style={{ padding: "64px 0", display: "grid", gap: 16, justifyItems: "start" }}>
          <p className="q-h3">Nothing here yet.</p>
          <button type="button" className="q-btn q-btn--ghost" onClick={() => router.replace(pathname, { scroll: false })}>See everything</button>
        </div>
      )}
    </>
  );
}
