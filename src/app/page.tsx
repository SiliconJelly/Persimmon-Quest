import CTASection from "@/components/CTASection";
import EcosystemSection from "@/components/EcosystemSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MouseSpotlight from "@/components/MouseSpotlight";
import Navbar from "@/components/Navbar";
import ProductSection from "@/components/ProductSection";
import SequenceWarmupOverlay from "@/components/SequenceWarmupOverlay";
import { products } from "@/data/ecosystem";

export default function HomePage() {
  const enableGlobalWarmupGate = false;

  return (
    <main className="bg-onyx text-zinc-100">
      <SequenceWarmupOverlay enabled={enableGlobalWarmupGate} sequences={products} />
      <Navbar />
      <Hero />
      {products.map((product) => (
        <ProductSection key={product.id} product={product} />
      ))}
      <EcosystemSection />
      <CTASection />
      <Footer />
      <MouseSpotlight />
    </main>
  );
}
