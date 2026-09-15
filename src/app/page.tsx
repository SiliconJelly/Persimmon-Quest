import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import HeroDevice from "./components/HeroDevice";
import ProductShowcase from "./components/ProductShowcase";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <main className="pq-home" id="main-content">
      <section id="top" className="pq-hero pq-shell" aria-labelledby="hero-title">
        <div className="pq-hero-copy">
          <p className="pq-eyebrow"><span className="pq-dot" /> Crown your everyday brain health</p>
          <h1 id="hero-title">A little more<br />connection<br /><span>A little more you</span></h1>
          <div className="pq-hero-actions">
            <a className="pq-button pq-button--orange" href="#showcase">Meet the ecosystem <ArrowUpRight size={17} /></a>
          </div>
        </div>
        <HeroDevice />
        <div className="pq-hero-foot">
          <span>Wellness coach</span>
          <span className="pq-hero-foot-note">Humanistic NeuroAI for better aging</span>
          <a href="#showcase" aria-label="Scroll to products"><ArrowDown size={18} /></a>
        </div>
      </section>
      <ProductShowcase />
      <section className="pq-shell pq-care" aria-labelledby="care-title">
        <Reveal>
          <div className="pq-care-inner">
            <p className="pq-eyebrow">The next chapter / together</p>
            <h2 id="care-title">Better days begin<br />with a connection</h2>
            <div className="pq-care-bottom">
              <p>Help us bring thoughtful neurotechnology into everyday care</p>
              <Link className="pq-button pq-button--dark" href="/contact">Let’s build it together <ArrowUpRight size={17} /></Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
