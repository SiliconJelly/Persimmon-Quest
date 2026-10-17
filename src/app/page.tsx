import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AppShowcase from "./components/site/AppShowcase";
import { Chrono, Film, Hero, Reveal, Stride } from "./components/site/HomeMotion";
import { CASES, CaseVisual } from "./components/site/ResearchCases";
import { ProductRail, Rail, StoryCarousel, type Story } from "./components/site/Storefront";

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

const ritualTiles = [
  { label: "Run longer", href: "/shop?ritual=walk", image: "/media/site/life/walk.webp", alt: "Man in his seventies running in the polo and shorts" },
  { label: "Stand stronger", href: "/shop?ritual=flow", image: "/media/site/life/top.webp", alt: "Woman in the Breather Top" },
  { label: "Signature style", href: "/shop?ritual=rest", image: "/media/site/detail/hood-graphite.webp", alt: "Graphite knit hood up close" },
  { label: "Ecosystem", href: "/shop?c=devices", image: "/media/site/life/qpad.webp", alt: "Hands on the tablet's tactile keys" },
  { label: "Footwear", href: "/shop?c=shoes", image: "/media/site/cut/shoe.webp", alt: "Quest Stride shoes", cut: true },
  { label: "Accessories", href: "/shop?c=accessories", image: "/media/site/life/glove.webp", alt: "Hand in the Everyday Glove" }
];

export default function Home() {
  return (
    <main>
      <Hero />
      <Chrono />

      <section className="q-section q-shell" aria-labelledby="rituals-title" style={{ paddingBottom: 0 }}>
        <Reveal className="q-section-head">
          <div style={{ display: "grid", gap: 20 }}>
            <span className="q-mono q-mono--bronze q-rule">Our research</span>
            <h2 id="rituals-title" className="q-display">Built with you,<br /><em>not just for you.</em></h2>
          </div>
          <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>
            <p className="q-lead">Every product starts as a question we explore with older adults. These case studies show where self care is heading, and how you can help shape it from day one.</p>
            <Link className="q-link" href="/research">See all case studies <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </Reveal>
      </section>
      <StoryCarousel stories={stories} label="Research case studies" />

      {/* ---------- Storefront ---------- */}
      <section className="q-section" aria-label="New arrivals">
        <ProductRail eyebrow="Just landed" title="New arrivals" />
      </section>

      <section className="q-shell q-split q-gender" aria-label="Shop by segment">
        {[
          { label: "Women", href: "/shop?c=women", image: "/media/site/life/flow.webp", alt: "Woman in a Pilates session" },
          { label: "Men", href: "/shop?c=men", image: "/media/site/life/polo.webp", alt: "Man in his seventies wearing the Everyday Polo" }
        ].map((g) => (
          <Link key={g.label} href={g.href} className="q-gender__tile">
            <img src={g.image} alt={g.alt} loading="lazy" />
            <span className="q-gender__label">
              <span className="q-display" style={{ fontSize: "clamp(44px, 5vw, 72px)" }}>{g.label}</span>
              <span className="q-btn q-btn--light">Shop {g.label.toLowerCase()}</span>
            </span>
          </Link>
        ))}
      </section>

      <section className="q-section" aria-label="Shop the collection">
        <Rail eyebrow="Shop the collection" title="Made for how you move" label="collection">
          {ritualTiles.map((t) => (
            <li key={t.label} className="q-rail__item q-rail__item--tile">
              <Link href={t.href} className="q-cat">
                <span className={`q-cat__media ${t.cut ? "is-cut" : ""}`}><img src={t.image} alt={t.alt} loading="lazy" /></span>
                <span className="q-cat__label">{t.label} <ArrowRight size={18} aria-hidden="true" /></span>
              </Link>
            </li>
          ))}
        </Rail>
      </section>

      <Stride />

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
