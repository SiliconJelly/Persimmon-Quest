import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AppShowcase from "./components/site/AppShowcase";
import BrainwearBridge from "./components/site/BrainwearBridge";
import { Chrono, Film, Hero, Reveal, Stride } from "./components/site/HomeMotion";
import { CASES, CaseVisual } from "./components/site/ResearchCases";
import { edits } from "./catalog";
import Lookbook from "./components/site/Lookbook";
import Partners from "./components/site/Partners";
import { ProductRail, StoryCarousel, type Story } from "./components/site/Storefront";

// Research carousel: an entry point into our case studies. Each slide opens its full story on /research.
const stories: Story[] = CASES.map((c, i) => ({
  id: c.id,
  eyebrow: c.eyebrow,
  title: c.title,
  line: c.line,
  cta: { label: c.cta, href: i === 0 ? "/research" : c.id === "brain-every-day" ? "/research#join" : `/research#${c.id}` },
  image: c.visual ? undefined : c.photo?.src,
  alt: c.photo?.alt ?? c.title,
  visual: c.visual ? <CaseVisual kind={c.visual} /> : undefined
}));

export default function Home() {
  return (
    <main>
      <Hero />
      <Chrono />

      {/* ---------- Storefront: who it is for, what is new, where it goes ---------- */}
      <Lookbook />

      <section className="q-section" aria-label="New arrivals">
        <ProductRail eyebrow="Pre-orders open" title="New arrivals" />
      </section>

      <section className="q-section q-shell" aria-labelledby="edits-title" style={{ paddingTop: 0 }}>
        <div className="q-edits__head">
          <div style={{ display: "grid", gap: 8 }}>
            <span className="q-mono q-mono--bronze">Shop the collection</span>
            <h2 id="edits-title" className="q-h2">Made for how you move</h2>
          </div>
          <nav className="q-edits__more" aria-label="More to shop">
            <Link href="/shop?c=shoes">Footwear</Link>
            <Link href="/shop?c=accessories">Accessories</Link>
            <Link href="/shop?c=devices">Headband &amp; qPad</Link>
          </nav>
        </div>
        <ul className="q-edits">
          {edits.map((e) => (
            <li key={e.id}>
              <Link href={`/shop?edit=${e.id}`} className="q-cat">
                <span className="q-cat__media"><img src={e.image} alt={e.alt} loading="lazy" width={900} height={1125} /></span>
                <span className="q-cat__label">{e.label} <ArrowRight size={18} aria-hidden="true" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Stride />

      <section className="q-section q-shell" aria-labelledby="research-title" style={{ paddingBottom: 0 }}>
        <Reveal className="q-section-head">
          <div style={{ display: "grid", gap: 20 }}>
            <span className="q-mono q-mono--bronze q-rule">Our research</span>
            <h2 id="research-title" className="q-display">Built with you,<br /><em>not just for you.</em></h2>
          </div>
          <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
            <p className="q-lead">Every product starts as a question we explore with older adults. These case studies show where self care is heading, and how you can help shape it from day one.</p>
            <Link className="q-link" href="/research">See all case studies <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </Reveal>
      </section>
      <StoryCarousel stories={stories} label="Research case studies" />
      <Partners />
      <BrainwearBridge />

      <AppShowcase />

      <Film />

      <section className="q-closing-band" aria-labelledby="closing-title">
        <img className="q-closing-band__silk" src="/media/site/material/silk.webp" alt="" loading="lazy" />
        <span className="q-grain" aria-hidden="true" />
        <Reveal className="q-closing q-shell">
          <span className="q-mono q-mono--bronze">About two minutes</span>
          <h2 id="closing-title" className="q-display-xl">See you on<br /><em>the long run.</em></h2>
          <Link className="q-btn q-btn--primary" href="/plans">Find your plan <ArrowRight size={18} aria-hidden="true" /></Link>
        </Reveal>
      </section>
    </main>
  );
}
