import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RENAMED, edits, productBySlug, products } from "../../catalog";
import ProductCard from "../../components/site/ProductCard";
import ProductDetail from "./ProductDetail";
import DeviceStory from "./DeviceStory";
import { tabForProduct } from "../tabs";

export const dynamicParams = false;
// Every product, plus its older slugs, so links shared before a rename still open the page
export const generateStaticParams = () => [...products.map((p) => p.slug), ...Object.keys(RENAMED)].map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  return { title: p ? `${p.name} | Persimmon Quest` : "Persimmon Quest" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  // "Wear it with": pieces from the same edits, then the same routine
  const picked = edits
    .filter((e) => e.slugs.indexOf(product.slug) > -1)
    .sort((a, b) => a.slugs.indexOf(product.slug) - b.slugs.indexOf(product.slug))
    .flatMap((e) => e.slugs);
  const pool = [...picked, ...products.filter((p) => p.ritual === product.ritual).map((p) => p.slug)];
  const related = pool
    .filter((s, i) => s !== product.slug && pool.indexOf(s) === i)
    .map((s) => productBySlug(s)!)
    .filter((p) => product.gender === "unisex" || p.gender === product.gender || p.gender === "unisex")
    .slice(0, 4);
  const audience = product.gender === "unisex" ? undefined : product.gender;

  return (
    <main className="q-pdp q-shell" style={{ paddingBottom: 120 }}>
      <nav aria-label="Breadcrumb">
        <ol className="q-crumbs q-mono">
          <li><Link href="/shop">Shop</Link></li>
          <li><Link href={`/shop?c=${tabForProduct(product).id}`}>{tabForProduct(product).label}</Link></li>
          <li aria-current="page">{product.name}</li>
        </ol>
      </nav>
      <ProductDetail product={product} />
      {product.category === "Duet" && <DeviceStory product={product} />}
      {related.length > 0 && (
        <section className="q-section" aria-labelledby="related-title" style={{ paddingBottom: 0 }}>
          <h2 id="related-title" className="q-h2" style={{ marginBottom: 40 }}>{product.category === "Duet" ? "Pairs well with" : "Wear it with"}</h2>
          <div className="q-grid q-grid--4">{related.map((p) => <ProductCard key={p.slug} product={p} audience={audience} />)}</div>
        </section>
      )}
    </main>
  );
}
