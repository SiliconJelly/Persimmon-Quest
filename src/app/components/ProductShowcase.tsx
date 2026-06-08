import { CircleDot } from "lucide-react";
import { products } from "../data";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function ProductShowcase() {
  return (
    <section id="showcase" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <Reveal>
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="section-label">
              <CircleDot className="h-4 w-4 fill-accent text-accent" /> The Quest FRO Ecosystem
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-normal drop-shadow-[0_1px_0_#ffffff] sm:text-5xl">
              Convergent research and product development for guided brain-health experiences.
            </h2>
          </div>
          <p className="max-w-md text-base font-medium leading-7 text-label">
            Persimmon Quest explores whether repeated, supervised neurofeedback sessions can support engagement and generate useful longitudinal research signals.
          </p>
        </div>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-3">
        {products.map((product, index) => (
          <Reveal className="product-reveal" key={product.id} delay={index * 80}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
