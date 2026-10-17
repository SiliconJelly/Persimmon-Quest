import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productBySlug, products } from "../../catalog";
import ProductCard from "../../components/site/ProductCard";
import ProductDetail from "./ProductDetail";
import { tabForProduct } from "../tabs";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  return { title: p ? `${p.name} | Persimmon Quest` : "Persimmon Quest" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();
  const related = products.filter((p) => p.ritual === product.ritual && p.slug !== product.slug).slice(0, 3);

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
      {related.length > 0 && (
        <section className="q-section" aria-labelledby="related-title" style={{ paddingBottom: 0 }}>
          <h2 id="related-title" className="q-h2" style={{ marginBottom: 40 }}>Wear it with</h2>
          <div className="q-grid">{related.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        </section>
      )}
    </main>
  );
}
