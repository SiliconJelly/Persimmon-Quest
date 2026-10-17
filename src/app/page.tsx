import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AppShowcase from "./components/site/AppShowcase";
import { Chrono, Hero, Reveal, Stride } from "./components/site/HomeMotion";
import PlanCards from "./components/site/PlanCards";
import { CASES, CaseVisual } from "./components/site/ResearchCases";
import { AssetSlot, ProductRail, Rail, StoryCarousel, type Story } from "./components/site/Storefront";

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
  { label: "Walk", href: "/shop?ritual=walk", image: "/media/site/life/walk.webp", alt: "Man jogging in the Walking Shorts" },
  { label: "Flow", href: "/shop?ritual=flow", image: "/media/site/life/top.webp", alt: "Woman in the Breather Top" },
  { label: "Rest", href: "/shop?ritual=rest", image: "/media/site/detail/hood-graphite.webp", alt: "Graphite knit hood up close" },
  { label: "Duet", href: "/duet", image: "/media/site/life/qpad.webp", alt: "Hands on the tablet's tactile keys" },
  { label: "Shoes", href: "/shop?category=Shoes", image: "/media/site/cut/shoe.webp", alt: "Quest Stride shoes", cut: true },
  { label: "Accessories", href: "/shop?category=Accessories", image: "/media/site/life/glove.webp", alt: "Hand in the Everyday Glove" }
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
          { label: "Women", href: "/shop?gender=women", image: "/media/site/life/flow.webp", alt: "Woman in a Pilates session" },
          { label: "Men", href: "/shop?gender=men", image: "/media/site/life/walk.webp", alt: "Man jogging in the Walk collection" }
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

      <section className="q-section" aria-label="Shop by ritual">
        <Rail eyebrow="Find your fit" title="Shop by ritual" label="rituals and categories">
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

      <section className="q-section q-shell" aria-labelledby="atelier-title">
        <Reveal className="q-section-head">
          <div style={{ display: "grid", gap: 20 }}>
            <span className="q-mono q-mono--bronze q-rule">Atelier</span>
            <h2 id="atelier-title" className="q-display">Made like jewelry.<br /><em>Worn</em> every day.</h2>
          </div>
          <p className="q-lead">Bronze hardware. Soft knits. Sensors you never feel.</p>
        </Reveal>
        <div className="q-atelier__grid">
          <Reveal>
            <figure className="q-tile">
              <div className="q-tile__media" style={{ aspectRatio: "4 / 5" }}>
                <img src="/media/site/detail/hood-white.webp" alt="Ivory feather jacquard knit up close" loading="lazy" />
              </div>
              <figcaption><span className="q-mono">01 · Fabric</span><b>Merino lyocell knit</b></figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <figure className="q-tile">
              <div className="q-tile__media" style={{ aspectRatio: "1 / 1" }}>
                <img src="/media/site/detail/sock.webp" alt="Brushed bronze pod on a ribbed cuff" loading="lazy" />
              </div>
              <figcaption><span className="q-mono">02 · Hardware</span><b>Brushed bronze pod</b></figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.16}>
            <figure className="q-tile">
              <div className="q-tile__media" style={{ aspectRatio: "3 / 4" }}>
                <img src="/media/site/detail/sock.webp" alt="Close up of a ribbed cuff with a bronze sensor pod" loading="lazy" />
              </div>
              <figcaption><span className="q-mono">03 · Sensing</span><b>Clicks out. Washes clean.</b></figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="q-section q-shell" aria-labelledby="plans-title">
        <Reveal className="q-section-head">
          <div style={{ display: "grid", gap: 20 }}>
            <span className="q-mono q-mono--bronze q-rule">Wellness plans</span>
            <h2 id="plans-title" className="q-display">Clothes are the start.<br /><em>The plan</em> is the point.</h2>
          </div>
          <p className="q-lead">Quest View Premium on your qPad, the Duet bundle with a year included, and Monarch OS for whole communities.</p>
        </Reveal>
        <PlanCards />
      </section>

      <AppShowcase />

      <section className="q-section" aria-label="Silver town stories">
        <Rail eyebrow="Our people" title="Silver town stories" label="stories">
          {["Story 01", "Story 02", "Story 03", "Story 04"].map((s) => (
            <li key={s} className="q-rail__item q-rail__item--story">
              <AssetSlot kind="video" label={`${s} · 9:16 video`} ratio="9 / 16" />
              <p className="q-mono" style={{ marginTop: 12 }}>Name · Silver town</p>
            </li>
          ))}
        </Rail>
      </section>

      <section className="q-section q-shell" aria-labelledby="closing-title">
        <Reveal className="q-closing">
          <span className="q-mono q-mono--bronze">Three questions · Two minutes</span>
          <h2 id="closing-title" className="q-display-xl">See you on<br /><em>the long run.</em></h2>
          <Link className="q-btn q-btn--primary" href="/plans">Find your plan <ArrowRight size={18} aria-hidden="true" /></Link>
        </Reveal>
      </section>
    </main>
  );
}
