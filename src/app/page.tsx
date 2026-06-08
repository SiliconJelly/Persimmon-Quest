import { MoveRight, Sparkles } from "lucide-react";
import Link from "next/link";
import HeroDevice from "./components/HeroDevice";
import ProductShowcase from "./components/ProductShowcase";
import Reveal from "./components/Reveal";
import { specs } from "./data";
import { LedLabel } from "./components/ui";

export default function Home() {
  return (
    <main className="home-main min-h-screen overflow-hidden bg-chassis text-ink">
      <section
        id="top"
        className="home-hero relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[minmax(0,1.34fr)_minmax(22rem,0.66fr)] lg:gap-8 lg:pt-24 xl:grid-cols-[minmax(0,1.3fr)_minmax(28rem,0.7fr)]"
      >
        <Reveal className="relative z-10">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <LedLabel>Intelligent Brain Health Monitoring</LedLabel>
            <span className="rounded-full px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-label shadow-recessed">
              Longevity UX for Japan
            </span>
          </div>
          <h1 className="hero-title max-w-4xl font-black tracking-normal text-ink drop-shadow-[0_1px_0_#ffffff]">
            Reimagining virtual reality for aging brains.
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-label">
            Persimmon Quest is developing a familiar, pachinko-inspired neurogaming environment for nursing homes. The proposed system pairs supervised engagement with consent-based brain-signal research to support better aging-brain science.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a className="primary-key" href="#showcase">
              <Sparkles className="h-4 w-4" />
              View Showcase
            </a>
            <Link className="secondary-key" href="/for-clinicians">
              For Clinicians
              <MoveRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {specs.map(([label, value]) => (
              <div className="rounded-2xl bg-chassis p-4 shadow-card" key={label}>
                <p className="font-mono text-xl font-bold tracking-normal text-ink">{value}</p>
                <p className="mt-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] text-label">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <HeroDevice />
        </Reveal>
      </section>

      <ProductShowcase />
    </main>
  );
}
