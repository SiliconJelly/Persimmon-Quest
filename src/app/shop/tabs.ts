import type { Product } from "../catalog";

export type TabId = "all" | "women" | "men" | "shoes" | "accessories" | "devices";

export const SHOP_TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "shoes", label: "Footwear" },
  { id: "accessories", label: "Accessories" },
  { id: "devices", label: "Headband & qPad" }
];

/** Reads the tab from ?c=, and still understands older ?gender= and ?category= links. */
export function tabFromParams(params: { get: (k: string) => string | null }): TabId {
  const c = params.get("c");
  if (c && SHOP_TABS.some((t) => t.id === c)) return c as TabId;
  const gender = params.get("gender");
  if (gender === "women" || gender === "men") return gender;
  const category = params.get("category");
  if (category === "Shoes") return "shoes";
  if (category === "Accessories") return "accessories";
  if (category === "Duet") return "devices";
  return "all";
}

/** Which tab a product lives under, for breadcrumbs. */
export function tabForProduct(p: Product): (typeof SHOP_TABS)[number] {
  const id: TabId = p.category === "Shoes" ? "shoes" : p.category === "Accessories" ? "accessories" : p.category === "Duet" ? "devices" : p.gender === "men" ? "men" : "women";
  return SHOP_TABS.find((t) => t.id === id)!;
}
